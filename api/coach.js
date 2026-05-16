import crypto from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const HISTORY_LIMIT = 40;

const sbHeaders = {
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

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

async function findOrCreateUser(email) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/rlm_users?email=eq.${encodeURIComponent(email)}&select=id,full_name`,
    { headers: sbHeaders }
  );
  const users = await r.json();
  if (users?.[0]) return users[0];

  const cr = await fetch(`${SUPABASE_URL}/rest/v1/rlm_users`, {
    method: 'POST',
    headers: { ...sbHeaders, 'Prefer': 'return=representation' },
    body: JSON.stringify({ email, created_at: new Date().toISOString() })
  });
  const newUsers = await cr.json();
  return newUsers?.[0] || null;
}

async function getMemory(userId) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/rlm_coach_memory?user_id=eq.${userId}&select=id,conversation_history`,
    { headers: sbHeaders }
  );
  const data = await r.json();
  return data?.[0] || null;
}

async function saveMemory(userId, userName, history, existingId) {
  if (existingId) {
    await fetch(`${SUPABASE_URL}/rest/v1/rlm_coach_memory?id=eq.${existingId}`, {
      method: 'PATCH',
      headers: sbHeaders,
      body: JSON.stringify({
        conversation_history: history,
        updated_at: new Date().toISOString()
      })
    });
  } else {
    await fetch(`${SUPABASE_URL}/rest/v1/rlm_coach_memory`, {
      method: 'POST',
      headers: sbHeaders,
      body: JSON.stringify({
        user_id: userId,
        user_name: userName,
        username: userName,
        conversation_history: history,
        updated_at: new Date().toISOString()
      })
    });
  }
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

    const user = await findOrCreateUser(session.email);
    const userId = user?.id;
    const userName = user?.full_name || session.email;

    let memoryRecord = null;
    let storedHistory = [];
    if (userId) {
      memoryRecord = await getMemory(userId);
      storedHistory = memoryRecord?.conversation_history || [];
    }

    const recentHistory = storedHistory.slice(-HISTORY_LIMIT);
    const anthropicMessages = [...recentHistory, latestMessage];

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

    if (userId && data.content) {
      const assistantText = data.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('');
      const updatedHistory = [
        ...storedHistory,
        simplifyForStorage(latestMessage),
        { role: 'assistant', content: assistantText }
      ].slice(-100);
      await saveMemory(userId, userName, updatedHistory, memoryRecord?.id);
    }

    return res.status(anthropicRes.status).json(data);
  } catch (error) {
    console.error('Coach error:', error);
    return res.status(500).json({ error: 'Coach unavailable. Try again.' });
  }
}
