import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Import getAuth

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const auth = getAuth();  // Initialize the auth instance
    try {
      await signInWithEmailAndPassword(auth, email, password);  // Pass auth as the first argument
      navigate('/logged-in-state');
    } catch (error) {
      setMessage('Error logging in: ' + error.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(234, 233, 228)', padding: '50px' }}>
      <div style={{ margin: '0 auto', width: '300px', padding: '20px', border: '2px solid black', borderRadius: '10px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: '30px', borderRadius: '10px', marginBottom: '10px' }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: '30px', borderRadius: '10px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" style={{ height: '30px', borderRadius: '10px' }}>Login</button>
        </form>
        <p>{message}</p>
        <p>New user? <a href="/register">Register here</a></p>
        <p>New organization? <a href="/org-register">Click here</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
