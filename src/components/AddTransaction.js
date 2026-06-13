import { useState } from 'react';

const INCOME_CATS  = ['Salary','Freelance','Investment','Gift','Other'];
const EXPENSE_CATS = ['Food','Rent','Transport','Shopping','Utilities','Health','Education','Entertainment','Other'];

function AddTransaction({ onAdd }) {
  const [type,   setType]   = useState('INCOME');
  const [cat,    setCat]    = useState('Salary');
  const [amount, setAmount] = useState('');
  const [desc,   setDesc]   = useState('');
  const [date,   setDate]   = useState(new Date().toISOString().split('T')[0]);
  const [msg,    setMsg]    = useState('');

  const cats = type === 'INCOME' ? INCOME_CATS : EXPENSE_CATS;

  function handleTypeChange(t) {
    setType(t);
    setCat(t === 'INCOME' ? INCOME_CATS[0] : EXPENSE_CATS[0]);
  }

  function handleSubmit() {
    if (!amount || amount <= 0) { setMsg('Enter a valid amount'); return; }
    if (!date)                  { setMsg('Select a date');        return; }

    const d   = new Date(date);
    const fmt = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;

    onAdd({ type, category: cat, description: desc || cat, amount: parseFloat(amount), date: fmt });
    setAmount('');
    setDesc('');
    setMsg('Transaction saved!');
    setTimeout(() => setMsg(''), 2500);
  }

  return (
    <div>
      <div className="page-title">Add Transaction</div>
      <div className="form-wrap">
        <div className="card">

          <div className="toggle-row">
            <button
              className={`toggle-btn ${type === 'INCOME' ? 'income' : ''}`}
              onClick={() => handleTypeChange('INCOME')}>
              + Income
            </button>
            <button
              className={`toggle-btn ${type === 'EXPENSE' ? 'expense' : ''}`}
              onClick={() => handleTypeChange('EXPENSE')}>
              - Expense
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={cat} onChange={e => setCat(e.target.value)}>
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount (Rs)</label>
              <input
                className="form-control"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group full">
              <label className="form-label">Description</label>
              <input
                className="form-control"
                type="text"
                placeholder="What was this for?"
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
            <div className="form-group full">
              <label className="form-label">Date</label>
              <input
                className="form-control"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>

          {msg && (
            <p style={{ marginTop:'10px', color: msg.includes('saved') ? '#34d399' : '#f87171' }}>
              {msg}
            </p>
          )}

          <button className="btn-submit" onClick={handleSubmit}>
            Save Transaction
          </button>

        </div>
      </div>
    </div>
  );
}

export default AddTransaction;