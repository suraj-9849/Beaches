import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MainPage;
