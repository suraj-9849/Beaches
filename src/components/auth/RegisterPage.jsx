import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig';
import { supabase } from '../../supabaseClient';
import Navbar from '../Navbar';
import Footer from '../Footer';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      const { data, error } = await supabase
        .from('users')
        .insert([{ email: cred.user.email, user_id: cred.user.uid, user_name: name }]);

      if (error) {
        console.error('Supabase Insert Error:', error);
        setMessage('Error saving data to Supabase.');
        return;
      }

      navigate('/');
    } catch (error) {
      console.error('Registration Error:', error);
      setMessage('Error: ' + (error.message || 'An unexpected error occurred.'));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="relative max-w-md w-full p-1 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-lg">
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
              Register
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  placeholder="SunnyDays123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  placeholder="beachlover@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Create Account
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <a href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                Login Here
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
