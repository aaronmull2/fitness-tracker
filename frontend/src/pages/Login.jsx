import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const res = await api.post(endpoint, { email, password });
      if (!isRegistering) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        setIsRegistering(false);
        setError('Registered! Please log in.');
      }
    } catch {
      setError('Invalid credentials or registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem' }}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}
