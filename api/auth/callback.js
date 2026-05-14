import crypto from 'crypto';
export default async function handler(req, res) {
  const { code } = req.query;
  console.log('Callback params:', JSON.stringify(req.query));
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
    console.log('Token preview:', tokenData.access_token ? tokenData.access_token.substring(0, 15) : 'none');
    if (!tokenData.access_token) {
      return res.redirect('/?error=token_failed');
    }
    const introspectRes = await fetch('https://myreallifemoney.memberful.com/oauth/introspect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: 'token=' + tokenData.access_token,
    });
    const introspectText = await introspectRes.text();
    console.log('Introspect status:', introspectRes.status);
    console.log('Introspect body:', introspectText.substring(0, 500));
    let email = null;
    let hasAccess = false;
    try {
      const introspectData = JSON.parse(introspectText);
      if (introspectData && introspectData.email) {
        email = introspectData.email;
      }
      if (introspectData && introspectData.sub) {
        email = introspectData.sub;
      }
    } catch (parseErr) {
      console.log('Introspect parse error:', parseErr.message);
    }
    console.log('Email found:', email);
    if (!email) {
      return res.redirect('/?error=auth_failed');
    }
    const sessionData = JSON.stringify({
      email,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    const sig = crypto.createHmac('sha256', sessionSecret).update(sessionData).digest('hex');
    const token = Buffer.from(sessionData).toString('base64') + '.' + sig;
    res.setHeader('Set-Cookie', 'rlm_session=' + token + '; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/');
    return res.redirect('/');
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.redirect('/?error=auth_failed');
  }
}
