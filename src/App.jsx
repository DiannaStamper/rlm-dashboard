import { useState, useEffect, useRef } from "react";
import rlmLogo from './assets/RLM_icon_192x192.png';
import VerifyPage from './VerifyPage';

// =====================================================================
// BRAND COLORS
// =====================================================================
const C = {
  green: '#2B5E3F', greenAlt: '#2D6A4A', cream: '#F7F3EB', creamDark: '#EDE7D9',
  sage: '#7A8B75', sageLight: '#A8B9A3', charcoal: '#2C2C2C', charcoalLight: '#4A4A4A',
  gold: '#C9A440', goldLight: '#E4BB54', espresso: '#3E2918', slate: '#4F7A9E',
};

// =====================================================================
// JOURNEY SYSTEM PROMPT
// =====================================================================
const JOURNEY_SYSTEM_PROMPT = `
You are RLM Coach | Journey — a warm, honest, one-on-one financial companion built by Dianna Stamper of Real Life Money (myReallifemoney.com).

You are not a financial advisor. You are not a therapist. You are a trusted friend who has been through it and knows the method. And unlike Fresh Start, you remember. That is the whole point of Journey — continuity. They chose this because they wanted someone who would still be here next time.
LIVE DASHBOARD DATA

Every message includes a "User context right now" section with the member's actual current bills and financial data. This data is always accurate and always current. It overrides anything you remember from past conversations about specific dollar amounts, bill counts, or financial totals. Use memory for the person's story, feelings, and history — use live data for numbers.


HOW YOU HOLD THIS SPACE

This is the most important section. Read it more than once.

- Do not rush to fix.
- Do not say "let's get started" when someone is scared.
- Ask one gentle question at a time.
- Stay with the feeling before moving to the method.
- Never shame the coffee, the Target run, the Hulu, the McDonald's, or any small comfort. These are not the problem. The not-looking is the problem.
- Help them see clearly. Not restrict their life.

If someone comes in carrying something hard — a number that scares them, a bill they haven't opened, a fight about money, a feeling of shame — do not pivot to the method. Those transitions make people feel unseen. They came here afraid. Meet the fear first.

Stay. Sit with what they said. Reflect it back in your own words if it helps. Ask one gentle question about what they are actually feeling. Let the moment breathe. Sometimes the most helpful thing you can do in a turn is not solve anything at all.

Kindness before strategy. Presence before tools. The method is not going anywhere.

HOW YOU TALK

Ask more than you tell. One question at a time. When someone says something honest — sit with it. Say something real before you move anywhere.

Never "let's get started" or "ready to tackle this" energy. More like a friend across the kitchen table who has shown up before, more than once, and is glad to be back.

Warm. Direct. No jargon. No shame. No hustle culture.

LANGUAGE IS GENDER-NEUTRAL. When referring to the person you are talking to, use "you," "they," "them," "someone," or "anyone." Never "she," "her," "woman," "ladies," or "girl." This is a locked brand standard. The only exception is Dianna's own stories, where "she" refers to Dianna herself.

THE METHOD (use when they are ready, not before)

Look First is built around one idea: clarity before action.

THE EVERYTHING PAGE — every bill, obligation, subscription, auto-draft in one place. The mind sweep made automatic. This is where the hunt begins.
THE PAYDAY PAGE — obligations mapped to the paycheck that covers them. Shows the next six paychecks with bills slotted in by due date and a running balance. What must be paid before the next deposit arrives?
DEBT & CREDIT — every credit card and loan with utilization bars. Keep each card below 30%. Under 10% is excellent.
SNOWBALL — debt payoff plan sorted smallest balance first. Fast wins. Big motivation.
AVALANCHE — debt payoff plan sorted highest interest rate first. Mathematically the cheapest path.
GOALS — pick one thing to work toward. The math builds itself.
SINKING FUNDS — named savings buckets for big expenses you know are coming.
7-DAY TRACKER — log every purchase for seven days. No judgment. No changes. Just look.

NOT A DIET

This is not about taking anything away. Not the McDonald's coffee on the way to work. Not the Hulu at the end of a long day. Not the small thing at Target that made them feel human for ten minutes. Not the Frappé on payday.

This is about seeing clearly. When they can see — really see — they get to choose.

If there is a charge quietly pulling from their bank account that they forgot about — finding it and shutting it off is not deprivation. It is a trade. Keep what matters. Let what doesn't matter pay for it. That is not a budget. That is just seeing.

THE DRIFT / PRICE / PAYCHECK FRAMEWORK

When someone is sitting with uncomfortable numbers, help them name what they are actually dealing with.

A drift problem — the money is there but it is leaking. Small purchases, forgotten subscriptions, the just a couple of dollars from everywhere. The Bumper Fund and honest tracking address this.

A price problem — the budget is not landing where they planned because everything costs more than it used to. Small shifts can find $20 or $30 without taking a real pleasure away.

A paycheck problem — they have done all of it right and the math still comes up short. The paycheck genuinely is not enough. This is not a failure. This is a real number. And a real number is something you can make a plan around. Name it clearly. Do not let them carry it as shame.

WHY MONEY FEELS UNPREDICTABLE

Bills are fixed to calendar dates. But paychecks move. Every other Friday lands on a different date every single month. Same bills, same amounts — but the relationship between them shifts every month, and nobody ever showed them how to read it. The Payday Page is what finally makes it visible.

THE EXTRA PAYCHECK REFRAME

Bi-weekly workers get 26 paychecks a year — two months where three checks land instead of two. It is not extra. It was always coming. Planned money has a job before it arrives.

WHEN THERE IS SOMETHING ON THE COUNTER

Some people come carrying something they have been avoiding. An envelope they have not opened. A voicemail they have not returned. A number on their phone they do not recognize.

The avoidance is not laziness. It is fear. Fear makes the thing feel bigger than it probably is.

Help them open it. Read it. Take a breath. Then help them understand what they are looking at. Is it from the original company they owe? Or from a name they do not recognize — a collections agency, a debt buyer, a law firm? That distinction matters.

If they are not sure, they can photograph it and share it right here. You will help them read it clearly and without judgment.

Resources: consumerfinance.gov, their state attorney general's website, nonprofit credit counselors and legal aid organizations in their area.

Do not give legal or financial advice. Help them understand what they are looking at and where to find real information.

IMAGE AND VOICE CAPABILITY

If they share an image — a statement, a bill, a document, a screenshot — look at it carefully. Help them understand what it says, what it means for their picture, and what their next right step is. Never judge what you see. Just help them see it clearly.

DIANNA'S STORIES

Use naturally when they fit — never forced. These are Dianna's own stories. "She" here refers to Dianna.

The Frappé — A frappuccino every payday. Not whether she could afford it, but whether she had looked first. The Frappé is not the problem. The not-looking is.

Terry and the buggy — Terry's word for the grocery cart. Things go in the buggy because you need them, and the total at the register is not what you planned for. As Terry says: "It's in the buggy but not on the budget." Shopping drift is real. The buggy is not the problem. Not looking at the total before you go is.

The Bumper Fund — A small cushion. Not a full emergency fund. Just enough to bump the account away from zero on a hard week. Breathing room.

The flat tire — What happens with no Bumper Fund. The flat tire does not care about the budget.

The half payment strategy — Split a big bill across two paychecks. The bill gets paid. The paycheck survives.

Terry's barn — Dianna and Terry had a barn built so their kids could store their belongings there instead of paying monthly storage. A practical decision made out of love. Real solutions for real life, built on solid ground.

The kitchen table — Where Real Life Money lives. Honest, warm, practical.

WHAT NOT TO DO

Do not give specific financial advice — whether to invest, what to do with retirement money, which loan to take, which stock to buy. Say it warmly: "That one is really for a financial advisor. What I can help with is making sure you see your own picture clearly first."

Do not try to be a therapist. If someone shares real distress — deep hopelessness, thoughts of hurting themselves, anything that feels like an emergency — acknowledge what they said first. Tell them it matters that they shared it. Sit with it for a beat. Then gently mention LookFirst@myRealLifeMoney.com because Dianna reads every email, and for serious crisis, the 988 Suicide and Crisis Lifeline. Do not hand out an email address and move on.

Do not redirect to the method when someone is sharing a feeling. That is the single most important rule in this document.

Do not end with "come back when" or "talk to you next time." Stay present. Keep it open.

TRIGGER TAG

[OFFER_BOOK] — Use at the end of a message on its own line when the Look First book fits naturally. Not on the first response. Not more than once.

ONE LAST THING

Look First before you fix. Ask before you answer. See where someone actually is before pointing them anywhere. That is not just what Dianna teaches. That is how this conversation works.

DASHBOARD CONTEXT

You are embedded inside the RLM Dashboard. You open each conversation with a warm, tab-aware greeting. You wait for them to bring up what matters. Presence before data. Kindness before analysis.

TAB GREETINGS (match to current tab):
- Everything Page: warm curiosity about the mind sweep
- Payday Page: warm curiosity about what they are seeing
- Debt & Credit: warm presence, invite them to share what's on their mind
- Snowball / Avalanche: warm curiosity about the plan
- Goals: warm curiosity about what they are working toward
- Sinking Funds: warm curiosity about what is coming up
- 7-Day Tracker: warm curiosity about what they are noticing this week
`.trim();

// =====================================================================
// UTILS
// =====================================================================
const fmt = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+n || 0);
const uid = () => Math.random().toString(36).slice(2, 9);
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const fmtD = d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const getSuffix = n => { if (n >= 11 && n <= 13) return 'th'; switch (n % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; } };
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };

const CATS = ['Credit', 'Debt/Loan', 'Subscription', 'Utility', 'Insurance', 'Housing', 'Transportation', 'Food', 'Medical', 'Other'];
const STATS = ['Confirmed', 'Estimate', 'Zero Balance'];
const FREQS = ['Weekly', 'Biweekly', 'Semi-monthly', 'Monthly'];

const TAB_GREETINGS = {
  everything: name => `Hi ${name} — looks like you're working on your mind sweep. How's it going?`,
  payday:     name => `Hi ${name} — you're on the Payday Page. What are you seeing?`,
  debt:       name => `Hi ${name} — you're looking at your debt picture. What's on your mind?`,
  snowball:   name => `Hi ${name} — you're looking at your payoff plan. Want to talk through it?`,
  avalanche:  name => `Hi ${name} — you're looking at your payoff plan. Want to talk through it?`,
  goals:      name => `Hi ${name} — you're on your goals page. What are you working toward?`,
  funds:      name => `Hi ${name} — you're building your funds. What's coming up?`,
  tracker:    name => `Hi ${name} — you're tracking your week. What are you noticing?`,
};

function getPeriods(freq, startStr, amt) {
  if (!startStr || !amt) return [];
  const periods = [];
  let s = new Date(startStr + 'T00:00:00');
  for (let i = 0; i < 6; i++) {
    let e;
    if (freq === 'Weekly') e = addDays(s, 6);
    else if (freq === 'Biweekly') e = addDays(s, 13);
    else if (freq === 'Semi-monthly') {
      if (s.getDate() <= 15) e = new Date(s.getFullYear(), s.getMonth(), 15);
      else e = new Date(s.getFullYear(), s.getMonth() + 1, 0);
    } else { e = new Date(s.getFullYear(), s.getMonth() + 1, s.getDate() - 1); }
    periods.push({ start: new Date(s), end: new Date(e), amt: +amt });
    s = addDays(e, 1);
  }
  return periods;
}

function getBillsForPeriod(bills, start, end) {
  return bills.filter(b => {
    if (b.status === 'Zero Balance' || !b.dateDue || !b.amount) return false;
    const day = +b.dateDue;
    const sd = start.getDate(), ed = end.getDate();
    const sameM = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    return sameM ? (day >= sd && day <= ed) : (day >= sd || day <= ed);
  });
}

// =====================================================================
// SHARED UI COMPONENTS
// =====================================================================
function Btn({ children, onClick, variant = 'primary', small, style = {}, disabled }) {
  const base = { border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', borderRadius: 6, fontFamily: 'inherit', fontWeight: 600, transition: 'all .15s', padding: small ? '5px 12px' : '10px 20px', fontSize: small ? 12 : 14, opacity: disabled ? .5 : 1, ...style };
  const vars = { primary: { background: C.green, color: 'white' }, danger: { background: '#c0392b', color: 'white' }, ghost: { background: 'transparent', color: C.green, border: `1.5px solid ${C.green}` }, ghostDark: { background: 'transparent', color: C.charcoalLight, border: `1px solid ${C.creamDark}` } };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...(vars[variant] || {}) }}>{children}</button>;
}

function Card({ children, style = {} }) {
  return <div style={{ background: 'white', borderRadius: 12, padding: 18, boxShadow: '0 1px 6px rgba(0,0,0,.07)', marginBottom: 12, ...style }}>{children}</div>;
}

function Badge({ text }) {
  const map = { Confirmed: { background: '#d4edda', color: '#155724' }, Estimate: { background: '#fff3cd', color: '#856404' }, 'Zero Balance': { background: '#e2e3e5', color: '#6c757d' }, Credit: { background: '#cfe2ff', color: '#084298' }, 'Debt/Loan': { background: '#f8d7da', color: '#842029' }, Subscription: { background: '#e2d9f3', color: '#5a3287' } };
  const c = map[text] || { background: C.creamDark, color: C.charcoalLight };
  return <span style={{ ...c, borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{text}</span>;
}

function FI({ label, value, onChange, type = 'text', placeholder, options }) {
  const base = { width: '100%', padding: '7px 10px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, background: 'white', boxSizing: 'border-box', outline: 'none', color: '#2C2C2C' };  return (
    <div style={{ marginBottom: 8 }}>
      {label && <label style={{ display: 'block', fontSize: 10, color: C.charcoalLight, marginBottom: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .3 }}>{label}</label>}
      {options ? <select value={value} onChange={onChange} style={base}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base} />}
    </div>
  );
}

// =====================================================================
// BILL FORM
// =====================================================================
const EMPTY = { status: 'Confirmed', dateDue: '', amount: '', balance: '', company: '', category: 'Other', creditLimit: '', apr: '', minPayment: '', payoffDate: '', promoEnds: '', notes: '' };

function BillForm({ bill, onSave, onCancel }) {
  const [form, setForm] = useState(bill || EMPTY);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const isCD = ['Credit', 'Debt/Loan'].includes(form.category);
  return (
    <div style={{ background: C.cream, borderRadius: 10, padding: 14, border: `1.5px solid ${C.creamDark}`, marginBottom: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 640 ? '1fr 1fr' : '2fr 1fr 1fr 1fr 1fr', gap: 8 }}>
        <FI label="Company / Bill Name" value={form.company} onChange={e => set('company', e.target.value)} placeholder="e.g. Electric Co." />
        <FI label="Category" value={form.category} onChange={e => set('category', e.target.value)} options={CATS} />
        <FI label="Status" value={form.status} onChange={e => set('status', e.target.value)} options={STATS} />
        <FI label="Due Day (1–31)" value={form.dateDue} onChange={e => set('dateDue', e.target.value)} type="number" placeholder="1" />
        <FI label="Payment ($)" value={form.amount} onChange={e => set('amount', e.target.value)} type="number" placeholder="0.00" />
      </div>
      {isCD && (
        <div style={{ paddingTop: 8, borderTop: `1px solid ${C.creamDark}`, marginTop: 2 }}>
          <div style={{ fontSize: 10, color: C.sage, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Credit / Debt Fields</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
            <FI label="Balance Owed ($)" value={form.balance} onChange={e => set('balance', e.target.value)} type="number" />
            <FI label="Credit Limit ($)" value={form.creditLimit} onChange={e => set('creditLimit', e.target.value)} type="number" />
            <FI label="APR (%)" value={form.apr} onChange={e => set('apr', e.target.value)} type="number" placeholder="22.99" />
            <FI label="Min Payment ($)" value={form.minPayment} onChange={e => set('minPayment', e.target.value)} type="number" />
            <FI label="Payoff Date" value={form.payoffDate} onChange={e => set('payoffDate', e.target.value)} type="date" />
            <FI label="Promo Ends" value={form.promoEnds} onChange={e => set('promoEnds', e.target.value)} type="date" />
          </div>
        </div>
      )}
      {!isCD && <FI label="Balance Owed ($) — optional" value={form.balance} onChange={e => set('balance', e.target.value)} type="number" placeholder="0.00" />}
      <FI label="Notes" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Optional note..." />
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <Btn onClick={() => onSave({ ...form, id: form.id || uid() })}>Save Bill</Btn>
        <Btn variant="ghostDark" onClick={onCancel}>Cancel</Btn>
      </div>
    </div>
  );
}

// =====================================================================
// EVERYTHING PAGE
// =====================================================================
function EverythingPage({ bills, setBills }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const save = data => { if (editing) { setBills(p => p.map(b => b.id === data.id ? data : b)); setEditing(null); } else { setBills(p => [...p, data]); setAdding(false); } };
  const del = id => setBills(p => p.filter(b => b.id !== id));
  const active = bills.filter(b => b.status !== 'Zero Balance');
  const subs = active.filter(b => b.category === 'Subscription');
  const subTotal = subs.reduce((s, b) => s + (+b.amount || 0), 0);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>Everything Page</h2>
          <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12 }}>Mind sweep first. Get every bill, subscription, loan, and obligation out of your head and into a row.</p>
        </div>
        {!adding && !editing && <Btn onClick={() => setAdding(true)}>+ Add Bill</Btn>}
      </div>
      {adding && <BillForm onSave={save} onCancel={() => setAdding(false)} />}
      {bills.length === 0 && !adding ? (
        <Card style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>📋</div>
          <h3 style={{ color: C.green, fontFamily: 'Georgia,serif', margin: '0 0 8px' }}>Start Your Mind Sweep</h3>
          <p style={{ color: C.charcoalLight, maxWidth: 360, margin: '0 auto 18px', lineHeight: 1.6, fontSize: 13 }}>Add every bill, subscription, loan, and obligation. Any order. No rules. Messy is perfect.</p>
          <Btn onClick={() => setAdding(true)}>Add Your First Bill</Btn>
        </Card>
      ) : bills.length > 0 && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr style={{ background: C.green }}>{['Status', 'Due', 'Company', 'Category', 'Payment', 'Balance', ''].map(h => <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
              <tbody>
                {bills.map((bill, i) => editing === bill.id ? (
                  <tr key={bill.id}><td colSpan={7} style={{ padding: 10 }}><BillForm bill={bill} onSave={save} onCancel={() => setEditing(null)} /></td></tr>
                ) : (
                  <tr key={bill.id} style={{ background: bill.status === 'Zero Balance' ? '#f8f9fa' : i % 2 ? 'white' : C.cream, opacity: bill.status === 'Zero Balance' ? .6 : 1 }}>
                    <td style={{ padding: '8px 12px' }}><Badge text={bill.status} /></td>
                    <td style={{ padding: '8px 12px', color: C.charcoalLight, fontWeight: 600 }}>{bill.dateDue ? `${bill.dateDue}${getSuffix(+bill.dateDue)}` : '—'}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{bill.company || '—'}</td>
                    <td style={{ padding: '8px 12px' }}><Badge text={bill.category} /></td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: C.green }}>{bill.amount ? fmt(bill.amount) : '—'}</td>
                    <td style={{ padding: '8px 12px', color: C.charcoalLight }}>{bill.balance ? fmt(bill.balance) : '—'}</td>
                    <td style={{ padding: '8px 12px' }}><div style={{ display: 'flex', gap: 5 }}><Btn small variant="ghost" onClick={() => setEditing(bill.id)}>Edit</Btn><Btn small variant="danger" onClick={() => del(bill.id)}>✕</Btn></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 14px', background: C.cream, display: 'flex', gap: 20, fontSize: 12, color: C.charcoalLight }}>
            <span><strong style={{ color: C.charcoal }}>{active.length}</strong> active</span>
            <span><strong style={{ color: C.charcoal }}>{bills.filter(b => b.status === 'Zero Balance').length}</strong> zero balance</span>
            <span>Monthly: <strong style={{ color: C.green }}>{fmt(active.reduce((s, b) => s + (+b.amount || 0), 0))}</strong></span>
          </div>
        </Card>
      )}
      {subs.length > 0 && (
        <Card style={{ background: C.creamDark }}>
          <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.espresso, marginBottom: 10, fontSize: 14 }}>🔍 Subscription Watch</div>
          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 'repeat(3,1fr)', gap: 12 }}>
            {[['Monthly Total', fmt(subTotal), C.green], ['Count', subs.length, C.green], ['Annual Cost', fmt(subTotal * 12), C.espresso]].map(([l, v, col]) => (
              <div key={l}><div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase' }}>{l}</div><div style={{ fontSize: 20, fontWeight: 700, color: col }}>{v}</div></div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// =====================================================================
// PAYDAY PAGE
// =====================================================================
function PaydayPage({ bills, paySettings, setPaySettings, groceryBudgets, setGroceryBudgets }) {
  const periods = getPeriods(paySettings.frequency, paySettings.nextDate, paySettings.amount);
  let cum = 0;
  const pData = periods.map((p, i) => {
    const pb = getBillsForPeriod(bills, p.start, p.end);
    const bt = pb.reduce((s, b) => s + (+b.amount || 0), 0);
    const gr = +(groceryBudgets[i] || 0);
    cum += p.amt - bt - gr;
    return { ...p, bills: pb, bt, gr, cum: +cum.toFixed(2) };
  });
  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>Payday Page</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>Your next six paychecks, laid out before they arrive. Where income meets obligations.</p>
      <Card>
        <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.green, marginBottom: 10, fontSize: 14 }}>⚙️ Setup</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          <FI label="How often am I paid?" value={paySettings.frequency} onChange={e => setPaySettings(p => ({ ...p, frequency: e.target.value }))} options={FREQS} />
          <FI label="Next paycheck date" value={paySettings.nextDate} onChange={e => setPaySettings(p => ({ ...p, nextDate: e.target.value }))} type="date" />
          <FI label="Paycheck amount ($)" value={paySettings.amount} onChange={e => setPaySettings(p => ({ ...p, amount: e.target.value }))} type="number" placeholder="0.00" />
        </div>
      </Card>
      {periods.length === 0 && <Card style={{ textAlign: 'center', padding: 36, color: C.charcoalLight, fontSize: 13 }}>Enter your pay setup above to see your next six paychecks.</Card>}
      {pData.map((p, i) => (
        <Card key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div><div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>Pay Period {i + 1}</div><div style={{ fontSize: 11, color: C.charcoalLight }}>{fmtD(p.start)} — {fmtD(p.end)}</div></div>
            <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700, fontSize: 18, color: C.green }}>{fmt(p.amt)}</div><div style={{ fontSize: 10, color: C.charcoalLight }}>paycheck</div></div>
          </div>
          {p.bills.length === 0 ? <div style={{ color: C.charcoalLight, fontSize: 12, padding: '10px 0', borderTop: `1px solid ${C.creamDark}` }}>No bills due this period 🎉</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 10 }}>
              <thead><tr style={{ borderBottom: `2px solid ${C.creamDark}` }}>{['Due', 'Bill', 'Amount'].map((h, j) => <th key={h} style={{ textAlign: j === 2 ? 'right' : 'left', padding: '5px 7px', color: C.charcoalLight, fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>{p.bills.map(b => <tr key={b.id} style={{ borderBottom: `1px solid ${C.cream}` }}><td style={{ padding: '6px 7px', color: C.charcoalLight }}>{b.dateDue}{getSuffix(+b.dateDue)}</td><td style={{ padding: '6px 7px', fontWeight: 600 }}>{b.company}</td><td style={{ padding: '6px 7px', textAlign: 'right', fontWeight: 700, color: '#c0392b' }}>{fmt(b.amount)}</td></tr>)}</tbody>
            </table>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10, paddingTop: 10, borderTop: `1px solid ${C.creamDark}` }}>
            <div>
              <label style={{ display: 'block', fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Grocery Budget</label>
              <input type="number" value={p.gr || ''} placeholder="$0" onChange={e => setGroceryBudgets(g => ({ ...g, [i]: e.target.value }))} style={{ width: '100%', padding: '6px 9px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {[['Bills', fmt(p.bt), '#c0392b'], ['Left After Bills', fmt(p.amt - p.bt), C.charcoal], ['Running Total', fmt(p.cum), p.cum >= 0 ? C.green : '#c0392b']].map(([l, v, col]) => (
                <div key={l} style={{ background: l === 'Running Total' ? (p.cum >= 0 ? '#d4edda' : '#f8d7da') : C.cream, borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
                  <div style={{ fontWeight: 700, color: col, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          {p.cum < 0 && <div style={{ marginTop: 8, padding: '8px 12px', background: '#f8d7da', borderRadius: 7, fontSize: 12, color: '#842029' }}>⚠️ Short by <strong>{fmt(Math.abs(p.cum))}</strong>. Open your coach — there are always options.</div>}
          {p.cum > 0 && p.bills.length > 0 && <div style={{ marginTop: 8, padding: '8px 12px', background: '#d4edda', borderRadius: 7, fontSize: 12, color: '#155724' }}>💡 <strong>{fmt(p.cum)}</strong> left over. Extra debt payment? Sinking fund? Your call.</div>}
        </Card>
      ))}
    </div>
  );
}

// =====================================================================
// DEBT PAGE
// =====================================================================
function DebtPage({ bills }) {
  const db = bills.filter(b => ['Credit', 'Debt/Loan'].includes(b.category) && b.status !== 'Zero Balance');
  const tBal = db.reduce((s, b) => s + (+b.balance || 0), 0);
  const tLim = db.reduce((s, b) => s + (+b.creditLimit || 0), 0);
  const tMin = db.reduce((s, b) => s + (+b.minPayment || 0), 0);
  const util = tLim > 0 ? tBal / tLim : 0;
  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>Debt & Credit</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>Every card and loan in one place. Keep each card below 30% utilization. Under 10% is excellent.</p>
      {db.length === 0 ? <Card style={{ textAlign: 'center', padding: 40, color: C.charcoalLight, fontSize: 13 }}>No credit or debt entries yet. Add them on the Everything Page.</Card> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 12 }}>
            {[['Total Owed', fmt(tBal), C.espresso], ['Available Credit', fmt(tLim - tBal), C.slate], ['Overall Util.', tLim > 0 ? `${(util * 100).toFixed(1)}%` : '—', util < .3 ? C.green : util < .5 ? C.gold : '#c0392b'], ['Min/Month', fmt(tMin), C.charcoal]].map(([l, v, col]) => (
              <Card key={l} style={{ marginBottom: 0, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{l}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: col }}>{v}</div>
              </Card>
            ))}
          </div>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead><tr style={{ background: C.green }}>{['Lender', 'Balance', 'Limit', 'Utilization', 'APR', 'Min Payment', 'Notes'].map(h => <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: 'white', fontWeight: 700 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {db.sort((a, b) => (+b.balance || 0) - (+a.balance || 0)).map((b, i) => {
                    const u = b.creditLimit ? (+b.balance || 0) / (+b.creditLimit) : null;
                    const uc = u === null ? C.charcoalLight : u < .1 ? C.green : u < .3 ? C.gold : u < .5 ? '#e67e22' : '#c0392b';
                    return (
                      <tr key={b.id} style={{ background: i % 2 ? 'white' : C.cream }}>
                        <td style={{ padding: '8px 12px', fontWeight: 700 }}>{b.company}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 700, color: C.espresso }}>{fmt(b.balance)}</td>
                        <td style={{ padding: '8px 12px', color: C.charcoalLight }}>{b.creditLimit ? fmt(b.creditLimit) : '—'}</td>
                        <td style={{ padding: '8px 12px' }}>{u !== null ? <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 60, height: 6, background: C.creamDark, borderRadius: 3, overflow: 'hidden' }}><div style={{ width: `${Math.min(u * 100, 100)}%`, height: '100%', background: uc }} /></div><span style={{ color: uc, fontWeight: 700 }}>{(u * 100).toFixed(0)}%</span></div> : '—'}</td>
                        <td style={{ padding: '8px 12px', color: C.charcoalLight }}>{b.apr ? `${(+b.apr).toFixed(1)}%` : '—'}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600, color: C.green }}>{fmt(b.minPayment)}</td>
                        <td style={{ padding: '8px 12px', color: C.charcoalLight, fontSize: 11 }}>{b.notes || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// =====================================================================
// DEBT PLAN (SNOWBALL + AVALANCHE)
// =====================================================================
function DebtPlanPage({ bills, amount, setAmount, mode }) {
  const isSnow = mode === 'snowball';
  const sorted = bills.filter(b => ['Credit', 'Debt/Loan'].includes(b.category) && b.status !== 'Zero Balance' && b.balance)
    .sort((a, b) => isSnow ? (+a.balance || 0) - (+b.balance || 0) : (+b.apr || 0) - (+a.apr || 0));
  const total = +amount || 0;
  const tMin = sorted.reduce((s, b) => s + (+b.minPayment || 0), 0);
  const extra = Math.max(0, total - tMin);
  let rem = extra;
  const rows = sorted.map((bill, i) => {
    const min = +bill.minPayment || 0;
    let pay = min;
    if (i === 0 && rem > 0) { pay = Math.min(+bill.balance, min + rem); rem -= (pay - min); }
    return { ...bill, pay, months: +bill.balance && pay > 0 ? Math.ceil(+bill.balance / pay) : null };
  });
  const col = isSnow ? C.green : C.slate;
  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: col, fontFamily: 'Georgia,serif', fontSize: 20 }}>Debt {isSnow ? 'Snowball' : 'Avalanche'}</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>{isSnow ? 'Smallest balance first. Fast wins. Big motivation.' : 'Highest interest rate first. Mathematically the cheapest path.'}</p>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>💵 Total Available This Month</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$0.00" style={{ width: '100%', padding: '9px 12px', border: `2px solid ${isSnow ? C.gold : C.slate}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, boxSizing: 'border-box', background: isSnow ? '#fffbf0' : '#f0f4f8' }} />
          </div>
          <div style={{ textAlign: 'center', background: C.cream, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>Min Payments</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.charcoal }}>{fmt(tMin)}</div>
          </div>
          <div style={{ textAlign: 'center', background: isSnow ? '#d4edda' : '#d0e8f5', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3, color: isSnow ? '#155724' : '#084298' }}>Extra → Debt #1</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: col }}>{fmt(extra)}</div>
          </div>
        </div>
      </Card>
      {sorted.length === 0 ? <Card style={{ textAlign: 'center', padding: 36, color: C.charcoalLight, fontSize: 13 }}>No debt entries yet. Add them on the Everything Page.</Card> : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr style={{ background: col }}>{['#', isSnow ? 'Debt ↑ Smallest' : 'Debt ↓ Highest Rate', 'Balance', 'Rate', 'Min', 'Est. Payoff', 'Pay This Month'].map(h => <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: 'white', fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} style={{ background: i === 0 ? (isSnow ? '#d4edda' : '#d0e8f5') : i % 2 ? 'white' : C.cream }}>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: i === 0 ? col : C.charcoalLight }}>{i + 1}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{r.company}</td>
                    <td style={{ padding: '8px 12px' }}>{fmt(r.balance)}</td>
                    <td style={{ padding: '8px 12px', fontWeight: isSnow ? 400 : 700, color: isSnow ? C.charcoalLight : '#c0392b' }}>{r.apr ? `${(+r.apr).toFixed(1)}%` : '—'}</td>
                    <td style={{ padding: '8px 12px' }}>{fmt(r.minPayment)}</td>
                    <td style={{ padding: '8px 12px', color: C.charcoalLight }}>{r.months ? `~${r.months} mo` : '—'}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: col, fontSize: 14 }}>{fmt(r.pay)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// =====================================================================
// GOALS PAGE
// =====================================================================
function GoalsPage({ goal, setGoal, bills, paySettings }) {
  const periods = getPeriods(paySettings.frequency, paySettings.nextDate, paySettings.amount);
  const avg = periods.length ? periods.reduce((s, p) => s + p.amt, 0) / periods.length : 0;
  const contrib = +goal.contribution || 0;
  let needed = null;
  if (contrib > 0 && goal.which) {
    const d = bills.find(b => b.company && b.company.toLowerCase().includes(goal.which.toLowerCase()) && b.balance);
    const amt = d ? +d.balance : (!isNaN(+goal.which) ? +goal.which : 0);
    if (amt > 0) needed = Math.ceil(amt / contrib);
  }
  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>Where I'm Going</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>Pick one thing you'd like to be true a few months from now.</p>
      <Card>
        <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.green, marginBottom: 10 }}>Step 1 · Pick One Thing</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <FI label="What would you like to do?" value={goal.type} onChange={e => setGoal(g => ({ ...g, type: e.target.value }))} options={['Pay off a specific debt', 'Build an emergency fund', 'Save for something specific', 'Be debt-free entirely']} />
          <FI label="Which one, or how much?" value={goal.which} onChange={e => setGoal(g => ({ ...g, which: e.target.value }))} placeholder="e.g. Credit Card 1 or $1,000" />
        </div>
      </Card>
      <Card>
        <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.green, marginBottom: 10 }}>Step 2 · How You'll Get There</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <FI label="Target date (optional)" value={goal.targetDate} onChange={e => setGoal(g => ({ ...g, targetDate: e.target.value }))} type="date" />
          <FI label="Amount per paycheck ($)" value={goal.contribution} onChange={e => setGoal(g => ({ ...g, contribution: e.target.value }))} type="number" placeholder="50" />
        </div>
      </Card>
      <Card style={{ background: C.creamDark }}>
        <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.espresso, marginBottom: 12 }}>Step 3 · What the Numbers Show</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 12 }}>
          {[['Avg Paycheck', avg > 0 ? fmt(avg) : '—', C.green], ['Your Commitment', contrib > 0 ? fmt(contrib) : '—', C.gold], ['Paychecks to Goal', needed ? `~${needed}` : '—', C.espresso]].map(([l, v, col]) => (
            <div key={l}><div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>{l}</div><div style={{ fontSize: 20, fontWeight: 700, color: col }}>{v}</div></div>
          ))}
        </div>
        <div style={{ padding: '10px 12px', background: 'white', borderRadius: 8, fontSize: 12, color: C.charcoalLight, lineHeight: 1.6 }}>Your RLM Coach is here when you're ready to talk it through. No judgment. No pressure. Just ask.</div>
      </Card>
    </div>
  );
}

// =====================================================================
// SINKING FUNDS
// =====================================================================
function SinkingFunds({ funds, setFunds }) {
  const add = () => setFunds(f => [...f, { id: uid(), name: '', goal: '', targetDate: '', saved: '0', notes: '' }]);
  const upd = (id, k, v) => setFunds(f => f.map(x => x.id === id ? { ...x, [k]: v } : x));
  const del = id => setFunds(f => f.filter(x => x.id !== id));
  const tG = funds.reduce((s, f) => s + (+f.goal || 0), 0);
  const tS = funds.reduce((s, f) => s + (+f.saved || 0), 0);
  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>Sinking Funds</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>Save a little each pay period for the big expenses you know are coming.</p>
      {funds.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <Card style={{ marginBottom: 0, padding: 14, textAlign: 'center' }}><div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>Total Goal</div><div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>{fmt(tG)}</div></Card>
          <Card style={{ marginBottom: 0, padding: 14, textAlign: 'center' }}><div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>Total Saved</div><div style={{ fontSize: 22, fontWeight: 700, color: C.gold }}>{fmt(tS)}</div></Card>
        </div>
      )}
      {funds.map(fund => {
        const p = fund.goal ? Math.min(100, ((+fund.saved || 0) / (+fund.goal)) * 100) : 0;
        return (
          <Card key={fund.id} style={{ position: 'relative' }}>
            <button onClick={() => del(fund.id)} style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', color: C.charcoalLight, cursor: 'pointer', fontSize: 16 }}>✕</button>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 8, marginBottom: 8, paddingRight: 28 }}>
              <FI label="Fund Name" value={fund.name} onChange={e => upd(fund.id, 'name', e.target.value)} placeholder="e.g. Car Repair Fund" />
              <FI label="Goal ($)" value={fund.goal} onChange={e => upd(fund.id, 'goal', e.target.value)} type="number" />
              <FI label="Saved ($)" value={fund.saved} onChange={e => upd(fund.id, 'saved', e.target.value)} type="number" />
              <FI label="Target Date" value={fund.targetDate} onChange={e => upd(fund.id, 'targetDate', e.target.value)} type="date" />
            </div>
            <div style={{ height: 9, background: C.creamDark, borderRadius: 5, overflow: 'hidden', marginBottom: 5 }}>
              <div style={{ width: `${p}%`, height: '100%', background: p >= 100 ? C.gold : C.green, borderRadius: 5, transition: 'width .4s' }} />
            </div>
            <div style={{ fontSize: 11, color: C.charcoalLight }}>{p.toFixed(0)}% funded · {Math.max(0, (+fund.goal || 0) - (+fund.saved || 0)) > 0 ? `${fmt(Math.max(0, (+fund.goal || 0) - (+fund.saved || 0)))} to go` : '🎉 Goal reached!'}</div>
          </Card>
        );
      })}
      {funds.length === 0 && <Card style={{ textAlign: 'center', padding: 44 }}><div style={{ fontSize: 40, marginBottom: 8 }}>🪣</div><h3 style={{ color: C.green, fontFamily: 'Georgia,serif', margin: '0 0 8px' }}>No Sinking Funds Yet</h3><p style={{ color: C.charcoalLight, margin: '0 auto 16px', maxWidth: 340, lineHeight: 1.6, fontSize: 13 }}>Create funds for car repairs, holiday gifts, annual bills — any big expense you know is coming.</p><Btn onClick={add}>Create First Fund</Btn></Card>}
      {funds.length > 0 && <div style={{ textAlign: 'center', marginTop: 4 }}><Btn variant="ghost" onClick={add}>+ Add Sinking Fund</Btn></div>}
    </div>
  );
}

// =====================================================================
// 7-DAY SPENDING TRACKER
// =====================================================================
const DAY_THEMES = [
  { name: 'Wake-Up Day',     prompt: 'Where did my money go today?' },
  { name: 'The Trigger',     prompt: 'What was I feeling right before I spent?' },
  { name: 'The Pattern',     prompt: 'Do I see a pattern forming?' },
  { name: 'The Why',         prompt: 'Why did I really buy that?' },
  { name: 'The Feeling',     prompt: 'How do I feel about this week so far?' },
  { name: 'The Reflection',  prompt: 'What will I do differently next week?' },
  { name: 'The Big Picture', prompt: 'What surprised me most?' },
];

const PAY_METHODS = ['Card', 'Cash', 'Debit', 'Venmo/PayPal', 'Other'];
const TRACKER_EMPTY = { description: '', method: 'Card', amount: '', notes: '' };

function SpendingTracker({ entries, setEntries, startDate, setStartDate }) {
  const [adding, setAdding] = useState(null);
  const [form, setForm] = useState({ ...TRACKER_EMPTY });
  const [guess, setGuess] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Days run FORWARD from startDate (Day 1 = start, Day 7 = start + 6)
  const days = startDate ? Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startDate + 'T00:00:00');
    d.setDate(d.getDate() + i);
    return d;
  }) : [];

  const dayStr = d => {
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const dy = String(d.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${dy}`;
  };
  const dayLabel = d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const allEntries = startDate ? entries.filter(e => {
    const d = new Date(e.date + 'T00:00:00');
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(startDate + 'T00:00:00');
    end.setDate(end.getDate() + 6);
    return d >= start && d <= end;
  }) : [];

  const total7 = allEntries.reduce((s, e) => s + (+e.amount || 0), 0);

  const journeyComplete = startDate ? (() => {
    const end = new Date(startDate + 'T00:00:00');
    end.setDate(end.getDate() + 7);
    return today >= end;
  })() : false;

  const save = (dateStr) => {
    if (!form.amount || !form.description) return;
    setEntries(e => [...e, { ...form, id: uid(), date: dateStr, amount: +form.amount }]);
    setForm({ ...TRACKER_EMPTY });
    setAdding(null);
  };

  const del = id => setEntries(e => e.filter(x => x.id !== id));

  const handleReset = () => {
    setEntries([]);
    setStartDate('');
    setConfirmReset(false);
    setGuess('');
  };

  // ── PRE-START SCREEN ──
  if (!startDate) {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>7-Day Money Discovery Tracker</h2>
          <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12, fontStyle: 'italic' }}>For the next seven days, write down every purchase you make. No judgment. No changes. Just look.</p>
        </div>
        <Card style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
          <h3 style={{ color: C.green, fontFamily: 'Georgia,serif', margin: '0 0 10px', fontSize: 20 }}>Before You Begin</h3>
          <p style={{ color: C.charcoalLight, maxWidth: 400, margin: '0 auto 22px', lineHeight: 1.7, fontSize: 13 }}>
            This is your seven-day discovery. You are not changing anything yet. You are just looking.<br />
            Write down every purchase — big, small, the coffee, the Target run, all of it. No judgment here.
          </p>
          <div style={{ maxWidth: 300, margin: '0 auto 24px', textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 5 }}>My best guess — weekly spending total</div>
            <input
              type="number"
              value={guess}
              onChange={e => setGuess(e.target.value)}
              placeholder="$0.00"
              style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 14, background: 'white', boxSizing: 'border-box', color: '#2C2C2C' }}
            />
          </div>
          <Btn onClick={() => setStartDate(todayISO())} style={{ fontSize: 15, padding: '12px 28px' }}>
            Start My 7-Day Journey
          </Btn>
          <p style={{ color: C.charcoalLight, fontSize: 11, marginTop: 14 }}>Today becomes Day 1. Each day unlocks as it arrives.</p>
        </Card>
      </div>
    );
  }

  // ── ACTIVE TRACKER ──
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>7-Day Money Discovery Tracker</h2>
          <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12, fontStyle: 'italic' }}>
            Journey started {new Date(startDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            {guess ? ` · Best guess: ${fmt(+guess)}` : ''}
          </p>
        </div>
        {journeyComplete && !confirmReset && (
          <Btn variant="ghostDark" small onClick={() => setConfirmReset(true)}>Start New Journey</Btn>
        )}
      </div>

      {confirmReset && (
        <Card style={{ background: '#fff3cd', border: `1.5px solid ${C.gold}`, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, color: C.espresso, marginBottom: 6 }}>Start a new journey?</div>
          <p style={{ fontSize: 12, color: C.charcoalLight, margin: '0 0 12px' }}>This will clear your current tracker entries and start fresh from today.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn small variant="danger" onClick={handleReset}>Yes, start fresh</Btn>
            <Btn small variant="ghostDark" onClick={() => setConfirmReset(false)}>Cancel</Btn>
          </div>
        </Card>
      )}

      {journeyComplete && !confirmReset && (
        <Card style={{ background: C.creamDark, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.espresso, marginBottom: 6, fontSize: 15 }}>🎉 You finished your 7-day discovery.</div>
          <p style={{ fontSize: 12, color: C.charcoalLight, margin: '0 0 4px' }}>
            Total spent: <strong style={{ color: C.espresso }}>{fmt(total7)}</strong>
            {guess ? `. Your guess was ${fmt(+guess)} — you came in ${+guess >= total7 ? `${fmt(+guess - total7)} under.` : `${fmt(total7 - +guess)} over.`}` : '.'}
          </p>
          <p style={{ fontSize: 12, color: C.charcoalLight, margin: 0 }}>The looking is never as bad as the not knowing. Ready to start another week?</p>
        </Card>
      )}

      {days.map((day, i) => {
        const ds = dayStr(day);
        const theme = DAY_THEMES[i];
        const dayE = allEntries.filter(e => e.date === ds);
        const dayTotal = dayE.reduce((s, e) => s + (+e.amount || 0), 0);
        const isToday = ds === todayISO();
        const isFuture = day > today;

        return (
          <Card key={ds} style={{ borderLeft: `4px solid ${isToday ? C.gold : isFuture ? C.creamDark : C.green}`, opacity: isFuture ? .42 : 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ background: isToday ? C.gold : isFuture ? C.creamDark : C.green, color: isFuture ? C.charcoalLight : 'white', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '2px 7px', textTransform: 'uppercase' }}>Day {i + 1}</span>
                  <span style={{ fontWeight: 700, fontFamily: 'Georgia,serif', fontSize: 14, color: isToday ? C.gold : isFuture ? C.charcoalLight : C.green }}>{theme.name}</span>
                  {isToday && <span style={{ fontSize: 10, background: C.gold, color: 'white', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>Today</span>}
                </div>
                <div style={{ fontSize: 11, color: C.charcoalLight, fontStyle: 'italic' }}>{dayLabel(day)} · {theme.prompt}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {dayTotal > 0 && <div style={{ fontWeight: 700, fontSize: 15, color: C.espresso, marginBottom: 4 }}>{fmt(dayTotal)}</div>}
                {!isFuture && adding !== ds && (
                  <Btn small variant="ghost" onClick={() => { setForm({ ...TRACKER_EMPTY }); setAdding(ds); }}>+ Add</Btn>
                )}
                {isFuture && <div style={{ fontSize: 11, color: C.charcoalLight }}>Unlocks {dayLabel(day)}</div>}
              </div>
            </div>

            {adding === ds && (
              <div style={{ background: C.cream, borderRadius: 8, padding: 10, marginBottom: 8, border: `1px solid ${C.creamDark}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 7 }}>
                  <FI label="What I Bought / Where" value={form.description} onChange={e => setF('description', e.target.value)} placeholder="e.g. Target, morning coffee" />
                  <FI label="Card / Cash" value={form.method} onChange={e => setF('method', e.target.value)} options={PAY_METHODS} />
                  <FI label="Amount ($)" value={form.amount} onChange={e => setF('amount', e.target.value)} type="number" placeholder="0.00" />
                  <FI label="Notes" value={form.notes} onChange={e => setF('notes', e.target.value)} placeholder="Optional" />
                </div>
                <div style={{ display: 'flex', gap: 7, marginTop: 4 }}>
                  <Btn small onClick={() => save(ds)}>Save</Btn>
                  <Btn small variant="ghostDark" onClick={() => setAdding(null)}>Cancel</Btn>
                </div>
              </div>
            )}

            {dayE.length === 0 && adding !== ds && !isFuture && (
              <div style={{ fontSize: 12, color: C.charcoalLight, padding: '2px 0 4px' }}>Nothing logged yet.</div>
            )}

            {dayE.length > 0 && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${C.creamDark}` }}>
                      {['What I Bought / Where', 'Card / Cash', 'Amount', 'Notes', ''].map((h, j) => (
                        <th key={j} style={{ padding: '5px 7px', textAlign: j === 2 ? 'right' : 'left', color: C.charcoalLight, fontWeight: 700, fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dayE.map(e => (
                      <tr key={e.id} style={{ borderBottom: `1px solid ${C.cream}` }}>
                        <td style={{ padding: '6px 7px', fontWeight: 600 }}>{e.description}</td>
                        <td style={{ padding: '6px 7px', color: C.charcoalLight }}>{e.method}</td>
                        <td style={{ padding: '6px 7px', fontWeight: 700, color: C.espresso, textAlign: 'right' }}>{fmt(e.amount)}</td>
                        <td style={{ padding: '6px 7px', color: C.charcoalLight, fontSize: 11 }}>{e.notes || '—'}</td>
                        <td style={{ padding: '6px 7px', textAlign: 'right' }}>
                          <button onClick={() => del(e.id)} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, cursor: 'pointer', fontSize: 13 }}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ paddingTop: 7, borderTop: `1px solid ${C.creamDark}`, display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginRight: 12 }}>Daily Total</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.espresso }}>{fmt(dayTotal)}</span>
                </div>
              </div>
            )}
          </Card>
        );
      })}

      {total7 > 0 && (
        <Card style={{ background: C.green }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'white', fontWeight: 700, fontFamily: 'Georgia,serif', fontSize: 16 }}>7-Day Grand Total</div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 24 }}>{fmt(total7)}</div>
          </div>
          {guess && (
            <div style={{ color: C.sageLight, fontSize: 12, marginTop: 5 }}>
              Your guess was {fmt(+guess)}. {+guess >= total7 ? `You came in ${fmt(+guess - total7)} under.` : `You came in ${fmt(total7 - +guess)} over.`}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

// =====================================================================
// COACH PANEL
// =====================================================================
function CoachPanel({ bills, paySettings, activeTab, isOpen, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
const [awaitingName, setAwaitingName] = useState(false);
const [storageLoaded, setStorageLoaded] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [imgType, setImgType] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const endRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await window.storage.get('rlm_username');
        if (r?.value) setUserName(r.value);
      } catch {}
      setStorageLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (!isOpen || !storageLoaded) return;
    if (!userName) {
     setMsgs([{ role: 'assistant', content: "Hi! I'm your RLM Coach — I'm here and ready whenever you are. What's on your mind today?" }]);
setAwaitingName(false);
    } else {
      const greeting = TAB_GREETINGS[activeTab]?.(userName) || `Hi ${userName} — I'm here. What's on your mind?`;
      setMsgs([{ role: 'assistant', content: greeting }]);
      setAwaitingName(false);
    }
  }, [isOpen, activeTab, storageLoaded]);
  
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, loading]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target.result;
      setImgData(dataUrl.split(',')[1]);
      setImgType(file.type || 'image/jpeg');
      setImgPreview(dataUrl);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const clearImage = () => { setImgData(null); setImgType(null); setImgPreview(null); };

  const buildCtx = () => {
    const active = bills.filter(b => b.status !== 'Zero Balance');
    const tM = active.reduce((s, b) => s + (+b.amount || 0), 0);
    const debts = active.filter(b => ['Credit', 'Debt/Loan'].includes(b.category));
    const tD = debts.reduce((s, b) => s + (+b.balance || 0), 0);
    const hiUtil = debts.filter(b => b.creditLimit && (+b.balance / +b.creditLimit) > .3).map(b => b.company);
    return `⚠️ LIVE DATA — always use these numbers, ignore any older numbers from memory. Current tab:: ${activeTab}. Bills entered: ${active.length}. Monthly obligations: ${fmt(tM)}. Total debt balance: ${fmt(tD)}. Paycheck: ${fmt(paySettings.amount)} ${paySettings.frequency || ''}. ${hiUtil.length ? `Cards above 30% utilization: ${hiUtil.join(', ')}.` : ''}`;
  };

  const send = async () => {
    if ((!inp.trim() && !imgData) || loading) return;
    if (awaitingName) {
      const name = inp.trim() || 'friend';
      setUserName(name);
      try { await window.storage.set('rlm_username', name); } catch {}
      setAwaitingName(false);
      const greeting = TAB_GREETINGS[activeTab]?.(name) || `Nice to meet you, ${name}. I'm here whenever you're ready.`;
      setMsgs(m => [...m, { role: 'user', content: name }, { role: 'assistant', content: greeting }]);
      setInp('');
      return;
    }
    const userContent = imgData
      ? [{ type: 'image', source: { type: 'base64', media_type: imgType, data: imgData } }, ...(inp.trim() ? [{ type: 'text', text: inp.trim() }] : [{ type: 'text', text: 'What is this?' }])]
      : inp.trim();
    const displayMsg = { role: 'user', content: inp.trim() || '📷 Image shared', imgPreview };
    const apiMsg = { role: 'user', content: userContent };
    const allDisplay = [...msgs, displayMsg];
    const allApi = msgs.filter(m => !m.imgPreview).map(m => ({ role: m.role, content: m.content })).concat(apiMsg);
    setMsgs(allDisplay);
    setInp('');
    clearImage();
    setLoading(true);
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, system: `${JOURNEY_SYSTEM_PROMPT}\n\nUser context right now: ${buildCtx()}`, messages: allApi.slice(1) })
      });
      const data = await res.json();
      const reply = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || 'Try again?';
      setMsgs(m => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'Something went wrong. Check your connection and try again.' }]);
    }
    setLoading(false);
  };

  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', right: 18, bottom: 72, width: 370, height: 520, background: 'white', borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,.2)', display: 'flex', flexDirection: 'column', zIndex: 1000, overflow: 'hidden', border: `2px solid ${C.green}` }}>
      <div style={{ background: C.green, padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontFamily: 'Georgia,serif', fontSize: 14 }}>RLM Coach | Journey</div>
          <div style={{ color: C.sageLight, fontSize: 10 }}>Real Life Money · No judgment. Just answers.</div>
        </div>
        <button onClick={onClose} style={{ color: 'white', background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ maxWidth: '88%', alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? C.green : C.cream, color: m.role === 'user' ? 'white' : C.charcoal, padding: '8px 12px', borderRadius: m.role === 'user' ? '13px 13px 3px 13px' : '13px 13px 13px 3px', fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {m.imgPreview && <img src={m.imgPreview} alt="Shared" style={{ maxWidth: '100%', borderRadius: 6, marginBottom: m.content && m.content !== '📷 Image shared' ? 6 : 0 }} />}
            {m.content && m.content !== '📷 Image shared' && m.content}
            {m.content === '📷 Image shared' && !m.imgPreview && '📷 Image shared'}
          </div>
        ))}
        {loading && <div style={{ alignSelf: 'flex-start', background: C.cream, padding: '8px 12px', borderRadius: '13px 13px 13px 3px', fontSize: 12, color: C.charcoalLight }}>Thinking…</div>}
        <div ref={endRef} />
      </div>
      {imgPreview && (
        <div style={{ padding: '8px 12px', background: C.creamDark, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <img src={imgPreview} alt="Preview" style={{ height: 40, width: 40, objectFit: 'cover', borderRadius: 4 }} />
          <span style={{ fontSize: 11, color: C.charcoalLight, flex: 1 }}>Image ready to send</span>
          <button onClick={clearImage} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, cursor: 'pointer', fontSize: 16 }}>✕</button>
        </div>
      )}
      <div style={{ padding: '9px 10px', borderTop: `1px solid ${C.creamDark}`, display: 'flex', gap: 7, flexShrink: 0 }}>
        <button onClick={() => fileRef.current?.click()} title="Share a bill or statement" style={{ background: C.cream, border: `1px solid ${C.creamDark}`, borderRadius: 8, width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>📎</button>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImage} style={{ display: 'none' }} />
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder="Ask anything about your money…" style={{ flex: 1, padding: '7px 11px', border: `1px solid ${C.creamDark}`, borderRadius: 20, fontFamily: 'inherit', fontSize: 12, outline: 'none', color: '#2C2C2C' }} />
        <button onClick={send} disabled={loading || (!inp.trim() && !imgData)} style={{ background: (inp.trim() || imgData) && !loading ? C.green : C.creamDark, color: (inp.trim() || imgData) && !loading ? 'white' : C.charcoalLight, border: 'none', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', fontSize: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>→</button>
      </div>
    </div>
  );
}

// =====================================================================
// MAIN APP
// =====================================================================
export default function App() {
  const [bills, setBills] = useState([]);
  const [pay, setPay] = useState({ frequency: 'Biweekly', nextDate: '', amount: '' });
  const [grocery, setGrocery] = useState({});
  const [funds, setFunds] = useState([]);
  const [goal, setGoal] = useState({ type: 'Pay off a specific debt', which: '', targetDate: '', contribution: '' });
  const [snow, setSnow] = useState('');
  const [aval, setAval] = useState('');
  const [tracker, setTracker] = useState([]);
  const [trackerStart, setTrackerStart] = useState('');
  const [tab, setTab] = useState('everything');
  const [coach, setCoach] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/verify') return;
    fetch('/api/auth/check')
      .then(r => { if (r.ok) setAuthReady(true); else window.location.href = '/api/auth/login'; })
      .catch(() => { window.location.href = '/api/auth/login'; });
  }, []);

  useEffect(() => {
  if (!authReady) return;
  const load = async () => {
    try {
      const res = await fetch('/api/dashboard-data', { credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          const d = json.data;
          if (d.bills) setBills(d.bills);
          if (d.pay) setPay(d.pay);
          if (d.grocery) setGrocery(d.grocery);
          if (d.funds) setFunds(d.funds);
          if (d.goal) setGoal(d.goal);
          if (d.snow !== undefined) setSnow(d.snow);
          if (d.aval !== undefined) setAval(d.aval);
          if (d.tracker) setTracker(d.tracker);
          if (d.trackerStart) setTrackerStart(d.trackerStart);
          setDataLoaded(true);
          return;
        }
      }
    } catch {}
    const keys = [['bills', setBills], ['pay', setPay], ['grocery', setGrocery], ['funds', setFunds], ['goal', setGoal], ['snow', setSnow], ['aval', setAval], ['tracker', setTracker], ['trackerStart', setTrackerStart]];
    for (const [k, set] of keys) {
      try { const r = await window.storage.get(`rlm_${k}`); if (r?.value) set(JSON.parse(r.value)); } catch {}
    }
    setDataLoaded(true);
  };
  load();
}, [authReady]);

  const sv = async (k, v) => { try { await window.storage.set(`rlm_${k}`, JSON.stringify(v)); } catch {} };
  useEffect(() => { sv('bills', bills); }, [bills]);
  useEffect(() => { sv('pay', pay); }, [pay]);
  useEffect(() => { sv('grocery', grocery); }, [grocery]);
  useEffect(() => { sv('funds', funds); }, [funds]);
  useEffect(() => { sv('goal', goal); }, [goal]);
  useEffect(() => { sv('snow', snow); }, [snow]);
  useEffect(() => { sv('aval', aval); }, [aval]);
  useEffect(() => { sv('tracker', tracker); }, [tracker]);
  useEffect(() => { sv('trackerStart', trackerStart); }, [trackerStart]);

useEffect(() => {
  if (!dataLoaded) return;
  saveToSupabase({ bills, pay, grocery, funds, goal, snow, aval, tracker, trackerStart });
}, [bills, pay, grocery, funds, goal, snow, aval, tracker, trackerStart, dataLoaded]);
  
  const saveToSupabase = async (data) => {
  try {
    await fetch('/api/dashboard-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ data })
    });
  } catch {}
};

  if (window.location.pathname === '/verify') return <VerifyPage />;
  if (!authReady) return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
        <div style={{ color: C.green, fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700 }}>Real Life Money</div>
        <div style={{ color: C.charcoalLight, fontSize: 13, marginTop: 6 }}>Checking your membership…</div>
      </div>
    </div>
  );

  const TABS = [
    { id: 'everything', label: 'Everything Page' },
    { id: 'payday',     label: 'Payday' },
    { id: 'debt',       label: 'Debt & Credit' },
    { id: 'snowball',   label: 'Snowball' },
    { id: 'avalanche',  label: 'Avalanche' },
    { id: 'goals',      label: 'Goals' },
    { id: 'funds',      label: 'Sinking Funds' },
    { id: 'tracker',    label: '7-Day Tracker' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: '"Segoe UI", system-ui, sans-serif', color: C.charcoal }}>
      <div style={{ background: C.green, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={rlmLogo} alt="RLM" style={{ height: 36, width: 36, borderRadius: '50%' }} />
          <div style={{ color: 'white', fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700 }}>RLM Coach | Journey</div>
          {window.innerWidth >= 640 && <div style={{ color: C. white, fontSize: 11, fontStyle: 'italic' }}>See It - Understand It - Live It</div>}
        </div>
        </div>
      <div style={{ background: 'white', borderBottom: `1px solid ${C.creamDark}`, overflowX: 'auto' }}>
        <div style={{ display: 'flex', padding: '0 18px', minWidth: 'max-content' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '11px 15px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.green : C.charcoalLight, whiteSpace: 'nowrap', borderBottom: `3px solid ${tab === t.id ? C.green : 'transparent'}`, transition: 'all .15s' }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '18px 14px 110px' }}>
        {tab === 'everything' && <EverythingPage bills={bills} setBills={setBills} />}
        {tab === 'payday'     && <PaydayPage bills={bills} paySettings={pay} setPaySettings={setPay} groceryBudgets={grocery} setGroceryBudgets={setGrocery} />}
        {tab === 'debt'       && <DebtPage bills={bills} />}
        {tab === 'snowball'   && <DebtPlanPage bills={bills} amount={snow} setAmount={setSnow} mode="snowball" />}
        {tab === 'avalanche'  && <DebtPlanPage bills={bills} amount={aval} setAmount={setAval} mode="avalanche" />}
        {tab === 'goals'      && <GoalsPage goal={goal} setGoal={setGoal} bills={bills} paySettings={pay} />}
        {tab === 'funds'      && <SinkingFunds funds={funds} setFunds={setFunds} />}
        {tab === 'tracker'    && <SpendingTracker entries={tracker} setEntries={setTracker} startDate={trackerStart} setStartDate={setTrackerStart} />}
      </div>

      <button onClick={() => setCoach(o => !o)} style={{ position: 'fixed', bottom: 18, right: 18, background: coach ? C.charcoal : C.green, color: 'white', border: 'none', borderRadius: 50, padding: '12px 20px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, boxShadow: '0 4px 20px rgba(43,94,63,.4)', display: 'flex', alignItems: 'center', gap: 7, zIndex: 999, transition: 'all .2s' }}>
        {coach ? '✕ Close Coach' : '💬 Ask Coach'}
      </button>

      <CoachPanel bills={bills} paySettings={pay} activeTab={tab} isOpen={coach} onClose={() => setCoach(false)} />
    </div>
  );
}
