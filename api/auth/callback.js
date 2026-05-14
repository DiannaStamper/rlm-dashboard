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
    let email = null;
    let hasAccess = false;
    const gqlRes = await fetch('https://myreallifemoney.memberful.com/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenData.access_token,
      },
      body: JSON.stringify({ query: '{ currentMember { id email subscriptions { active plan { id } } } }' }),
    });
    const gqlText = await gqlRes.text();
    console.log('GQL Bearer:', gqlText.substring(0, 500));
    try {
      const gqlData = JSON.parse(gqlText);
      if (gqlData && gqlData.data && gqlData.data.currentMember) {
        email = gqlData.data.currentMember.email;
        const subs = gqlData.data.currentMember.subscriptions || [];
        hasAccess = subs.some(function(sub) {
          return sub.active && sub.plan && sub.plan.id === 147763;
        });
        console.log('Plan check:', JSON.stringify({ email: email, hasAccess: hasAccess }));
      }
    } catch (parseErr) {
      console.log('GQL parse error:', parseErr.message);
    }
    if (!email) {
      return res.redirect('/?error=auth_failed');
    }
    if (!hasAccess) {
      return res.redirect('/?error=no_plan');
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
