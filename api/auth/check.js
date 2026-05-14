import crypto from 'crypto';

export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = {};
  cookieHeader.split(';').forEach(part => {
    const idx = part.indexOf('=');
    if (idx > 0) {
      cookies[part.substring(0, idx).trim()] = part.substring(idx + 1).trim();
    }
  });

  const token = cookies.rlm_session;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const dotIdx = token.lastIndexOf('.');
    const dataB64 = token.substring(0, dotIdx);
    const sig = token.substring(dotIdx + 1);
    const sessionData = Buffer.from(dataB64, 'base64').toString();
    const expectedSig = crypto
      .createHmac('sha256', process.env.SESSION_SECRET)
      .update(sessionData)
      .digest('hex');

    if (sig !== expectedSig) return res.status(401).json({ authenticated: false });

    const session = JSON.parse(sessionData);
    if (Date.now() > session.expires) return res.status(401).json({ authenticated: false });

    return res.status(200).json({ authenticated: true, email: session.email });
  } catch {
    return res.status(401).json({ authenticated: false });
  }
}
