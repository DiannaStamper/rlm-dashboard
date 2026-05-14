export default function handler(req, res) {
  const clientId = process.env.MEMBERFUL_CLIENT_ID;
  const redirectUri = encodeURIComponent('https://dashboard.myRealLifeMoney.com/api/auth/callback');
  const authUrl = `https://myreallifemoney.memberful.com/oauth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=read`;
  return res.redirect(authUrl);
}
