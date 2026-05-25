import { useState, useEffect, useRef } from "react";
import rlmLogo from './assets/RLM_icon_192x192.png';
import VerifyPage from './VerifyPage';

// =====================================================================
// BRAND COLORS
// =====================================================================
const C = {
  green: '#2B5E3F', greenAlt: '#2D6A4A', cream: '#F7F3EB', creamDark: '#EDE7D9',
  sage: '#7A8B75', sageLight: '#A8B9A3', charcoal: '#2C2C2C', charcoalLight: '#4A4A4A',
  gold: '#C9A440', goldLight: '#E4BB54', espresso: '#3E2918', slate: '#4F7A9E', slateDark: '#3D6289',
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
THE REAL PAGE — see what is really happening between paychecks. Scan a receipt or log a purchase. The running total shows what has been spent this cycle and how many days until the next paycheck lands. No judgment. Just clarity.

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

If they share an image — a statement, a bill, a document, a screenshot — look at it carefully. Help them understand what it says, what it means for their picture, and what their next right step is. Never judge what you see. Just help them  clearly.

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
- The Real Page: warm curiosity about what they are noticing this cycle
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

const focusNextOnEnter = e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  const els = Array.from(document.querySelectorAll('input:not([type=hidden]):not([type=file]):not([type=checkbox]):not([disabled]), select:not([disabled]), textarea:not([disabled])'));
  const idx = els.indexOf(e.currentTarget);
  if (idx >= 0 && idx < els.length - 1) {
    const next = els[idx + 1];
    next.focus();
    if (typeof next.select === 'function') { try { next.select(); } catch { /* select not supported */ } }
  } else {
    e.currentTarget.blur();
  }
};

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
  real:       name => `Hi ${name} — you're on The Real Page. What are you noticing this cycle?`,
};

const TAB_LABELS = {
  everything: 'Everything Page',
  payday:     'Payday',
  debt:       'Debt & Credit',
  snowball:   'Snowball',
  avalanche:  'Avalanche',
  goals:      'Goals',
  funds:      'Sinking Funds',
  real:       'The Real Page',
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

function getActualDueDate(dayNum, start, end) {
  const day = +dayNum;
  const sameM = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameM) return new Date(start.getFullYear(), start.getMonth(), day);
  return day >= start.getDate()
    ? new Date(start.getFullYear(), start.getMonth(), day)
    : new Date(end.getFullYear(), end.getMonth(), day);
}

function getBillsForPeriod(bills, start, end) {
  return bills.filter(b => {
    if (b.status === 'Zero Balance' || !b.dateDue || !b.amount) return false;
    if (b.halfPayment) return true;
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
      {options ? <select value={value} onChange={onChange} onKeyDown={focusNextOnEnter} style={base}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
        : <input type={type} value={value} onChange={onChange} onKeyDown={focusNextOnEnter} placeholder={placeholder} style={base} />}
    </div>
  );
}

// =====================================================================
// BILL FORM
// =====================================================================
const EMPTY = { status: 'Confirmed', dateDue: '', amount: '', balance: '', company: '', category: 'Other', creditLimit: '', apr: '', minPayment: '', payoffDate: '', promoEnds: '', notes: '', halfPayment: false };

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
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, gridColumn: 'span 2', marginTop: 2 }}><input type="checkbox" id="halfPayment" checked={!!form.halfPayment} onChange={e => set('halfPayment', e.target.checked)} style={{ accentColor: C.green, width: 16, height: 16, marginTop: 2 }} /><label htmlFor="halfPayment" style={{ fontSize: 12, color: C.charcoal, cursor: 'pointer', lineHeight: 1.45 }}><div>½ Half Payment Strategy — pay half at every payday</div><div style={{ fontSize: 11, color: C.charcoalLight, marginTop: 2 }}>Third-paycheck months dig into principal or pay you ahead.</div></label></div>
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
function EverythingPage({ bills, setBills, askCoach }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const save = data => { if (editing) { setBills(p => p.map(b => b.id === data.id ? data : b)); setEditing(null); } else { setBills(p => [...p, data]); setAdding(false); } };
  const del = id => setBills(p => p.filter(b => b.id !== id));
  const active = bills.filter(b => b.status !== 'Zero Balance');
  const subs = active.filter(b => b.category === 'Subscription');
  const subTotal = subs.reduce((s, b) => s + (+b.amount || 0), 0);

  const COLS = [
    { label: 'Status',   key: 'status',   type: 'string' },
    { label: 'Due',      key: 'dateDue',  type: 'number' },
    { label: 'Company',  key: 'company',  type: 'string' },
    { label: 'Category', key: 'category', type: 'string' },
    { label: 'Payment',  key: 'amount',   type: 'number' },
    { label: 'Balance',  key: 'balance',  type: 'number' },
  ];

  const handleSort = key => {
    if (sortBy !== key) { setSortBy(key); setSortDir('asc'); }
    else if (sortDir === 'asc') { setSortDir('desc'); }
    else { setSortBy(null); setSortDir('asc'); }
  };

  const sortedBills = (() => {
    if (!sortBy) return bills;
    const col = COLS.find(c => c.key === sortBy);
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...bills].sort((a, b) => {
      const av = a[sortBy], bv = b[sortBy];
      const aEmpty = av === '' || av == null;
      const bEmpty = bv === '' || bv == null;
      if (aEmpty && bEmpty) return 0;
      if (aEmpty) return 1;
      if (bEmpty) return -1;
      if (col.type === 'number') return (+av - +bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  })();
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
              <thead><tr style={{ background: C.green }}>{COLS.map(c => <th key={c.label} onClick={() => handleSort(c.key)} style={{ padding: '9px 12px', textAlign: 'left', color: 'white', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}>{c.label}{sortBy === c.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}</th>)}<th style={{ padding: '9px 12px' }}></th></tr></thead>
              <tbody>
                {sortedBills.map((bill, i) => editing === bill.id ? (
                  <tr key={bill.id}><td colSpan={7} style={{ padding: 10 }}><BillForm bill={bill} onSave={save} onCancel={() => setEditing(null)} /></td></tr>
                ) : (
                  <tr key={bill.id} style={{ background: bill.status === 'Zero Balance' ? '#f8f9fa' : i % 2 ? 'white' : C.cream, opacity: bill.status === 'Zero Balance' ? .6 : 1 }}>
                    <td style={{ padding: '8px 12px' }}><Badge text={bill.status} /></td>
                    <td style={{ padding: '8px 12px', color: C.charcoalLight, fontWeight: 600 }}>{bill.dateDue ? `${bill.dateDue}${getSuffix(+bill.dateDue)}` : '—'}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{bill.company || '—'}</td>
                    <td style={{ padding: '8px 12px' }}><Badge text={bill.category} /></td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: C.green }}>{bill.amount ? fmt(bill.amount) : '—'}</td>
                    <td style={{ padding: '8px 12px', color: C.charcoalLight }}>{bill.balance ? fmt(bill.balance) : '—'}</td>
                    <td style={{ padding: '8px 12px' }}><div style={{ display: 'flex', gap: 5, alignItems: 'center' }}><Btn small variant="ghost" onClick={() => setEditing(bill.id)}>Edit</Btn><Btn small variant="danger" onClick={() => del(bill.id)}>✕</Btn>{bill.company && <button onClick={() => askCoach(bill.company)} title={`Open coach about ${bill.company}`} style={{ background: 'none', border: 'none', color: C.green, cursor: 'pointer', fontSize: 11, padding: '2px 6px', textDecoration: 'underline', fontFamily: 'inherit' }}>ask coach</button>}</div></td>
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
function PaydayPage({ bills, paySettings, setPaySettings, groceryBudgets, setGroceryBudgets, paycheckOverrides, setPaycheckOverrides, paidBills, setPaidBills, skippedBills, setSkippedBills, bankBalance, setBankBalance }) {
  const periods = getPeriods(paySettings.frequency, paySettings.nextDate, paySettings.amount);
  const pData = periods.map((p, i) => {
  const pb = getBillsForPeriod(bills, p.start, p.end);
  const periodKey = p.start.toISOString().slice(0,10);
  const bt = pb.reduce((s, b) => {
    if (skippedBills[`${b.id}_${periodKey}`]) return s;
    return s + (b.halfPayment ? (+b.amount || 0) / 2 : (+b.amount || 0));
  }, 0);
  const gr = +(groceryBudgets[i] || 0);
  const amt = i === 0 ? +paySettings.amount : +(paycheckOverrides[i] !== undefined ? paycheckOverrides[i] : p.amt);
  return { ...p, amt, bills: pb, bt, gr };
  });
  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>Payday Page</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>Your next six paychecks, laid out before they arrive. Where income meets obligations.</p>
      <Card>
        <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.green, marginBottom: 10, fontSize: 14 }}>⚙️ Setup</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          <FI label="How often am I paid?" value={paySettings.frequency} onChange={e => setPaySettings(p => ({ ...p, frequency: e.target.value }))} options={FREQS} />
          <FI label="PAYDAY" value={paySettings.nextDate} onChange={e => setPaySettings(p => ({ ...p, nextDate: e.target.value }))} type="date" />
          <FI label="Paycheck amount ($)" value={paySettings.amount} onChange={e => setPaySettings(p => ({ ...p, amount: e.target.value }))} type="number" placeholder="0.00" />
          <FI label="Current bank balance ($)" value={bankBalance} onChange={e => setBankBalance(e.target.value)} type="number" placeholder="0.00" />
        </div>
      </Card>
      {periods.length === 0 && <Card style={{ textAlign: 'center', padding: 36, color: C.charcoalLight, fontSize: 13 }}>Enter your pay setup above to see your next six paychecks.</Card>}
      {pData.map((p, i) => (
        <Card key={i}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.charcoal }}>Pay Period {i + 1}</div>
            <div style={{ fontSize: 11, color: C.charcoalLight }}>{fmtD(p.start)} — {fmtD(p.end)}</div>
          </div>{p.bills.length === 0 ? <div style={{ color: C.charcoalLight, fontSize: 12, padding: '10px 0' }}>No bills due this period 🎉</div> : (() => {
            const periodKey = p.start.toISOString().slice(0,10);
            const sortByDate = (a, b) => getActualDueDate(a.dateDue, p.start, p.end) - getActualDueDate(b.dateDue, p.start, p.end);
            const halfBills = p.bills.filter(b => b.halfPayment).sort(sortByDate);
            const regularBills = p.bills.filter(b => !b.halfPayment).sort(sortByDate);
            const renderRow = (b, isHalf) => {
              const pk = `${b.id}_${periodKey}`;
              const isPaid = !!paidBills[pk];
              const isSkipped = !!skippedBills[pk];
              const toggleSkip = () => setSkippedBills(prev => { const next = {...prev}; if (isSkipped) delete next[pk]; else next[pk] = true; return next; });
              const togglePaid = () => setPaidBills(prev => { const next = {...prev}; if (isPaid) delete next[pk]; else next[pk] = true; return next; });
              const lineThrough = isPaid || isSkipped;
              const rowBg = isSkipped ? '#f0f0f0' : (isHalf ? C.slateDark : (isPaid ? '#f0faf4' : 'transparent'));
              const rowOpacity = isSkipped ? 0.45 : (isPaid ? 0.55 : 1);
              const textOnHalf = isHalf && !isSkipped;
              return (
                <tr key={b.id} style={{ borderBottom: `1px solid ${C.cream}`, opacity: rowOpacity, background: rowBg }}>
                  <td style={{ padding: '6px 7px', color: textOnHalf ? 'white' : C.charcoalLight, textDecoration: lineThrough ? 'line-through' : 'none' }}>{fmtD(getActualDueDate(b.dateDue, p.start, p.end))}</td>
                  <td style={{ padding: '6px 7px', fontWeight: isHalf ? 700 : 600, color: textOnHalf ? 'white' : 'inherit', textDecoration: lineThrough ? 'line-through' : 'none' }}>{b.company}</td>
                  <td style={{ padding: '6px 7px', textAlign: 'right', fontWeight: 700, color: textOnHalf ? 'white' : (isPaid ? C.green : '#c0392b'), textDecoration: lineThrough ? 'line-through' : 'none' }}>{b.halfPayment ? `½ ${fmt(+b.amount/2)}` : fmt(b.amount)}</td>
                  <td style={{ padding: '6px 7px', textAlign: 'center' }}><input type="checkbox" checked={isSkipped} onChange={toggleSkip} title={isSkipped ? 'Restore this bill to the period' : 'Skip this bill for this paycheck only'} style={{ accentColor: C.slateDark, width: 16, height: 16, cursor: 'pointer' }} /></td>
                  <td style={{ padding: '6px 7px', textAlign: 'center' }}><input type="checkbox" checked={isPaid} disabled={isSkipped} onChange={togglePaid} style={{ accentColor: textOnHalf ? 'white' : C.green, width: 16, height: 16, cursor: isSkipped ? 'not-allowed' : 'pointer' }} /></td>
                </tr>
              );
            };
            return (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 10 }}>
                <thead><tr style={{ borderBottom: `2px solid ${C.creamDark}` }}>{['Due', 'Bill', 'Amount', 'Skip', 'Cleared'].map((h, j) => <th key={h} style={{ textAlign: j === 2 ? 'right' : (j >= 3 ? 'center' : 'left'), padding: '5px 7px', color: C.charcoalLight, fontWeight: 700 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {halfBills.length > 0 && <tr><td colSpan={5} style={{ padding: '8px 7px 2px', fontSize: 10, fontWeight: 800, color: C.slateDark, letterSpacing: 0.5 }}>½ PAID FIRST</td></tr>}
                  {halfBills.map(b => renderRow(b, true))}
                  {halfBills.length > 0 && regularBills.length > 0 && <tr><td colSpan={5} style={{ borderBottom: `3px solid ${C.slateDark}`, padding: 0 }}></td></tr>}
                  {regularBills.map(b => renderRow(b, false))}
                </tbody>
              </table>
            );
          })()}
          {(() => { const balance = (+p.amt || 0) - (+p.bt || 0) - (+p.gr || 0); return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, paddingTop: 10, borderTop: `1px solid ${C.creamDark}` }}>
            <div style={{ background: C.cream, borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{i === 0 ? 'Paycheck Received' : 'Estimated Paycheck'}</div>
              {i === 0
                ? <div style={{ fontWeight: 700, color: C.green, fontSize: 14 }}>{fmt(+paySettings.amount)}</div>
                : <input type="number" value={paycheckOverrides[i] !== undefined ? paycheckOverrides[i] : paySettings.amount} onChange={e => setPaycheckOverrides(prev => Object.assign({}, prev, {[i]: +e.target.value}))} onKeyDown={focusNextOnEnter} style={{ width: '100%', padding: '4px 6px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: C.green, boxSizing: 'border-box', textAlign: 'center', background: 'white' }} />
              }
            </div>
            <div style={{ background: C.cream, borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Total Bills Due</div>
              <div style={{ fontWeight: 700, color: '#c0392b', fontSize: 14 }}>{fmt(p.bt)}</div>
            </div>
            <div style={{ background: C.cream, borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Groceries & Extras</div>
              <input type="number" step="0.01" value={p.gr || ''} onChange={e => setGroceryBudgets(g => ({ ...g, [i]: e.target.value }))} onKeyDown={focusNextOnEnter} placeholder="$0.00" style={{ width: '100%', padding: '4px 6px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: C.charcoal, boxSizing: 'border-box', textAlign: 'center', background: 'white' }} />
            </div>
            <div style={{ background: balance >= 0 ? '#d4edda' : '#f8d7da', borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: balance >= 0 ? '#155724' : '#842029', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Balance</div>
              <div style={{ fontWeight: 700, color: balance >= 0 ? C.green : '#c0392b', fontSize: 14 }}>{fmt(balance)}</div>
            </div>
          </div>
          ); })()}
          {i === 0 && +bankBalance > 0 && p.bills.length > 0 && (() => {
            const periodKey = p.start.toISOString().slice(0,10);
            const clearedAmt = p.bills.reduce((s, b) => {
              const pk = `${b.id}_${periodKey}`;
              if (skippedBills[pk]) return s;
              return paidBills[pk] ? s + (b.halfPayment ? (+b.amount||0)/2 : (+b.amount||0)) : s;
            }, 0);
            const unclearedAmt = p.bt - clearedAmt;
            const remaining = +(bankBalance||0) - unclearedAmt;
            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 8 }}>
                <div style={{ background: '#EEF3F8', borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Current Bank Balance</div>
                  <div style={{ fontWeight: 700, color: C.slate, fontSize: 14 }}>{fmt(bankBalance)}</div>
                </div>
                <div style={{ background: '#EEF3F8', borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Cleared</div>
                  <div style={{ fontWeight: 700, color: C.green, fontSize: 14 }}>{fmt(clearedAmt)}</div>
                </div>
                <div style={{ background: '#EEF3F8', borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Still to Clear</div>
                  <div style={{ fontWeight: 700, color: unclearedAmt > 0 ? '#c0392b' : C.green, fontSize: 14 }}>{fmt(unclearedAmt)}</div>
                </div>
                <div style={{ background: remaining >= 0 ? '#d4edda' : '#f8d7da', borderRadius: 7, padding: '8px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: remaining >= 0 ? '#155724' : '#842029', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Remaining Amount</div>
                  <div style={{ fontWeight: 700, color: remaining >= 0 ? C.green : '#c0392b', fontSize: 14 }}>{fmt(remaining)}</div>
                </div>
              </div>
            );
          })()}
        </Card>
      ))}
    </div>
  );
}

// =====================================================================
// DEBT PAGE
// =====================================================================
function DebtPage({ bills, setBills, askCoach }) {
  const db = bills.filter(b => ['Credit', 'Debt/Loan'].includes(b.category) && b.status !== 'Zero Balance');
  const tBal = db.reduce((s, b) => s + (+b.balance || 0), 0);
  const tLim = db.reduce((s, b) => s + (+b.creditLimit || 0), 0);
  const tMin = db.reduce((s, b) => s + (+b.minPayment || 0), 0);
  const util = tLim > 0 ? tBal / tLim : 0;
  const updateBill = (id, field, value) => setBills(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
  const cellInputStyle = { width: '100%', padding: '5px 7px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: C.charcoal, boxSizing: 'border-box', background: 'white', outline: 'none' };
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
                <thead><tr style={{ background: C.green }}>{['Lender', 'Balance', 'Limit', 'Utilization', 'APR', 'Min Payment', 'Notes', ''].map(h => <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: 'white', fontWeight: 700 }}>{h}</th>)}</tr></thead>
                <tbody>
                  {db.sort((a, b) => (a.company || '').localeCompare(b.company || '')).map((b, i) => {
                    const u = b.creditLimit ? (+b.balance || 0) / (+b.creditLimit) : null;
                    const uc = u === null ? C.charcoalLight : u < .1 ? C.green : u < .3 ? C.gold : u < .5 ? '#e67e22' : '#c0392b';
                    return (
                      <tr key={b.id} style={{ background: i % 2 ? 'white' : C.cream }}>
                        <td style={{ padding: '8px 12px', fontWeight: 700 }}>{b.company}</td>
                        <td style={{ padding: '6px 8px' }}><input type="number" step="0.01" value={b.balance || ''} onChange={e => updateBill(b.id, 'balance', e.target.value)} onKeyDown={focusNextOnEnter} placeholder="0.00" style={{ ...cellInputStyle, color: C.espresso, textAlign: 'right' }} /></td>
                        <td style={{ padding: '6px 8px' }}><input type="number" step="0.01" value={b.creditLimit || ''} onChange={e => updateBill(b.id, 'creditLimit', e.target.value)} onKeyDown={focusNextOnEnter} placeholder="0.00" style={{ ...cellInputStyle, textAlign: 'right' }} /></td>
                        <td style={{ padding: '8px 12px' }}>{u !== null ? <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 60, height: 6, background: C.creamDark, borderRadius: 3, overflow: 'hidden' }}><div style={{ width: `${Math.min(u * 100, 100)}%`, height: '100%', background: uc }} /></div><span style={{ color: uc, fontWeight: 700 }}>{(u * 100).toFixed(0)}%</span></div> : '—'}</td>
                        <td style={{ padding: '6px 8px' }}><input type="number" step="0.01" value={b.apr || ''} onChange={e => updateBill(b.id, 'apr', e.target.value)} onKeyDown={focusNextOnEnter} placeholder="0.00" style={{ ...cellInputStyle, textAlign: 'right' }} /></td>
                        <td style={{ padding: '6px 8px' }}><input type="number" step="0.01" value={b.minPayment || ''} onChange={e => updateBill(b.id, 'minPayment', e.target.value)} onKeyDown={focusNextOnEnter} placeholder="0.00" style={{ ...cellInputStyle, color: C.green, textAlign: 'right' }} /></td>
                        <td style={{ padding: '8px 12px', color: C.charcoalLight, fontSize: 11 }}>{b.notes || '—'}</td>
                        <td style={{ padding: '8px 6px' }}>{b.company && <button onClick={() => askCoach(b.company)} title={`Open coach about ${b.company}`} style={{ background: 'none', border: 'none', color: C.green, cursor: 'pointer', fontSize: 11, padding: '2px 6px', textDecoration: 'underline', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>ask coach</button>}</td>
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
function DebtPlanPage({ bills, amount, setAmount, mode, askCoach }) {
  const isSnow = mode === 'snowball';
  const sorted = bills.filter(b => ['Credit', 'Debt/Loan'].includes(b.category) && b.status !== 'Zero Balance' && b.balance)
    .sort((a, b) => isSnow ? (+a.balance || 0) - (+b.balance || 0) : (+b.apr || 0) - (+a.apr || 0));
  const tMin = sorted.reduce((s, b) => s + Math.min(+b.balance || 0, +b.minPayment || 0), 0);

  let pool = +amount || 0;
  const rows = sorted.map(bill => {
    const balance = +bill.balance || 0;
    const min = Math.min(balance, +bill.minPayment || 0);
    let pay = min;
    let after = balance - min;
    if (pool > 0 && after > 0) {
      const applied = Math.min(pool, after);
      pay += applied;
      pool -= applied;
      after -= applied;
    }
    return { ...bill, pay, after, cleared: pay > 0 && after <= 0 };
  });

  const clearedRows = rows.filter(r => r.cleared);
  const nextTarget = rows.find(r => !r.cleared);
  const col = isSnow ? C.green : C.slate;

  let summary = '';
  if ((+amount || 0) > 0 && rows.length > 0) {
    if (clearedRows.length > 0) {
      const names = clearedRows.map(r => r.company).join(', ');
      summary = `Sending ${fmt(+amount)} extra this paycheck clears ${names}.`;
      if (nextTarget) summary += ` Your ${isSnow ? 'snowball' : 'avalanche'} moves to ${nextTarget.company} next.`;
      else summary += ' That clears your last debt.';
    } else if (nextTarget) {
      summary = `Sending ${fmt(+amount)} extra this paycheck brings ${nextTarget.company} down to ${fmt(nextTarget.after)}.`;
    }
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 3px', color: col, fontFamily: 'Georgia,serif', fontSize: 20 }}>Debt {isSnow ? 'Snowball' : 'Avalanche'}</h2>
      <p style={{ margin: '0 0 14px', color: C.charcoalLight, fontSize: 12 }}>{isSnow ? 'Smallest balance first. Fast wins. Big motivation.' : 'Highest interest rate first. Mathematically the cheapest path.'}</p>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ textAlign: 'center', background: C.cream, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>Min Payments This Month</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.charcoal }}>{fmt(tMin)}</div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>💵 Extra This Paycheck</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} onKeyDown={focusNextOnEnter} placeholder="$0.00" style={{ width: '100%', padding: '9px 12px', border: `2px solid ${isSnow ? C.gold : C.slate}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, color: C.charcoal, boxSizing: 'border-box', background: isSnow ? '#fffbf0' : '#f0f4f8', outline: 'none' }} />
          </div>
        </div>
      </Card>
      {sorted.length === 0 ? <Card style={{ textAlign: 'center', padding: 36, color: C.charcoalLight, fontSize: 13 }}>No debt entries yet. Add them on the Everything Page.</Card> : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr style={{ background: col }}>{['#', isSnow ? 'Debt ↑ Smallest' : 'Debt ↓ Highest Rate', 'Balance', 'Rate', 'Min', 'This Paycheck', 'After', ''].map(h => <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: 'white', fontWeight: 700 }}>{h}</th>)}</tr></thead>
              <tbody>
                {rows.map((r, i) => {
                  const isTarget = !r.cleared && r === nextTarget;
                  const rowBg = r.cleared ? '#d4edda' : (isTarget ? (isSnow ? '#fffbf0' : '#f0f4f8') : (i % 2 ? 'white' : C.cream));
                  const strike = r.cleared ? 'line-through' : 'none';
                  return (
                    <tr key={r.id} style={{ background: rowBg, opacity: r.cleared ? 0.75 : 1 }}>
                      <td style={{ padding: '8px 12px', fontWeight: 700, color: r.cleared ? C.green : (isTarget ? col : C.charcoalLight) }}>{r.cleared ? '✓' : i + 1}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 600, textDecoration: strike }}>{r.company}</td>
                      <td style={{ padding: '8px 12px', textDecoration: strike }}>{fmt(r.balance)}</td>
                      <td style={{ padding: '8px 12px', fontWeight: isSnow ? 400 : 700, color: isSnow ? C.charcoalLight : '#c0392b' }}>{r.apr ? `${(+r.apr).toFixed(1)}%` : '—'}</td>
                      <td style={{ padding: '8px 12px' }}>{fmt(r.minPayment)}</td>
                      <td style={{ padding: '8px 12px', fontWeight: 700, color: col, fontSize: 14 }}>{fmt(r.pay)}</td>
                      <td style={{ padding: '8px 12px', fontWeight: r.cleared ? 700 : 400, color: r.cleared ? C.green : C.charcoalLight }}>{r.cleared ? '✓ Cleared' : fmt(r.after)}</td>
                      <td style={{ padding: '8px 6px' }}>{r.company && <button onClick={() => askCoach(r.company)} title={`Open coach about ${r.company}`} style={{ background: 'none', border: 'none', color: col, cursor: 'pointer', fontSize: 11, padding: '2px 6px', textDecoration: 'underline', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>ask coach</button>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {summary && <div style={{ padding: '12px 16px', background: C.cream, color: C.charcoal, fontSize: 13, lineHeight: 1.5, borderTop: `1px solid ${C.creamDark}` }}>{summary}</div>}
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
// THE REAL PAGE
// Paycheck-cycle spending tracker. Replaces the legacy 7-Day Tracker.
// =====================================================================
const PAY_METHODS = ['Card', 'Cash', 'Debit', 'Venmo/PayPal', 'Other'];
const REAL_ENTRY_EMPTY = { description: '', method: 'Card', amount: '', notes: '', category: 'cat-other' };

// Starter categories — auto-loaded for every user. "Other" is locked (can't hide/rename).
const STARTER_CATEGORIES = [
  { id: 'cat-groceries',  name: 'Groceries',  allotment: 0, hidden: false, isStarter: true },
  { id: 'cat-gas',        name: 'Gas',        allotment: 0, hidden: false, isStarter: true },
  { id: 'cat-dining',     name: 'Dining Out', allotment: 0, hidden: false, isStarter: true },
  { id: 'cat-household',  name: 'Household',  allotment: 0, hidden: false, isStarter: true },
  { id: 'cat-fun',        name: 'Fun',        allotment: 0, hidden: false, isStarter: true },
  { id: 'cat-other',      name: 'Other',      allotment: 0, hidden: false, isStarter: true, locked: true },
];

function TheRealPage({ entries, setEntries, receipts, setReceipts, categories, setCategories, cycleStart, setCycleStart, nextPayday, setNextPayday }) {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...REAL_ENTRY_EMPTY });
  const [paydayInput, setPaydayInput] = useState('');
  const [editingPayday, setEditingPayday] = useState(false);

  // Receipt scan state
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'reading' | 'confirming' | 'error'
  const [parsedReceipt, setParsedReceipt] = useState(null);
  const [parseError, setParseError] = useState('');
  const [expandedReceiptId, setExpandedReceiptId] = useState(null);
  const [editingReceiptId, setEditingReceiptId] = useState(null); // when set, confirm view is editing this saved receipt
  const fileRef = useRef(null);

  // View toggle: 'day' | 'category'
  const [viewMode, setViewMode] = useState('day');

  // Inline edit state for category management
  const [editingCatId, setEditingCatId] = useState(null);
  const [catEditValue, setCatEditValue] = useState('');
  const [catEditName, setCatEditName] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Inline edit state for manual entries
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [entryEditForm, setEntryEditForm] = useState({ ...REAL_ENTRY_EMPTY });
  const setEF = (k, v) => setEntryEditForm(f => ({ ...f, [k]: v }));

  // Defensive: ensure categories prop is an array; default to starters if not
  const cats = Array.isArray(categories) && categories.length ? categories : STARTER_CATEGORIES;
  const visibleCats = cats.filter(c => !c.hidden);
  const catById = id => cats.find(c => c.id === id) || cats.find(c => c.id === 'cat-other') || { id: 'cat-other', name: 'Other' };
  const catName = id => catById(id).name;

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = todayISO();

  // SETUP — no cycle yet
  if (!cycleStart || !nextPayday) {
    const startCycle = () => {
      if (!paydayInput) return;
      setCycleStart(todayStr);
      setNextPayday(paydayInput);
      setPaydayInput('');
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>The Real Page</h2>
          <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12, fontStyle: 'italic' }}>See what's really happening.</p>
        </div>
        <Card style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🌱</div>
          <h3 style={{ color: C.green, fontFamily: 'Georgia,serif', margin: '0 0 10px', fontSize: 18 }}>Set up your paycheck cycle</h3>
          <p style={{ color: C.charcoalLight, maxWidth: 420, margin: '0 auto 20px', lineHeight: 1.6, fontSize: 13 }}>
            The Real Page runs paycheck to paycheck. Tell me when your next paycheck lands and I will track what happens between now and then.
          </p>
          <div style={{ maxWidth: 280, margin: '0 auto 18px', textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 5 }}>Next paycheck date</div>
            <input
              type="date"
              value={paydayInput}
              min={todayStr}
              onChange={e => setPaydayInput(e.target.value)}
              onKeyDown={focusNextOnEnter}
              style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 14, background: 'white', boxSizing: 'border-box', color: '#2C2C2C' }}
            />
          </div>
          <Btn onClick={startCycle} disabled={!paydayInput} style={{ fontSize: 15, padding: '12px 28px' }}>
            Start tracking this cycle
          </Btn>
          <p style={{ color: C.charcoalLight, fontSize: 11, marginTop: 14, fontStyle: 'italic' }}>
            Today becomes day 1. The cycle resets when payday arrives.
          </p>
        </Card>
      </div>
    );
  }

  // Cycle math
  const cycleStartD = new Date(cycleStart + 'T00:00:00');
  const nextPaydayD = new Date(nextPayday + 'T00:00:00');
  const dayOfCycle = Math.max(1, Math.floor((today - cycleStartD) / 86400000) + 1);
  const daysToPayday = Math.max(0, Math.ceil((nextPaydayD - today) / 86400000));

  const inCycle = dateStr => {
    if (!dateStr) return false;
    const d = new Date(dateStr + 'T00:00:00');
    return d >= cycleStartD && d <= nextPaydayD;
  };

  const cycleEntries = entries.filter(e => inCycle(e.date));
  const cycleReceipts = (receipts || []).filter(r => inCycle(r.date));
  const entriesTotal = cycleEntries.reduce((s, e) => s + (+e.amount || 0), 0);
  const receiptsTotal = cycleReceipts.reduce((s, r) => s + (+r.total || 0), 0);
  const cycleTotal = entriesTotal + receiptsTotal;

  // PAST PAYDAY — prompt new cycle
  if (today > nextPaydayD) {
    const startNew = () => {
      if (!paydayInput) return;
      setCycleStart(todayStr);
      setNextPayday(paydayInput);
      setPaydayInput('');
    };
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>The Real Page</h2>
          <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12, fontStyle: 'italic' }}>See what's really happening.</p>
        </div>
        <Card style={{ background: C.creamDark, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.espresso, marginBottom: 8, fontSize: 16 }}>That cycle has ended.</div>
          <p style={{ fontSize: 13, color: C.charcoalLight, margin: '0 0 6px' }}>
            Your last cycle ran from {fmtD(cycleStartD)} through {fmtD(nextPaydayD)}. You spent <strong style={{ color: C.espresso }}>{fmt(cycleTotal)}</strong>.
          </p>
          <p style={{ fontSize: 12, color: C.charcoalLight, margin: 0, fontStyle: 'italic' }}>
            The looking is never as bad as the not knowing.
          </p>
        </Card>
        <Card style={{ textAlign: 'center', padding: 30 }}>
          <h3 style={{ color: C.green, fontFamily: 'Georgia,serif', margin: '0 0 8px', fontSize: 17 }}>Start your next cycle</h3>
          <p style={{ color: C.charcoalLight, maxWidth: 420, margin: '0 auto 18px', lineHeight: 1.6, fontSize: 13 }}>
            When does your next paycheck land?
          </p>
          <div style={{ maxWidth: 280, margin: '0 auto 16px', textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: C.charcoalLight, fontWeight: 700, textTransform: 'uppercase', marginBottom: 5 }}>Next paycheck date</div>
            <input
              type="date"
              value={paydayInput}
              min={todayStr}
              onChange={e => setPaydayInput(e.target.value)}
              onKeyDown={focusNextOnEnter}
              style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 14, background: 'white', boxSizing: 'border-box', color: '#2C2C2C' }}
            />
          </div>
          <Btn onClick={startNew} disabled={!paydayInput} style={{ fontSize: 15, padding: '12px 28px' }}>
            Start a new cycle
          </Btn>
        </Card>
      </div>
    );
  }

  // RECEIPT SCAN HANDLERS
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setScanState('reading');
    setParseError('');
    const reader = new FileReader();
    reader.onerror = () => {
      setParseError('Could not read that image. Try a different one?');
      setScanState('error');
    };
    reader.onload = ev => {
      const img = new Image();
      img.onerror = () => {
        setParseError('That image format is not supported (HEIC iPhone photos can fail). Save it as a JPEG or PNG and try again.');
        setScanState('error');
      };
      img.onload = async () => {
        try {
          const MAX = 1280;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const base64 = dataUrl.split(',')[1];
          if (!base64) throw new Error('Empty base64 after encode');
          const res = await fetch('/api/parse-receipt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              imageData: base64,
              imageType: 'image/jpeg',
              categories: visibleCats.map(c => ({ id: c.id, name: c.name }))
            })
          });
          const data = await res.json();
          if (!res.ok || !data.receipt) {
            setParseError(data.error || 'Receipt parsing failed. Try again.');
            setScanState('error');
            return;
          }
          const r = data.receipt;
          const normalized = {
            id: uid(),
            merchant: r.merchant || 'Unknown',
            date: r.date && /^\d{4}-\d{2}-\d{2}$/.test(r.date) ? r.date : todayStr,
            dateConfidence: r.dateConfidence || 'confident',
            total: +r.total || 0,
            totalConfidence: r.totalConfidence || 'confident',
            method: 'Card',
            items: (r.items || []).map(it => {
              const catId = it.category && cats.find(c => c.id === it.category) ? it.category : 'cat-other';
              return {
                id: uid(),
                name: (it.name || it.rawText || 'Item').toString(),
                rawText: (it.rawText || '').toString(),
                price: +it.price || 0,
                confidence: it.confidence || 'confident',
                category: catId,
                categoryConfidence: it.categoryConfidence || 'confident'
              };
            }),
            notes: r.notes || ''
          };
          setParsedReceipt(normalized);
          setScanState('confirming');
        } catch (err) {
          console.error('Receipt scan failed', err);
          setParseError('Could not process that image. Try a different one.');
          setScanState('error');
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const updateParsedField = (k, v) => setParsedReceipt(p => ({ ...p, [k]: v }));
  const updateItem = (id, k, v) => setParsedReceipt(p => ({
    ...p,
    items: p.items.map(it => it.id === id ? { ...it, [k]: v } : it)
  }));
  const removeItem = id => setParsedReceipt(p => ({ ...p, items: p.items.filter(it => it.id !== id) }));
  const addBlankItem = () => setParsedReceipt(p => ({
    ...p,
    items: [...p.items, { id: uid(), name: '', rawText: '', price: 0, confidence: 'confident', category: 'cat-other', categoryConfidence: 'confident' }]
  }));
  const commitReceipt = () => {
    if (!parsedReceipt) return;
    if (editingReceiptId) {
      setReceipts(rs => (rs || []).map(r => r.id === editingReceiptId ? { ...parsedReceipt, id: editingReceiptId, addedAt: r.addedAt, updatedAt: new Date().toISOString() } : r));
    } else {
      setReceipts(rs => [...(rs || []), { ...parsedReceipt, addedAt: new Date().toISOString() }]);
    }
    setParsedReceipt(null);
    setEditingReceiptId(null);
    setScanState('idle');
  };
  const cancelScan = () => {
    setParsedReceipt(null);
    setParseError('');
    setEditingReceiptId(null);
    setScanState('idle');
  };
  const startEditReceipt = (r) => {
    // Load existing receipt into the confirm view. Ensure items have ids + category fields.
    const loaded = {
      ...r,
      items: r.items.map(it => ({
        id: it.id || uid(),
        name: it.name || '',
        rawText: it.rawText || '',
        price: +it.price || 0,
        confidence: it.confidence || 'confident',
        category: it.category && cats.find(c => c.id === it.category) ? it.category : 'cat-other',
        categoryConfidence: it.categoryConfidence || 'confident',
      })),
    };
    setParsedReceipt(loaded);
    setEditingReceiptId(r.id);
    setScanState('confirming');
  };

  const SectionHeader = () => (
    <div style={{ marginBottom: 14 }}>
      <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>The Real Page</h2>
      <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12, fontStyle: 'italic' }}>See what's really happening.</p>
    </div>
  );

  // SCAN — READING
  if (scanState === 'reading') {
    return (
      <div>
        <SectionHeader />
        <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🧾</div>
          <div style={{ fontFamily: 'Georgia,serif', color: C.green, fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Reading your receipt…</div>
          <div style={{ color: C.charcoalLight, fontSize: 13, fontStyle: 'italic', maxWidth: 340, margin: '0 auto' }}>This usually takes a few seconds. Hang on while I look at every line.</div>
        </Card>
      </div>
    );
  }

  // SCAN — ERROR
  if (scanState === 'error') {
    return (
      <div>
        <SectionHeader />
        <Card style={{ textAlign: 'center', padding: 32, background: '#fff3cd', border: `1.5px solid ${C.gold}` }}>
          <div style={{ fontFamily: 'Georgia,serif', color: C.espresso, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Something went wrong</div>
          <div style={{ color: C.charcoalLight, fontSize: 13, maxWidth: 380, margin: '0 auto 18px', lineHeight: 1.5 }}>{parseError || 'Could not read that receipt. Try a clearer photo.'}</div>
          <div style={{ display: 'inline-flex', gap: 8 }}>
            <Btn small onClick={() => { setScanState('idle'); fileRef.current?.click(); }}>Try another photo</Btn>
            <Btn small variant="ghostDark" onClick={cancelScan}>Cancel</Btn>
          </div>
        </Card>
      </div>
    );
  }

  // SCAN — CONFIRMING
  if (scanState === 'confirming' && parsedReceipt) {
    const itemsSum = parsedReceipt.items.reduce((s, it) => s + (+it.price || 0), 0);
    const diff = +(parsedReceipt.total - itemsSum).toFixed(2);
    const reconciles = Math.abs(diff) < 0.01;
    return (
      <div>
        <SectionHeader />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: C.sage, fontStyle: 'italic', fontSize: 13 }}>
          <button onClick={cancelScan} style={{ width: 28, height: 28, border: `1px solid ${C.creamDark}`, borderRadius: '50%', background: 'white', color: C.green, fontSize: 16, lineHeight: 1, cursor: 'pointer' }}>‹</button>
          <span>{editingReceiptId ? 'Edit receipt' : 'Confirm receipt'}</span>
        </div>

        {/* Receipt header card */}
        <Card style={{ textAlign: 'center', padding: '20px 18px', marginBottom: 10 }}>
          <input
            value={parsedReceipt.merchant}
            onChange={e => updateParsedField('merchant', e.target.value)}
            style={{ width: '100%', textAlign: 'center', fontFamily: 'Georgia,serif', fontSize: 19, fontWeight: 700, color: C.charcoal, letterSpacing: '0.04em', textTransform: 'uppercase', border: 'none', background: 'transparent', outline: 'none', padding: 0 }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 12, color: C.sage, fontStyle: 'italic' }}>
            <input
              type="date"
              value={parsedReceipt.date}
              onChange={e => updateParsedField('date', e.target.value)}
              style={{ border: `1px solid ${C.creamDark}`, borderRadius: 5, padding: '3px 7px', fontFamily: 'inherit', fontSize: 12, color: C.charcoalLight, background: 'white' }}
            />
            <span>·</span>
            <span>{parsedReceipt.items.length} item{parsedReceipt.items.length === 1 ? '' : 's'}</span>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'Georgia,serif', color: C.green, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>$</span>
            <input
              type="number"
              step="0.01"
              value={parsedReceipt.total}
              onChange={e => updateParsedField('total', +e.target.value || 0)}
              style={{ width: 130, textAlign: 'center', fontFamily: 'Georgia,serif', fontSize: 38, fontWeight: 700, color: C.green, lineHeight: 1, border: 'none', background: 'transparent', outline: 'none', padding: 0 }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: C.sage, fontStyle: 'italic' }}>Items auto-sorted · tap a name or price to fix it.</div>
        </Card>

        {/* Items list */}
        <Card style={{ padding: '6px 0', marginBottom: 10 }}>
          {parsedReceipt.items.length === 0 ? (
            <div style={{ padding: '14px', textAlign: 'center', color: C.charcoalLight, fontStyle: 'italic', fontSize: 12 }}>No items parsed. Tap "Add a line" below.</div>
          ) : parsedReceipt.items.map((it, i) => {
            const catUnsure = it.categoryConfidence === 'unsure';
            return (
              <div key={it.id} style={{ padding: '10px 14px', borderTop: i === 0 ? 'none' : `1px solid ${C.cream}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 28px', gap: 8, alignItems: 'center' }}>
                  <input
                    value={it.name}
                    onChange={e => updateItem(it.id, 'name', e.target.value)}
                    placeholder="Item name"
                    style={{ width: '100%', border: `1px solid ${C.cream}`, borderRadius: 5, padding: '5px 8px', fontFamily: 'inherit', fontSize: 13, color: C.charcoal, background: 'white' }}
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={it.price}
                    onChange={e => updateItem(it.id, 'price', +e.target.value || 0)}
                    style={{ width: '100%', textAlign: 'right', border: `1px solid ${C.cream}`, borderRadius: 5, padding: '5px 8px', fontFamily: 'inherit', fontSize: 13, color: C.espresso, fontWeight: 600, background: 'white' }}
                  />
                  <button onClick={() => removeItem(it.id)} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, cursor: 'pointer', fontSize: 14 }}>✕</button>
                </div>
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <select
                    value={it.category || 'cat-other'}
                    onChange={e => updateItem(it.id, 'category', e.target.value)}
                    style={{
                      border: `1px solid ${catUnsure ? '#f0e0a8' : C.creamDark}`,
                      borderRadius: 999,
                      padding: '3px 24px 3px 10px',
                      fontFamily: 'inherit',
                      fontSize: 11,
                      fontWeight: 600,
                      background: catUnsure ? '#fef9e7' : C.cream,
                      color: catUnsure ? '#7a5e1d' : C.green,
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='${encodeURIComponent(catUnsure ? '#7a5e1d' : '#7A8B75')}' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 8px center',
                    }}
                  >
                    {visibleCats.map(c => <option key={c.id} value={c.id}>{catUnsure ? `? ${c.name}` : c.name}</option>)}
                  </select>
                  {catUnsure && (
                    <span style={{ fontSize: 10.5, color: '#7a5e1d', fontStyle: 'italic' }}>not sure — tap to fix</span>
                  )}
                </div>
                {it.confidence === 'unsure' && (
                  <div style={{ marginTop: 4, fontSize: 10.5, color: '#7a5e1d', fontStyle: 'italic' }}>? Not sure I read this name right — please check.</div>
                )}
                {it.confidence === 'unread' && (
                  <div style={{ marginTop: 4, fontSize: 10.5, color: C.charcoalLight, fontStyle: 'italic' }}>
                    Couldn't read this line clearly. Receipt said: <span style={{ fontFamily: 'monospace' }}>{it.rawText || '—'}</span>
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ padding: '8px 14px 4px', textAlign: 'center' }}>
            <button onClick={addBlankItem} style={{ border: 'none', background: 'transparent', color: C.green, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Add a line</button>
          </div>
        </Card>

        {/* Reconciliation */}
        <div style={{ textAlign: 'center', fontSize: 12, color: reconciles ? C.sage : '#7a5e1d', fontStyle: 'italic', marginBottom: 12 }}>
          {reconciles ? (
            <>Items add up to {fmt(itemsSum)} ✓</>
          ) : (
            <>Items: {fmt(itemsSum)} · Receipt: {fmt(parsedReceipt.total)} · {diff > 0 ? `${fmt(Math.abs(diff))} unaccounted (likely tax/tip)` : `${fmt(Math.abs(diff))} over receipt — check for duplicates`}</>
          )}
        </div>

        {/* Commit / cancel */}
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <Btn onClick={commitReceipt} style={{ fontSize: 15, padding: '12px 32px' }}>{editingReceiptId ? 'Save changes' : 'Add to The Real Page'}</Btn>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={cancelScan} style={{ border: 'none', background: 'transparent', color: C.sage, fontSize: 11, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>{editingReceiptId ? 'Cancel edit' : 'Discard this scan'}</button>
        </div>
      </div>
    );
  }

  // ACTIVE CYCLE
  const save = () => {
    if (!form.amount || !form.description) return;
    setEntries(es => [...es, { ...form, id: uid(), date: todayStr, amount: +form.amount }]);
    setForm({ ...REAL_ENTRY_EMPTY });
    setAdding(false);
  };
  const del = id => setEntries(es => es.filter(x => x.id !== id));
  const delReceipt = id => setReceipts(rs => (rs || []).filter(r => r.id !== id));

  const savePaydayUpdate = () => {
    if (!paydayInput) { setEditingPayday(false); return; }
    setNextPayday(paydayInput);
    setPaydayInput('');
    setEditingPayday(false);
  };

  // Group entries by date, newest first
  const byDate = {};
  cycleEntries.forEach(e => { (byDate[e.date] = byDate[e.date] || []).push(e); });
  const sortedDates = Object.keys(byDate).sort().reverse();

  const dayWord = n => n === 1 ? 'day' : 'days';
  const paydayWeekday = nextPaydayD.toLocaleDateString('en-US', { weekday: 'long' });
  const paydayShort = fmtD(nextPaydayD);

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ margin: '0 0 3px', color: C.green, fontFamily: 'Georgia,serif', fontSize: 20 }}>The Real Page</h2>
        <p style={{ margin: 0, color: C.charcoalLight, fontSize: 12, fontStyle: 'italic' }}>See what's really happening.</p>
      </div>

      <Card style={{ textAlign: 'center', padding: '26px 20px 22px', marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: C.sage, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
          Day {dayOfCycle}<span style={{ color: C.sageLight, margin: '0 8px' }}>·</span>Paycheck cycle
        </div>
        <div style={{ fontFamily: 'Georgia,serif', color: C.green, fontSize: 56, fontWeight: 700, lineHeight: 1, margin: '6px 0 4px' }}>
          {fmt(cycleTotal)}
        </div>
        <div style={{ fontFamily: 'Georgia,serif', color: C.charcoal, fontSize: 16 }}>
          spent this cycle
        </div>
        <div style={{ height: 1, background: C.creamDark, margin: '14px auto 10px', width: '55%' }} />
        <div style={{ fontSize: 12.5, color: C.sage, fontStyle: 'italic' }}>
          {daysToPayday === 0
            ? `Payday lands today (${paydayWeekday})`
            : `${daysToPayday} ${dayWord(daysToPayday)} until ${paydayWeekday}, ${paydayShort}`}
        </div>
      </Card>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <button
          onClick={() => fileRef.current?.click()}
          style={{ background: C.green, color: 'white', border: 'none', borderRadius: 999, padding: '13px 28px', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 6px 14px -8px rgba(43,94,63,0.55)' }}>
          📷 Scan a receipt
        </button>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleImage} style={{ display: 'none' }} />
        <div style={{ fontSize: 11, color: C.charcoalLight, fontStyle: 'italic', marginTop: 6 }}>
          Snap a photo of the receipt, or upload one from your library.
        </div>
      </div>

      {/* View toggle */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ display: 'inline-flex', background: C.cream, padding: 3, borderRadius: 999, border: `1px solid ${C.creamDark}` }}>
          {[['day', 'By day'], ['category', 'By category']].map(([v, label]) => (
            <button key={v} onClick={() => setViewMode(v)} style={{
              border: 'none',
              background: viewMode === v ? C.green : 'transparent',
              color: viewMode === v ? 'white' : C.charcoalLight,
              padding: '5px 16px',
              borderRadius: 999,
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}>{label}</button>
          ))}
        </div>
      </div>

      {viewMode === 'day' && cycleReceipts.length > 0 && (
        <>
          <div style={{ textAlign: 'center', fontSize: 10, color: C.sage, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
            Scanned receipts
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {[...cycleReceipts].sort((a, b) => (b.date || '').localeCompare(a.date || '')).map(r => {
              const expanded = expandedReceiptId === r.id;
              const d = new Date(r.date + 'T00:00:00');
              return (
                <Card key={r.id} style={{ borderLeft: `4px solid ${C.gold}`, padding: '12px 14px' }}>
                  <div onClick={() => setExpandedReceiptId(expanded ? null : r.id)} style={{ display: 'grid', gridTemplateColumns: '12px 1fr auto', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
                    <span style={{ width: 8, height: 8, background: C.gold, borderRadius: '50%' }}></span>
                    <div>
                      <div style={{ fontFamily: 'Georgia,serif', fontWeight: 700, fontSize: 14, color: C.charcoal }}>
                        {r.merchant}
                        <span style={{ fontStyle: 'italic', color: C.sage, fontWeight: 400, marginLeft: 8, fontSize: 12.5 }}>{d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: C.sage, fontStyle: 'italic', marginTop: 2 }}>
                        {r.items.length} item{r.items.length === 1 ? '' : 's'} · tap to {expanded ? 'collapse' : 'see items'}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Georgia,serif', color: C.green, fontWeight: 700, fontSize: 18 }}>{fmt(r.total)}</div>
                  </div>
                  {expanded && (
                    <div style={{ marginTop: 10, borderTop: `1px solid ${C.cream}`, paddingTop: 8 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <tbody>
                          {r.items.map(it => (
                            <tr key={it.id} style={{ borderTop: `1px solid ${C.cream}` }}>
                              <td style={{ padding: '5px 7px', color: C.charcoal, verticalAlign: 'top' }}>
                                <div>{it.name}</div>
                                <div style={{ marginTop: 3, display: 'inline-block', background: C.cream, border: `1px solid ${C.creamDark}`, borderRadius: 999, padding: '1px 8px', fontSize: 10, color: C.green, fontWeight: 600 }}>
                                  {catName(it.category || 'cat-other')}
                                </div>
                              </td>
                              <td style={{ padding: '5px 7px', textAlign: 'right', color: C.espresso, fontWeight: 700, verticalAlign: 'top' }}>{fmt(it.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 12 }}>
                        <button onClick={() => startEditReceipt(r)} style={{ border: 'none', background: 'transparent', color: C.green, fontSize: 11.5, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Edit receipt</button>
                        <button onClick={() => delReceipt(r.id)} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, fontSize: 11, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>Remove this receipt</button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}

      {viewMode === 'day' && (
      <Card style={{ marginBottom: 14 }}>
        {!adding ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: C.green, fontSize: 15 }}>Log a purchase</div>
              <div style={{ fontSize: 11, color: C.charcoalLight, fontStyle: 'italic' }}>What was bought, where, how much.</div>
            </div>
            <Btn small onClick={() => { setForm({ ...REAL_ENTRY_EMPTY }); setAdding(true); }}>+ Add</Btn>
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 7 }}>
              <FI label="What I Bought / Where" value={form.description} onChange={e => setF('description', e.target.value)} placeholder="e.g. Target, coffee" />
              <FI label="Card / Cash" value={form.method} onChange={e => setF('method', e.target.value)} options={PAY_METHODS} />
              <FI label="Amount ($)" value={form.amount} onChange={e => setF('amount', e.target.value)} type="number" placeholder="0.00" />
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 10, color: C.charcoalLight, marginBottom: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: .3 }}>Category</label>
                <select
                  value={form.category || 'cat-other'}
                  onChange={e => setF('category', e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, background: 'white', color: '#2C2C2C', outline: 'none' }}
                >
                  {visibleCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <FI label="Notes" value={form.notes} onChange={e => setF('notes', e.target.value)} placeholder="Optional" />
            </div>
            <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
              <Btn small onClick={save}>Save</Btn>
              <Btn small variant="ghostDark" onClick={() => setAdding(false)}>Cancel</Btn>
            </div>
          </div>
        )}
      </Card>
      )}

      {viewMode === 'day' && (sortedDates.length === 0 && cycleReceipts.length === 0 ? (
        <Card><div style={{ textAlign: 'center', color: C.charcoalLight, fontStyle: 'italic', padding: '14px 0', fontSize: 13 }}>Nothing logged in this cycle yet.</div></Card>
      ) : sortedDates.length === 0 ? null : (
        sortedDates.map(ds => {
          const dayE = byDate[ds];
          const dayTotal = dayE.reduce((s, e) => s + (+e.amount || 0), 0);
          const d = new Date(ds + 'T00:00:00');
          const isToday = ds === todayStr;
          return (
            <Card key={ds} style={{ borderLeft: `4px solid ${isToday ? C.gold : C.green}`, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontFamily: 'Georgia,serif', color: isToday ? C.gold : C.green, fontSize: 14 }}>
                  {d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  {isToday && <span style={{ marginLeft: 8, fontSize: 10, background: C.gold, color: 'white', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>Today</span>}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.espresso }}>{fmt(dayTotal)}</div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <tbody>
                    {dayE.map(e => editingEntryId === e.id ? (
                      <tr key={e.id} style={{ borderTop: `1px solid ${C.cream}`, background: C.cream }}>
                        <td colSpan={5} style={{ padding: 8 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 6, marginBottom: 6 }}>
                            <input value={entryEditForm.description} onChange={ev => setEF('description', ev.target.value)} placeholder="What I Bought / Where" style={{ padding: '6px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 12, background: 'white', color: '#2C2C2C' }} />
                            <select value={entryEditForm.method} onChange={ev => setEF('method', ev.target.value)} style={{ padding: '6px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 12, background: 'white', color: '#2C2C2C' }}>
                              {PAY_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <input type="number" step="0.01" value={entryEditForm.amount} onChange={ev => setEF('amount', ev.target.value)} placeholder="0.00" style={{ padding: '6px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 12, background: 'white', color: '#2C2C2C', textAlign: 'right' }} />
                            <select value={entryEditForm.category || 'cat-other'} onChange={ev => setEF('category', ev.target.value)} style={{ padding: '6px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 12, background: 'white', color: '#2C2C2C' }}>
                              {visibleCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <input value={entryEditForm.notes} onChange={ev => setEF('notes', ev.target.value)} placeholder="Notes" style={{ padding: '6px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 5, fontFamily: 'inherit', fontSize: 12, background: 'white', color: '#2C2C2C' }} />
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <Btn small onClick={() => {
                              if (!entryEditForm.amount || !entryEditForm.description) return;
                              setEntries(es => es.map(x => x.id === e.id ? { ...x, description: entryEditForm.description, method: entryEditForm.method, amount: +entryEditForm.amount, notes: entryEditForm.notes, category: entryEditForm.category || 'cat-other' } : x));
                              setEditingEntryId(null);
                            }}>Save</Btn>
                            <Btn small variant="ghostDark" onClick={() => setEditingEntryId(null)}>Cancel</Btn>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={e.id} style={{ borderTop: `1px solid ${C.cream}` }}>
                        <td style={{ padding: '6px 7px', fontWeight: 600, verticalAlign: 'top' }}>
                          <div>{e.description}</div>
                          <div style={{ marginTop: 3, display: 'inline-block', background: C.cream, border: `1px solid ${C.creamDark}`, borderRadius: 999, padding: '1px 8px', fontSize: 10, color: C.green, fontWeight: 600 }}>
                            {catName(e.category || 'cat-other')}
                          </div>
                        </td>
                        <td style={{ padding: '6px 7px', color: C.charcoalLight, verticalAlign: 'top' }}>{e.method}</td>
                        <td style={{ padding: '6px 7px', fontWeight: 700, color: C.espresso, textAlign: 'right', verticalAlign: 'top' }}>{fmt(e.amount)}</td>
                        <td style={{ padding: '6px 7px', color: C.charcoalLight, fontSize: 11, verticalAlign: 'top' }}>{e.notes || '—'}</td>
                        <td style={{ padding: '6px 7px', textAlign: 'right', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                          <button onClick={() => { setEntryEditForm({ description: e.description, method: e.method || 'Card', amount: e.amount, notes: e.notes || '', category: e.category || 'cat-other' }); setEditingEntryId(e.id); }} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, cursor: 'pointer', fontSize: 13, marginRight: 6 }}>✎</button>
                          <button onClick={() => del(e.id)} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, cursor: 'pointer', fontSize: 13 }}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })
      ))}

      {viewMode === 'category' && (() => {
        // Aggregate spend per category
        const spend = {};
        cats.forEach(c => { spend[c.id] = 0; });
        cycleReceipts.forEach(r => {
          r.items.forEach(it => {
            const cid = (it.category && cats.find(c => c.id === it.category)) ? it.category : 'cat-other';
            spend[cid] = (spend[cid] || 0) + (+it.price || 0);
          });
        });
        cycleEntries.forEach(e => {
          const cid = (e.category && cats.find(c => c.id === e.category)) ? e.category : 'cat-other';
          spend[cid] = (spend[cid] || 0) + (+e.amount || 0);
        });

        const plannedRows = visibleCats.filter(c => (+c.allotment || 0) > 0);
        const unplannedRows = visibleCats
          .filter(c => !((+c.allotment || 0) > 0))
          .map(c => ({ ...c, spent: spend[c.id] || 0 }))
          .filter(c => c.spent > 0);
        const unplannedTotal = unplannedRows.reduce((s, c) => s + c.spent, 0);
        const hasAnyActivity = plannedRows.length > 0 || unplannedTotal > 0;

        const dayWordLocal = n => n === 1 ? 'day' : 'days';

        return (
          <div>
            <div style={{ textAlign: 'center', fontSize: 10, color: C.sage, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>
              Cycle of {fmtD(cycleStartD)}<span style={{ color: C.sageLight, margin: '0 8px' }}>·</span>{daysToPayday} {dayWordLocal(daysToPayday)} left
            </div>

            {plannedRows.length > 0 && (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, padding: '0 4px' }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.sage, fontWeight: 600 }}>Planned</span>
                  <span style={{ fontStyle: 'italic', fontSize: 11.5, color: C.sageLight }}>what you allotted</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
                  {plannedRows.map(c => {
                    const spent = spend[c.id] || 0;
                    const allotment = +c.allotment || 0;
                    const pct = Math.min(100, allotment > 0 ? (spent / allotment) * 100 : 0);
                    const over = spent > allotment;
                    const remaining = allotment - spent;
                    const isEditing = editingCatId === c.id;
                    return (
                      <Card key={c.id}>
                        {isEditing ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                            {c.locked ? (
                              <div style={{ flex: '1 1 140px', fontFamily: 'Georgia,serif', fontWeight: 500, fontSize: 15, color: C.charcoal }}>{c.name}</div>
                            ) : (
                              <input
                                value={catEditName}
                                onChange={e => setCatEditName(e.target.value)}
                                placeholder="Category name"
                                style={{ flex: '1 1 140px', padding: '5px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'Georgia,serif', fontSize: 14, fontWeight: 500, background: 'white', color: C.charcoal, outline: 'none' }}
                              />
                            )}
                            <span style={{ color: C.charcoalLight, fontSize: 11.5 }}>Allotment $</span>
                            <input
                              type="number"
                              step="0.01"
                              value={catEditValue}
                              onChange={e => setCatEditValue(e.target.value)}
                              autoFocus
                              style={{ width: 90, padding: '5px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, background: 'white', color: '#2C2C2C', outline: 'none' }}
                            />
                            <Btn small onClick={() => {
                              setCategories(xs => xs.map(x => x.id === c.id ? { ...x, allotment: +catEditValue || 0, name: (c.locked || !catEditName.trim()) ? x.name : catEditName.trim() } : x));
                              setEditingCatId(null);
                              setCatEditValue('');
                              setCatEditName('');
                            }}>Save</Btn>
                            <Btn small variant="ghostDark" onClick={() => { setEditingCatId(null); setCatEditValue(''); setCatEditName(''); }}>Cancel</Btn>
                            {!c.locked && (
                              <button onClick={() => {
                                setCategories(xs => xs.map(x => x.id === c.id ? { ...x, hidden: true, allotment: 0 } : x));
                                setEditingCatId(null);
                                setCatEditName('');
                              }} style={{ border: 'none', background: 'transparent', color: C.charcoalLight, fontSize: 11, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>hide category</button>
                            )}
                          </div>
                        ) : (
                          <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <div style={{ fontFamily: 'Georgia,serif', fontWeight: 500, fontSize: 15, color: C.charcoal }}>{c.name}</div>
                              <div style={{ fontFamily: 'Georgia,serif', fontSize: 13.5, color: C.charcoalLight }}>
                                <span style={{ color: over ? '#b8480a' : C.green, fontWeight: 700 }}>{fmt(spent)}</span> of {fmt(allotment)}
                              </div>
                            </div>
                            <div style={{ marginTop: 9, height: 6, background: C.cream, borderRadius: 999, overflow: 'hidden', border: `1px solid ${C.creamDark}` }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: over ? '#b8480a' : C.green, transition: 'width 0.2s' }}></div>
                            </div>
                            <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <button onClick={() => { setEditingCatId(c.id); setCatEditValue(allotment.toString()); setCatEditName(c.name); }} style={{ border: 'none', background: 'transparent', color: C.sage, fontSize: 11, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>edit</button>
                              <div style={{ fontFamily: 'Lora,Georgia,serif', fontStyle: 'italic', color: over ? '#b8480a' : C.sage, fontSize: 11.5 }}>{over ? `${fmt(Math.abs(remaining))} over` : `${fmt(remaining)} left`}</div>
                            </div>
                          </>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </>
            )}

            {unplannedRows.length > 0 && (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, padding: '0 4px' }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.sage, fontWeight: 600 }}>Unplanned</span>
                  <span style={{ fontStyle: 'italic', fontSize: 11.5, color: C.sageLight }}>where money went that wasn't in the plan</span>
                </div>
                <Card style={{ padding: 0, marginBottom: 10 }}>
                  {unplannedRows.map((c, i) => (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderTop: i === 0 ? 'none' : `1px solid ${C.cream}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 13.5, color: C.charcoal }}>{c.name}</span>
                        <button onClick={() => { setEditingCatId(c.id); setCatEditValue(''); setCatEditName(c.name); }} style={{ border: 'none', background: 'transparent', color: C.sage, fontSize: 10.5, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>set a plan</button>
                      </div>
                      <div style={{ fontFamily: 'Georgia,serif', fontSize: 14, color: C.charcoalLight, fontWeight: 700 }}>{fmt(c.spent)}</div>
                    </div>
                  ))}
                </Card>
                <div style={{ textAlign: 'center', fontSize: 12, color: C.sage, fontStyle: 'italic', marginBottom: 18 }}>
                  <strong style={{ color: C.charcoal, fontWeight: 600, fontStyle: 'normal' }}>{fmt(unplannedTotal)}</strong> in unplanned this cycle
                </div>
              </>
            )}

            {/* Inline allotment editor for unplanned categories (when set-a-plan clicked) */}
            {editingCatId && !plannedRows.some(p => p.id === editingCatId) && (() => {
              const editingCat = cats.find(c => c.id === editingCatId);
              const locked = editingCat?.locked;
              return (
                <Card style={{ marginBottom: 14, background: C.cream }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                    {locked ? (
                      <div style={{ flex: '1 1 140px', fontFamily: 'Georgia,serif', fontWeight: 500, fontSize: 15, color: C.charcoal }}>{catName(editingCatId)}</div>
                    ) : (
                      <input
                        value={catEditName}
                        onChange={e => setCatEditName(e.target.value)}
                        placeholder="Category name"
                        style={{ flex: '1 1 140px', padding: '5px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'Georgia,serif', fontSize: 14, fontWeight: 500, background: 'white', color: C.charcoal, outline: 'none' }}
                      />
                    )}
                    <span style={{ color: C.charcoalLight, fontSize: 11.5 }}>Allotment $</span>
                    <input
                      type="number"
                      step="0.01"
                      value={catEditValue}
                      onChange={e => setCatEditValue(e.target.value)}
                      autoFocus
                      placeholder="0.00"
                      style={{ width: 90, padding: '5px 8px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, background: 'white', color: '#2C2C2C', outline: 'none' }}
                    />
                    <Btn small onClick={() => {
                      const targetId = editingCatId;
                      setCategories(xs => xs.map(x => x.id === targetId ? { ...x, allotment: +catEditValue || 0, name: (locked || !catEditName.trim()) ? x.name : catEditName.trim() } : x));
                      setEditingCatId(null);
                      setCatEditValue('');
                      setCatEditName('');
                    }}>Save plan</Btn>
                    <Btn small variant="ghostDark" onClick={() => { setEditingCatId(null); setCatEditValue(''); setCatEditName(''); }}>Cancel</Btn>
                  </div>
                </Card>
              );
            })()}

            {!hasAnyActivity && (
              <Card style={{ textAlign: 'center', padding: 28, marginBottom: 14 }}>
                <div style={{ fontFamily: 'Georgia,serif', color: C.green, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Nothing tracked in this cycle yet</div>
                <p style={{ color: C.charcoalLight, fontSize: 13, margin: '0 auto 4px', maxWidth: 380, lineHeight: 1.5 }}>Scan a receipt or log a purchase and the money will show up here, sorted into categories.</p>
              </Card>
            )}

            {/* Add a category */}
            {addingCategory ? (
              <Card>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <input
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Pet care"
                    autoFocus
                    style={{ flex: '1 1 160px', padding: '7px 10px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, background: 'white', color: '#2C2C2C', outline: 'none' }}
                  />
                  <Btn small onClick={() => {
                    const trimmed = newCategoryName.trim();
                    if (!trimmed) return;
                    setCategories(xs => [...xs, { id: `custom-${uid()}`, name: trimmed, allotment: 0, hidden: false, isStarter: false }]);
                    setNewCategoryName('');
                    setAddingCategory(false);
                  }}>Add</Btn>
                  <Btn small variant="ghostDark" onClick={() => { setNewCategoryName(''); setAddingCategory(false); }}>Cancel</Btn>
                </div>
              </Card>
            ) : (
              <div style={{ textAlign: 'center', marginBottom: 4 }}>
                <button onClick={() => setAddingCategory(true)} style={{ border: 'none', background: 'transparent', color: C.green, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Add a category</button>
              </div>
            )}

            {/* Restore hidden categories */}
            {cats.some(c => c.hidden) && (
              <div style={{ textAlign: 'center', marginTop: 4 }}>
                <button onClick={() => {
                  const hiddenName = cats.filter(c => c.hidden).map(c => c.name).join(', ');
                  if (window.confirm(`Restore hidden categories: ${hiddenName}?`)) {
                    setCategories(xs => xs.map(x => ({ ...x, hidden: false })));
                  }
                }} style={{ border: 'none', background: 'transparent', color: C.sage, fontSize: 10.5, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>
                  Show hidden categories ({cats.filter(c => c.hidden).length})
                </button>
              </div>
            )}
          </div>
        );
      })()}

      <div style={{ textAlign: 'center', marginTop: 14 }}>
        {!editingPayday ? (
          <button onClick={() => { setPaydayInput(nextPayday); setEditingPayday(true); }} style={{ border: 'none', background: 'transparent', color: C.sage, fontSize: 11, fontStyle: 'italic', cursor: 'pointer', textDecoration: 'underline' }}>
            Update next paycheck date
          </button>
        ) : (
          <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', background: C.cream, padding: '8px 12px', borderRadius: 8, border: `1px solid ${C.creamDark}` }}>
            <input
              type="date"
              value={paydayInput}
              min={todayStr}
              onChange={e => setPaydayInput(e.target.value)}
              style={{ padding: '6px 10px', border: `1px solid ${C.creamDark}`, borderRadius: 6, fontFamily: 'inherit', fontSize: 13, background: 'white', color: '#2C2C2C' }}
            />
            <Btn small onClick={savePaydayUpdate}>Save</Btn>
            <Btn small variant="ghostDark" onClick={() => { setEditingPayday(false); setPaydayInput(''); }}>Cancel</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================================
// COACH PANEL
// =====================================================================
function CoachPanel({ bills, paySettings, activeTab, isOpen, onClose, prefill, clearPrefill }) {
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  useEffect(() => {
    if (prefill && isOpen) { setInp(prefill); clearPrefill(); }
  }, [prefill, isOpen]);
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
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onerror = () => {
      console.error('FileReader failed', reader.error);
      alert('Could not read that image. Try a different one?');
    };
    reader.onload = ev => {
      const img = new Image();
      img.onerror = () => {
        console.error('Image decode failed for type', file.type);
        alert('That image format is not supported here (HEIC/HEIF photos from iPhone can fail). Try saving as JPEG or PNG and uploading again.');
      };
      img.onload = () => {
        try {
          const MAX = 1280;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          const resizedUrl = canvas.toDataURL('image/jpeg', 0.85);
          const base64 = resizedUrl.split(',')[1];
          if (!base64) throw new Error('Empty base64 after encode');
          setImgData(base64);
          setImgType('image/jpeg');
          setImgPreview(resizedUrl);
        } catch (err) {
          console.error('Resize failed', err);
          alert('Could not process that image. Try a different one?');
        }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => { setImgData(null); setImgType(null); setImgPreview(null); };

  const buildCtx = () => {
    const active = bills.filter(b => b.status !== 'Zero Balance');
    const tM = active.reduce((s, b) => s + (+b.amount || 0), 0);
    const debts = active.filter(b => ['Credit', 'Debt/Loan'].includes(b.category));
    const tD = debts.reduce((s, b) => s + (+b.balance || 0), 0);
    const hiUtil = debts.filter(b => b.creditLimit && (+b.balance / +b.creditLimit) > .3).map(b => b.company);
    return `⚠️ LIVE DATA — always use these numbers, ignore any older numbers from memory. Current tab: ${TAB_LABELS[activeTab] || activeTab}. Bills entered: ${active.length}. Monthly obligations: ${fmt(tM)}. Total debt balance: ${fmt(tD)}. Paycheck: ${fmt(paySettings.amount)} ${paySettings.frequency || ''}. ${hiUtil.length ? `Cards above 30% utilization: ${hiUtil.join(', ')}.` : ''}`;
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
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder="Ask anything about your money…" style={{ flex: 1, padding: '7px 11px', border: `1px solid ${C.creamDark}`, borderRadius: 20, fontFamily: 'inherit', fontSize: 12, outline: 'none', color: '#2C2C2C', background: 'white' }} />
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
  const [realEntries, setRealEntries] = useState([]);
  const [realReceipts, setRealReceipts] = useState([]);
  const [realCategories, setRealCategories] = useState(STARTER_CATEGORIES);
  const [realCycleStart, setRealCycleStart] = useState('');
  const [realNextPayday, setRealNextPayday] = useState('');
  const [paycheckOverrides, setPaycheckOverrides] = useState({});
  const [paidBills, setPaidBills] = useState({});
  const [skippedBills, setSkippedBills] = useState({});
  const [bankBalance, setBankBalance] = useState('');
  const [tab, setTab] = useState('everything');
  const [coach, setCoach] = useState(false);
  const [coachPrefill, setCoachPrefill] = useState('');
  const askCoach = (billName) => { setCoachPrefill(`I want to talk about ${billName}.`); setCoach(true); };
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
            // Migrate legacy 7-Day Tracker → The Real Page on first load if no Real Page data yet
            if (d.realEntries) setRealEntries(d.realEntries);
            else if (d.tracker) setRealEntries(d.tracker);
            if (d.realReceipts) setRealReceipts(d.realReceipts);
            if (d.realCategories && Array.isArray(d.realCategories) && d.realCategories.length) setRealCategories(d.realCategories);
            if (d.realCycleStart) setRealCycleStart(d.realCycleStart);
            else if (d.trackerStart) setRealCycleStart(d.trackerStart);
            if (d.realNextPayday) setRealNextPayday(d.realNextPayday);
            else if (d.trackerStart) {
              // Old 7-day cycle: nextPayday = trackerStart + 7 days
              const sd = new Date(d.trackerStart + 'T00:00:00');
              sd.setDate(sd.getDate() + 7);
              setRealNextPayday(`${sd.getFullYear()}-${String(sd.getMonth()+1).padStart(2,'0')}-${String(sd.getDate()).padStart(2,'0')}`);
            }
            if (d.paycheckOverrides) setPaycheckOverrides(d.paycheckOverrides);
            if (d.paidBills) setPaidBills(d.paidBills);
            if (d.skippedBills) setSkippedBills(d.skippedBills);
            if (d.bankBalance !== undefined) setBankBalance(d.bankBalance);
            setDataLoaded(true);
            return;
          }
        }
      } catch {}
      const keys = [['bills', setBills], ['pay', setPay], ['grocery', setGrocery], ['funds', setFunds], ['goal', setGoal], ['snow', setSnow], ['aval', setAval], ['realEntries', setRealEntries], ['realReceipts', setRealReceipts], ['realCategories', setRealCategories], ['realCycleStart', setRealCycleStart], ['realNextPayday', setRealNextPayday]];
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
  useEffect(() => { sv('realEntries', realEntries); }, [realEntries]);
  useEffect(() => { sv('realReceipts', realReceipts); }, [realReceipts]);
  useEffect(() => { sv('realCategories', realCategories); }, [realCategories]);
  useEffect(() => { sv('realCycleStart', realCycleStart); }, [realCycleStart]);
  useEffect(() => { sv('realNextPayday', realNextPayday); }, [realNextPayday]);
  useEffect(() => { sv('paidBills', paidBills); }, [paidBills]);
  useEffect(() => { sv('skippedBills', skippedBills); }, [skippedBills]);
  useEffect(() => { sv('bankBalance', bankBalance); }, [bankBalance]);

  useEffect(() => {
    if (!dataLoaded) return;
    saveToSupabase({ bills, pay, grocery, funds, goal, snow, aval, realEntries, realReceipts, realCategories, realCycleStart, realNextPayday, paycheckOverrides, paidBills, skippedBills, bankBalance });
  }, [bills, pay, grocery, funds, goal, snow, aval, realEntries, realReceipts, realCategories, realCycleStart, realNextPayday, paycheckOverrides, paidBills, skippedBills, bankBalance, dataLoaded]);

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

  const handleLogout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch {}
    window.location.href = 'https://myreallifemoney.memberful.com/auth/sign_out?return_to=https://dashboard.myreallifemoney.com';
  };

  const TABS = [
    { id: 'everything', label: 'Everything Page' },
    { id: 'payday',     label: 'Payday' },
    { id: 'real',       label: 'The Real Page' },
    { id: 'debt',       label: 'Debt & Credit' },
    { id: 'snowball',   label: 'Snowball' },
    { id: 'avalanche',  label: 'Avalanche' },
    { id: 'goals',      label: 'Goals' },
    { id: 'funds',      label: 'Sinking Funds' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: '"Segoe UI", system-ui, sans-serif', color: C.charcoal }}>
      <div style={{ background: C.green, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={rlmLogo} alt="RLM" style={{ height: 36, width: 36, borderRadius: '50%' }} />
          <div style={{ color: 'white', fontFamily: 'Georgia,serif', fontSize: 18, fontWeight: 700 }}>RLM Dashboard</div>
          {window.innerWidth >= 640 && <div style={{ color: 'white', fontSize: 13, fontStyle: 'italic' }}>See It - Understand It - Live It</div>}
        </div>
        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600 }}>Sign Out</button>
      </div>
      <div style={{ background: 'white', borderBottom: `1px solid ${C.creamDark}`, overflowX: 'auto' }}>
        <div style={{ display: 'flex', padding: '0 18px', minWidth: 'max-content' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '11px 15px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? C.green : C.charcoalLight, whiteSpace: 'nowrap', borderBottom: `3px solid ${tab === t.id ? C.green : 'transparent'}`, transition: 'all .15s' }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '18px 14px 110px' }}>
        {tab === 'everything' && <EverythingPage bills={bills} setBills={setBills} askCoach={askCoach} />}
        {tab === 'payday' && <PaydayPage bills={bills} paySettings={pay} setPaySettings={setPay} groceryBudgets={grocery} setGroceryBudgets={setGrocery} paycheckOverrides={paycheckOverrides} setPaycheckOverrides={setPaycheckOverrides} paidBills={paidBills} setPaidBills={setPaidBills} skippedBills={skippedBills} setSkippedBills={setSkippedBills} bankBalance={bankBalance} setBankBalance={setBankBalance} />}
        {tab === 'debt'       && <DebtPage bills={bills} setBills={setBills} askCoach={askCoach} />}
        {tab === 'snowball'   && <DebtPlanPage bills={bills} amount={snow} setAmount={setSnow} mode="snowball" askCoach={askCoach} />}
        {tab === 'avalanche'  && <DebtPlanPage bills={bills} amount={aval} setAmount={setAval} mode="avalanche" askCoach={askCoach} />}
        {tab === 'goals'      && <GoalsPage goal={goal} setGoal={setGoal} bills={bills} paySettings={pay} />}
        {tab === 'funds'      && <SinkingFunds funds={funds} setFunds={setFunds} />}
        {tab === 'real'       && <TheRealPage entries={realEntries} setEntries={setRealEntries} receipts={realReceipts} setReceipts={setRealReceipts} categories={realCategories} setCategories={setRealCategories} cycleStart={realCycleStart} setCycleStart={setRealCycleStart} nextPayday={realNextPayday} setNextPayday={setRealNextPayday} />}
      </div>

      <button onClick={() => setCoach(o => !o)} style={{ position: 'fixed', bottom: 18, right: 18, background: coach ? C.charcoal : C.green, color: 'white', border: 'none', borderRadius: 50, padding: '12px 20px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: 13, boxShadow: '0 4px 20px rgba(43,94,63,.4)', display: 'flex', alignItems: 'center', gap: 7, zIndex: 999, transition: 'all .2s' }}>
        {coach ? '✕ Close Coach' : '💬 Ask Coach'}
      </button>

      <CoachPanel bills={bills} paySettings={pay} activeTab={tab} isOpen={coach} onClose={() => setCoach(false)} prefill={coachPrefill} clearPrefill={() => setCoachPrefill('')} />
    </div>
  );
}
