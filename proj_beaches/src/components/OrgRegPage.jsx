import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { } from '../firebase/firebaseConfig';
import { getDatabase, push, ref } from 'firebase/database';

const OrgRegPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationType, setOrganizationType] = useState('NGO');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const db = getDatabase();
    const ngoRef = ref(db, 'NG0');
    
    const detailsObj = {
      name,
      email,
      org_type: organizationType
    };

    try {
      await push(ngoRef, detailsObj);
      // Assuming you handle registration here
      navigate('/logged-in-state');
    } catch (error) {
      console.error('Error registering organization:', error.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(234, 233, 228)', padding: '50px' }}>
      <div style={{ margin: '0 auto', width: '300px', padding: '20px', border: '2px solid black', borderRadius: '10px' }}>
        <h2>Register Organization</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Organization Name:</label>
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
          <div>
            <label>Choose an option:</label>
            <select
              value={organizationType}
              onChange={(e) => setOrganizationType(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '10px', marginBottom: '10px' }}
            >
              <option value="NGO">NGO</option>
              <option value="Other">Other...</option>
            </select>
          </div>
          <button type="submit" style={{ height: '30px', borderRadius: '10px' }}>Register</button>
        </form>
        <p>Already registered? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default OrgRegPage;
