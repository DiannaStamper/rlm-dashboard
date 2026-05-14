import { useState } from "react";
const C = {
  green: '#2B5E3F',
  cream: '#F7F3EB',
  creamDark: '#EDE7D9',
  gold: '#C9A440',
  charcoal: '#2C2C2C',
  espresso: '#3E2918',
};
export default function VerifyPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function handleSubmit() {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        window.location.href = '/';
      } else if (data.error === 'no_member') {
        setError('We could not find a RLM account with that email. Check for typos and try again.');
      } else if (data.error === 'no_plan') {
        setError('That account does not have an active RLM Dashboard | Journey subscription.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }
  return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 40, maxWidth: 420, width: '100%', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.green, marginBottom: 8 }}>One more step</div>
          <div style={{ fontSize: 15, color: C.charcoal, lineHeight: 1.5 }}>Enter the email address on your RLM Dashboard | Journey subscription to confirm your access.</div>
        </div>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid ' + C.creamDark, fontSize: 15, marginBottom: 16, boxSizing: 'border-box', outline: 'none' }}
        />
        {error && (
          <div style={{ background: '#fff3f3', border: '1px solid #f5c2c2', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#b00', marginBottom: 16 }}>
            {error}
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading || !email}
          style={{ width: '100%', padding: '13px 0', background: loading ? C.creamDark : C.green, color: loading ? C.charcoal : '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: loading ? 'default' : 'pointer' }}
        >
          {loading ? 'Checking...' : 'Confirm Access'}
        </button>
      </div>
    </div>
  );
}
