import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const HISTORY_LIMIT = 40;

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

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

function simplifyForStorage(message) {
  if (typeof message.content === 'string') return message;
  if (Array.isArray(message.content)) {
    const text = message.content.filter(b => b.type === 'text').map(b => b.text).join(' ');
    return { role: message.role, content: text || '[shared an image]' };
  }
  return message;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const session = verifySession(req.headers.cookie);
    if (!session) return res.status(401).json({ error: 'Not authenticated' });

    const { model, max_tokens, system, messages } = req.body;
    const latestMessage = messages[messages.length - 1];
    const userEmail = session.email;

    const supabase = getSupabase();

    // Look up memory directly by email — no rlm_users dependency
    let memoryId = null;
    let storedHistory = [];

    const { data: memory } = await supabase
      .from('rlm_coach_memory')
      .select('id, conversation_history')
      .eq('username', userEmail)
      .limit(1);

    if (memory?.[0]) {
      memoryId = memory[0].id;
      storedHistory = memory[0].conversation_history || [];
    }

    // Build messages for Anthropic
    const recentHistory = storedHistory.slice(-HISTORY_LIMIT);
    const anthropicMessages = [...recentHistory, latestMessage];

    // Call Anthropic
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens, system, messages: anthropicMessages }),
    });
    const data = await anthropicRes.json();

    // Save to Supabase
    if (data.content) {
      const assistantText = data.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('');
      const updatedHistory = [
        ...storedHistory,
        simplifyForStorage(latestMessage),
        { role: 'assistant', content: assistantText }
      ].slice(-100);

    if (memoryId) {
        const { error: updateErr } = await supabase
          .from('rlm_coach_memory')
          .update({
            conversation_history: updatedHistory,
            updated_at: new Date().toISOString()
          })
          .eq('id', memoryId);
        if (updateErr) console.error('Memory update error:', JSON.stringify(updateErr));
      } else {
        const { error: insertErr } = await supabase
          .from('rlm_coach_memory')
          .insert({
            user_id: crypto.randomUUID(),
            user_name: userEmail,
            username: userEmail,
            conversation_history: updatedHistory,
            updated_at: new Date().toISOString()
          });
        if (insertErr) console.error('Memory insert error:', JSON.stringify(insertErr));
      }
    }

    return res.status(anthropicRes.status).json(data);
  } catch (error) {
    console.error('Coach error:', error);
    return res.status(500).json({ error: 'Coach unavailable. Try again.' });
  }
}
