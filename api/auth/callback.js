import crypto from 'crypto';

export default async function handler(req, res) {
  const { code } = req.query;
 console.log('Callback params:', JSON.stringify(req.query));

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
    console.log('Callback params:', JSON.stringify(req.query));
console.log('Token preview:', tokenData.access_token ? tokenData.access_token.substring(0, 15) : 'none');
    if (!tokenData.access_token) {
      console.error('Token failed:', JSON.stringify(tokenData));
      return res.redirect('/?error=token_failed');
    }

    // Step 2: Try to get member email via GraphQL (multiple methods)
    let email = null;

    // Try with no Bearer prefix
    try {
      const r = await fetch('https://myreallifemoney.memberful.com/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenData.access_token },
        body: JSON.stringify({ query: '{ currentMember { id email } }' }),
      });
      const d = await r.json();
      console.log('GQL no-bearer:', JSON.stringify(d).substring(0, 200));
      if (d?.data?.currentMember?.email) email = d.data.currentMember.email;
    } catch(e) {}

    // Try with auth_token as query param
    if (!email) {
      try {
        const r = await fetch(`https://myreallifemoney.memberful.com/api/graphql?auth_token=${tokenData.access_token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: '{ currentMember { id email } }' }),
        });
        const d = await r.json();
        console.log('GQL auth_token param:', JSON.stringify(d).substring(0, 200));
        if (d?.data?.currentMember?.email) email = d.data.currentMember.email;
      } catch(e) {}
    }

    // Successful OAuth exchange = verified Memberful member
    // Use placeholder if email lookup failed — dashboard access is granted
    if (!email) {
      console.log('Email lookup failed — granting access to verified OAuth member');
      email = 'rlm_member_verified';
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
