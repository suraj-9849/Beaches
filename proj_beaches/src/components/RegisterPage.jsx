import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import {app} from '../firebase/firebaseConfig';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      navigate('/logged-in-state');
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(234, 233, 228)', padding: '50px' }}>
      <div style={{ margin: '0 auto', width: '300px', padding: '20px', border: '2px solid black', borderRadius: '10px' }}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ height: '30px', borderRadius: '10px', marginBottom: '10px' }}
            />
          </div>
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
          <button type="submit" style={{ height: '30px', borderRadius: '10px' }}>Register</button>
        </form>
        <p>Already registered? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default RegisterPage;
