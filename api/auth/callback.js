import crypto from 'crypto';
export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.MEMBERFUL_CLIENT_ID;
  const clientSecret = process.env.MEMBERFUL_CLIENT_SECRET;
  const sessionSecret = process.env.SESSION_SECRET;
  const redirectUri = 'https://dashboard.myRealLifeMoney.com/api/auth/callback';
  try {
    const tokenRes = await fetch('https://myreallifemoney.memberful.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }).toString(),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.redirect('/?error=token_failed');
    }
    const pendingData = JSON.stringify({
      pending: true,
      expires: Date.now() + 15 * 60 * 1000,
    });
    const sig = crypto.createHmac('sha256', sessionSecret).update(pendingData).digest('hex');
    const pendingToken = Buffer.from(pendingData).toString('base64') + '.' + sig;
    res.setHeader('Set-Cookie', 'rlm_pending=' + pendingToken + '; HttpOnly; Secure; SameSite=Lax; Max-Age=900; Path=/');
    return res.redirect('/verify');
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.redirect('/?error=auth_failed');
  }
}
