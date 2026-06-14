import { useState } from 'react';

const API = 'https://budget-tracker-backend-dzjh.onrender.com/api/auth';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [msg,      setMsg]      = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit() {
    if (!email || !password) { setMsg('Fill all fields'); return; }
    if (isRegister && !name) { setMsg('Enter your name'); return; }
    setLoading(true);
    setMsg('');
    const url  = isRegister ? `${API}/register` : `${API}/login`;
    const body = isRegister ? { name, email, password } : { email, password };
    try {
      const res  = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) { setMsg(data.error || 'Something went wrong'); setLoading(false); return; }
      localStorage.setItem('bt_token', data.token);
      localStorage.setItem('bt_name',  data.name);
      onLogin(data.token, data.name);
    } catch (err) {
      setMsg('Server error. Try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', background:'#0f1117'}}>
      <div style={{background:'#1a1d27', border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:'16px', padding:'36px', width:'100%', maxWidth:'400px'}}>
        <h1 style={{color:'#a78bfa', fontWeight:800, fontSize:'24px', marginBottom:'6px'}}>
          budgettrack
        </h1>
        <p style={{color:'#8b8fa8', fontSize:'13px', marginBottom:'28px'}}>
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </p>
        {isRegister && (
          <div style={{marginBottom:'14px'}}>
            <label style={{fontSize:'12px', color:'#8b8fa8', display:'block', marginBottom:'6px'}}>Name</label>
            <input style={{width:'100%', padding:'10px 14px', background:'#22263a',
              border:'1px solid rgba(255,255,255,0.08)', borderRadius:'10px',
              color:'#f1f1f3', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
              placeholder="Your name" value={name} onChange={e => setName(e.target.value)}/>
          </div>
        )}
        <div style={{marginBottom:'14px'}}>
          <label style={{fontSize:'12px', color:'#8b8fa8', display:'block', marginBottom:'6px'}}>Email</label>
          <input style={{width:'100%', padding:'10px 14px', background:'#22263a',
            border:'1px solid rgba(255,255,255,0.08)', borderRadius:'10px',
            color:'#f1f1f3', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            type="email" placeholder="you@example.com" value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label style={{fontSize:'12px', color:'#8b8fa8', display:'block', marginBottom:'6px'}}>Password</label>
          <input style={{width:'100%', padding:'10px 14px', background:'#22263a',
            border:'1px solid rgba(255,255,255,0.08)', borderRadius:'10px',
            color:'#f1f1f3', fontSize:'14px', outline:'none', boxSizing:'border-box'}}
            type="password" placeholder="Min 6 characters" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}/>
        </div>
        {msg && <p style={{color:'#f87171', fontSize:'13px', marginBottom:'12px'}}>{msg}</p>}
        <button onClick={handleSubmit} disabled={loading}
          style={{width:'100%', padding:'13px', background:'#6c63ff', color:'#fff',
            border:'none', borderRadius:'10px', fontSize:'15px', fontWeight:600,
            cursor:'pointer', marginBottom:'16px', opacity: loading ? 0.7 : 1}}>
          {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
        </button>
        <p style={{textAlign:'center', fontSize:'13px', color:'#8b8fa8'}}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setIsRegister(!isRegister); setMsg(''); }}
            style={{color:'#a78bfa', cursor:'pointer', fontWeight:600}}>
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;