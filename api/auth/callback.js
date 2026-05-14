import crypto from 'crypto';

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.redirect('/?error=no_code');

  const clientId = process.env.MEMBERFUL_CLIENT_ID;
  const clientSecret = process.env.MEMBERFUL_CLIENT_SECRET;
  const sessionSecret = process.env.SESSION_SECRET;
  const redirectUri = 'https://dashboard.myRealLifeMoney.com/api/auth/callback';

  try {
    // Step 1: Exchange code for access token
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
    console.log('Token keys:', Object.keys(tokenData));
    if (!tokenData.access_token) {
      console.error('Token failed:', JSON.stringify(tokenData));
      return res.redirect('/?error=token_failed');
    }

    // Step 2: Get member info via Memberful JSON API
    const meRes = await fetch(`https://myreallifemoney.memberful.com/api/json/me?auth_token=${tokenData.access_token}`);
    const meText = await meRes.text();
    console.log('Me status:', meRes.status, 'preview:', meText.substring(0, 300));

    let email = null;
    if (meRes.ok) {
      const meData = JSON.parse(meText);
      email = meData?.member?.email || meData?.email;
    }

    if (!email) {
      console.log('No email found, redirecting to checkout');
      return res.redirect('https://myreallifemoney.memberful.com/checkout?plan=147763');
    }

    // Step 3: Set signed session cookie
    const sessionData = JSON.stringify({
      email,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    const sig = crypto.createHmac('sha256', sessionSecret).update(sessionData).digest('hex');
    const token = Buffer.from(sessionData).toString('base64') + '.' + sig;

    res.setHeader('Set-Cookie', `rlm_session=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/`);
    return res.redirect('/');

  } catch (err) {
    console.error('Auth error:', err.message);
    return res.redirect('/?error=auth_failed');
  }
}
