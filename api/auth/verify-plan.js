import crypto from 'crypto';
function parseCookies(req) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = {};
  cookieHeader.split(';').forEach(function(cookie) {
    const parts = cookie.trim().split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts.slice(1).join('=');
    }
  });
  return cookies;
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const sessionSecret = process.env.SESSION_SECRET;
  const apiKey = process.env.MEMBERFUL_API_KEY;
  const cookies = parseCookies(req);
  const pendingCookie = cookies.rlm_pending;
  console.log('Pending cookie present:', !!pendingCookie);
  if (!pendingCookie) {
    return res.status(401).json({ error: 'No pending session' });
  }
  try {
    const lastDot = pendingCookie.lastIndexOf('.');
    const b64 = pendingCookie.substring(0, lastDot);
    const sig = pendingCookie.substring(lastDot + 1);
    const rawData = Buffer.from(b64, 'base64').toString();
    const expectedSig = crypto.createHmac('sha256', sessionSecret).update(rawData).digest('hex');
    if (sig !== expectedSig) {
      return res.status(401).json({ error: 'Invalid session' });
    }
    const pendingData = JSON.parse(Buffer.from(b64, 'base64').toString());
    if (!pendingData.pending || Date.now() > pendingData.expires) {
      return res.status(401).json({ error: 'Session expired' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid session' });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }
  const query = '{ memberByEmail(email: "' + email.toLowerCase().trim() + '") { email subscriptions { active plan { id } } } }';
  const gqlRes = await fetch('https://myreallifemoney.memberful.com/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
    },
    body: JSON.stringify({ query }),
  });
  const gqlData = await gqlRes.json();
  console.log('Plan lookup:', JSON.stringify(gqlData).substring(0, 500));
  const member = gqlData && gqlData.data && gqlData.data.memberByEmail;
  if (!member) {
    return res.status(403).json({ error: 'no_member' });
  }
  const subs = member.subscriptions || [];
  const hasAccess = subs.some(function(sub) {
    return sub.active && sub.plan && Number(sub.plan.id) === 147763;
  });
  if (!hasAccess) {
    return res.status(403).json({ error: 'no_plan' });
  }
  const sessionData = JSON.stringify({
    email: member.email,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  const sig = crypto.createHmac('sha256', sessionSecret).update(sessionData).digest('hex');
  const token = Buffer.from(sessionData).toString('base64') + '.' + sig;
  res.setHeader('Set-Cookie', [
    'rlm_session=' + token + '; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/',
    'rlm_pending=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/',
  ]);
  return res.status(200).json({ ok: true });
}
