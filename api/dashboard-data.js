import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://dashboard.myRealLifeMoney.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const session = verifySession(req.headers.cookie);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });

  const userEmail = session.email;
  const supabase = getSupabase();

  const { data: users } = await supabase
    .from('rlm_users')
    .select('id')
    .eq('email', userEmail)
    .limit(1);

  if (!users?.[0]) return res.status(401).json({ error: 'User not found' });

  const userId = users[0].id;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('rlm_dashboard_data')
      .select('data')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Failed to load data' });
    }

    return res.status(200).json({ data: data?.data || null });
  }

  if (req.method === 'POST') {
    const { data: payload } = req.body;

    const { error } = await supabase
      .from('rlm_dashboard_data')
      .upsert(
        { user_id: userId, data: payload, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );

    if (error) return res.status(500).json({ error: 'Failed to save data' });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
