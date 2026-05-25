import crypto from 'crypto';

function verifySession(cookieHeader) {
  const cookies = {};
  (cookieHeader || '').split(';').forEach(part => {
    const idx = part.indexOf('=');
    if (idx > 0) cookies[part.substring(0, idx).trim()] = part.substring(idx + 1).trim();
  });
  const token = cookies.rlm_session;
  if (!token) return null;
  try {
    const dotIdx = token.lastIndexOf('.');
    const dataB64 = token.substring(0, dotIdx);
    const sig = token.substring(dotIdx + 1);
    const sessionData = Buffer.from(dataB64, 'base64').toString();
    const expectedSig = crypto
      .createHmac('sha256', process.env.SESSION_SECRET)
      .update(sessionData)
      .digest('hex');
    if (sig !== expectedSig) return null;
    const session = JSON.parse(sessionData);
    if (Date.now() > session.expires) return null;
    return session;
  } catch { return null; }
}

const RECEIPT_SYSTEM_PROMPT = `You are a receipt-parsing assistant for Real Life Money. The user uploaded a photo of a store receipt. Your job is to extract structured data so it can be added to their spending tracker — never guess, never invent.

Respond with ONLY a JSON object. No prose, no markdown code fences, no commentary. The schema is:

{
  "merchant": "Target",
  "date": "2026-05-25",
  "dateConfidence": "confident",
  "total": 87.42,
  "totalConfidence": "confident",
  "items": [
    { "name": "Whole milk, gallon", "rawText": "GV WHL MLK GAL", "price": 4.29, "confidence": "confident" }
  ],
  "notes": ""
}

Field guidance:

- merchant: store name as a shopper would say it ("Target", "Walmart", "Kroger", "Starbucks"). If the merchant is illegible, use "Unknown".
- date: ISO YYYY-MM-DD. If the receipt date is missing or illegible, omit the field and set dateConfidence to "unsure".
- dateConfidence: "confident" if you can clearly read the date on the receipt, "unsure" otherwise.
- total: the final purchase total as a number (e.g. 87.42, not "$87.42"). Tax-included, the bottom-line number.
- totalConfidence: "confident" or "unsure".
- items: array of line items the shopper actually bought. EXCLUDE: tax lines, subtotal, total, tip, change, savings/coupon lines, store loyalty discounts. INCLUDE: every purchased item with a positive price.
- For each item:
  - name: a human-readable best decoding of common store abbreviations. "GV CHKN BRST" → "Great Value Chicken Breast". "TGT BRND TP" → "Target Brand Toilet Paper". Use sentence case.
  - rawText: the literal text printed on that receipt line.
  - price: a positive number, the dollar amount for that line item.
  - confidence:
    - "confident" if you can read both the item AND its price clearly and decoded the name with high certainty
    - "unsure" if the price is clear but the item name is ambiguous (e.g. abbreviated SKU you cannot decode reliably)
    - "unread" if the item line was too damaged/smudged to decode at all — still include the price if you can see it; use the rawText as the name
- notes: brief sentence ONLY if something noteworthy happened (e.g. "Several items at the bottom were too smudged to read"). Otherwise empty string.

Hard rules:
- Never invent items. If you can't see it on the receipt, it doesn't exist.
- Prices must be positive numbers. Discount/coupon lines are not items.
- If the image isn't a receipt or is unreadable, respond exactly: {"error":"Could not read receipt"}
- Output JSON only. No code fences. No prose.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const session = verifySession(req.headers.cookie);
    if (!session) return res.status(401).json({ error: 'Not authenticated' });

    const { imageData, imageType } = req.body || {};
    if (!imageData || !imageType) {
      return res.status(400).json({ error: 'Image required' });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: RECEIPT_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: imageType, data: imageData } },
            { type: 'text', text: 'Please parse this receipt.' }
          ]
        }]
      }),
    });

    const data = await anthropicRes.json();

    if (!anthropicRes.ok || !data.content) {
      console.error('Anthropic error:', JSON.stringify(data));
      return res.status(502).json({ error: 'Receipt parser is unavailable right now. Try again in a moment.' });
    }

    const text = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')
      .trim();

    // Strip markdown code fences if the model wrapped its JSON despite instructions
    let cleaned = text;
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error('Receipt JSON parse failed. Raw text:', text);
      return res.status(500).json({ error: 'Could not understand the receipt. Try a clearer photo.' });
    }

    if (parsed.error) {
      return res.status(422).json({ error: parsed.error });
    }

    return res.status(200).json({ receipt: parsed });
  } catch (error) {
    console.error('Parse receipt error:', error);
    return res.status(500).json({ error: 'Receipt parsing failed. Try again.' });
  }
}
