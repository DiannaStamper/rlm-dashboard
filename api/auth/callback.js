import crypto from 'crypto';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.redirect('/?error=no_code');

  const clientId = process.env.MEMBERFUL_CLIENT_ID;
  const clientSecret = process.env.MEMBERFUL_CLIENT_SECRET;
  const sessionSecret = process.env.SESSION_SECRET;
  const apiKey = process.env.MEMBERFUL_API_KEY;
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
    if (!tokenData.access_token) {
      console.error('Token exchange failed:', tokenData);
      return res.redirect('/?error=token_failed');
    }

    // Step 2: Get member identity via OAuth userinfo
    const userInfoRes = await fetch('https://myreallifemoney.memberful.com/oauth/userinfo', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
    });
    const userInfo = await userInfoRes.json();
    console.log('UserInfo:', JSON.stringify(userInfo));

    const memberId = userInfo?.id || userInfo?.sub;
    if (!memberId) {
      console.error('No member ID in userinfo:', userInfo);
      return res.redirect('https://myreallifemoney.memberful.com/checkout?plan=147763');
    }

    // Step 3: Check subscription via admin API key
    const gqlRes = await fetch('https://myreallifemoney.memberful.com/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: `{ member(id: ${memberId}) { email subscriptions { active } } }`
      }),
    });

    const gqlData = await gqlRes.json();
    console.log('Subscription data:', JSON.stringify(gqlData));
    const member = gqlData?.data?.member;

    if (!member || !member.subscriptions?.some(s => s.active)) {
      return res.redirect('https://myreallifemoney.memberful.com/checkout?plan=147763');
    }

    // Step 4: Set signed session cookie
    const sessionData = JSON.stringify({
      email: member.email,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    const sig = crypto.createHmac('sha256', sessionSecret).update(sessionData).digest('hex');
    const token = Buffer.from(sessionData).toString('base64') + '.' + sig;

    res.setHeader('Set-Cookie', `rlm_session=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/`);

    return res.redirect('/');

  } catch (err) {
    console.error('Auth error:', err);
    return res.redirect('/?error=auth_failed');
  }
}
