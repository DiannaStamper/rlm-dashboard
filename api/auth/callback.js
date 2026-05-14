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
    console.log('Full token data:', JSON.stringify(tokenData));
    if (!tokenData.access_token) {
      console.error('Token failed:', JSON.stringify(tokenData));
      return res.redirect('/?error=token_failed');
    }

   // Step 2: Get member info via JSON REST API
    let email = null;
    let hasAccess = false;
    try {
      const memberRes = await fetch('https://myreallifemoney.memberful.com/api/json/v1/member?auth_token=' + tokenData.access_token);
      const memberData = await memberRes.json();
      console.log('Member API:', JSON.stringify(memberData).substring(0, 500));
      if (memberData && memberData.member && memberData.member.email) {
        email = memberData.member.email;
        const subs = memberData.member.subscriptions || [];
        hasAccess = subs.some(function(sub) { return sub.active && sub.plan && sub.plan.id === 147763; });
        console.log('Plan check:', JSON.stringify({ email: email, hasAccess: hasAccess, plans: subs.map(function(s) { return s.plan && s.plan.id; }) }));
      }
    } catch(e) {
      console.log('Member API error:', e.message);
    }
    if (!email) {
      return res.redirect('/?error=auth_failed');
    }
    if (!hasAccess) {
      return res.redirect('/?error=no_plan');
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
