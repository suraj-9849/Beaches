import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, push, ref } from 'firebase/database';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { app } from '../../firebase/firebaseConfig';
import { supabase } from '../../supabaseClient'; // Import Supabase client

const OrgRegPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationType, setOrganizationType] = useState('NGO');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleRegister = async (event) => {
    event.preventDefault();
    const db = getDatabase();
    const ngoRef = ref(db, 'NG0');

    const detailsObj = {
      name,
      email,
      org_type: organizationType,
    };

    console.log(detailsObj);
    try {
      await push(ngoRef, detailsObj);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      // Save user details to Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([
          { email: cred.user.email, user_id: cred.user.uid, user_name: name }
        ]);

      if (error) throw error;

      navigate('/');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-3">
        <div className="relative max-w-md w-full p-1 rounded-md bg-gradient-to-b from-blue-300 via-green-200 to-yellow-200 ">
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">NGO Organization Sign-Up</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Coastal Cleanup Crew"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="info@coastalcleanup.org"
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization Type:</label>
                <select
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="NGO">NGO</option>
                  <option value="Other">Other...</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </form>
            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
            <div className="mt-6 text-center">
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrgRegPage;
