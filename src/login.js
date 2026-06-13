import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#0f0f1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e', padding: '40px',
        borderRadius: '16px', width: '380px', border: '1px solid #2a2a3e'
      }}>
        <h2 style={{ color: '#a78bfa', textAlign: 'center', marginBottom: '8px' }}>
          💰 BudgetTrack
        </h2>
        <p style={{ color: '#8b8fa8', textAlign: 'center', marginBottom: '32px' }}>
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </p>

        {error && (
          <div style={{ backgroundColor: '#ff6b6b20', border: '1px solid #ff6b6b',
            borderRadius: '8px', padding: '12px', marginBottom: '16px',
            color: '#ff6b6b', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#8b8fa8', fontSize: '14px' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              required placeholder="you@example.com"
              style={{ width: '100%', padding: '12px', marginTop: '6px',
                backgroundColor: '#0f0f1a', border: '1px solid #2a2a3e',
                borderRadius: '8px', color: '#fff', fontSize: '14px',
                boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#8b8fa8', fontSize: '14px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              required placeholder="Min 6 characters"
              style={{ width: '100%', padding: '12px', marginTop: '6px',
                backgroundColor: '#0f0f1a', border: '1px solid #2a2a3e',
                borderRadius: '8px', color: '#fff', fontSize: '14px',
                boxSizing: 'border-box' }} />
          </div>

          <button type="submit" style={{
            width: '100%', padding: '14px', backgroundColor: '#a78bfa',
            border: 'none', borderRadius: '8px', color: '#000',
            fontWeight: 'bold', fontSize: '16px', cursor: 'pointer'
          }}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ color: '#8b8fa8', textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)}
            style={{ color: '#a78bfa', cursor: 'pointer', marginLeft: '6px' }}>
            {isRegister ? 'Sign In' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;