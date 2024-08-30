import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../Navbar';
import Footer from '../Footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setMessage('Error :' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-0 bg-white rounded-lg shadow-lg transform -rotate-6"></div>
          <div className="absolute inset-0 bg-white rounded-lg shadow-lg transform rotate-6"></div>
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
            </div>
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="surfer@beachlife.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Dive In
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Create the New Account</p>
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
               Register Here
              </a>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">Create an Account as NGO</p>
              <a href="/org-register" className="font-medium text-blue-600 hover:text-blue-500">
               Register Here
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;