import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import History from './components/History';
import Reports from './components/Reports';
import './App.css';

const API = 'http://localhost:5000/api/transactions';

function App() {
  const [page, setPage]               = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]         = useState(true);

  // Load from backend on startup
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => { setTransactions(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  // Add transaction
  async function addTransaction(t) {
    const res  = await fetch(API, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(t)
    });
    const newT = await res.json();
    setTransactions(prev => [newT, ...prev]);
  }

  // Delete transaction
  async function deleteTransaction(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTransactions(prev => prev.filter(t => t._id !== id));
  }

  if (loading) return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'#a78bfa', fontSize:'18px'}}>
      Loading...
    </div>
  );

  return (
    <div className="layout">
      <Sidebar page={page} setPage={setPage} />
      <main className="main">
        {page === 'dashboard' && <Dashboard transactions={transactions} />}
        {page === 'add'       && <AddTransaction onAdd={addTransaction} />}
        {page === 'history'   && <History transactions={transactions} onDelete={deleteTransaction} />}
        {page === 'reports'   && <Reports transactions={transactions} />}
      </main>
    </div>
  );
}

export default App;