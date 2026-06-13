import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import History from './components/History';
import Reports from './components/Reports';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleLogout = () => signOut(auth);

  if (loading) return (
    <div style={{ minHeight:'100vh', backgroundColor:'#0f0f1a',
      display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'#a78bfa', fontSize:'20px' }}>Loading...</p>
    </div>
  );

  if (!user) return <Login onLogin={() => {}} />;

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="main">
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', padding:'16px 24px',
          borderBottom:'1px solid #2a2a3e' }}>
          <span style={{ color:'#8b8fa8', fontSize:'14px' }}>
            👋 {user.email}
          </span>
          <button onClick={handleLogout} style={{
            backgroundColor:'#ff6b6b20', border:'1px solid #ff6b6b',
            color:'#ff6b6b', padding:'8px 16px', borderRadius:'8px',
            cursor:'pointer', fontSize:'14px'
          }}>Logout</button>
        </div>
        {activePage === 'dashboard' && <Dashboard transactions={transactions} />}
        {activePage === 'add' && <AddTransaction transactions={transactions} setTransactions={setTransactions} setActivePage={setActivePage} />}
        {activePage === 'history' && <History transactions={transactions} setTransactions={setTransactions} />}
        {activePage === 'reports' && <Reports transactions={transactions} />}
      </div>
    </div>
  );
}

export default App;