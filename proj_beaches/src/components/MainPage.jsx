import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase/firebaseConfig'


const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div>
      <h1>Hi there!!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainPage;
