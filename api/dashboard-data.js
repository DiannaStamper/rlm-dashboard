import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function getSessionToken(req) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
  return cookies['rlm_session'] || null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://dashboard.myRealLifeMoney.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = getSessionToken(req);
  if (!token) return res.status(401).json({ error: 'No session' });

  const { data: user, error: userError } = await supabase
    .from('rlm_users')
    .select('id')
    .eq('session_token', token)
    .gt('session_expires_at', new Date().toISOString())
    .single();

  if (userError || !user) return res.status(401).json({ error: 'Invalid session' });

  const userId = user.id;

  if (req.method === '
