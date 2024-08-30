import React, { useState, useEffect } from 'react';
import { User, Menu, X, Bell } from 'lucide-react'; // Import the Bell (alert) icon
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase/firebaseConfig';

var ngo_checker = false;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const ngo_ref = ref(db, "NG0");
      onValue(ngo_ref, (snapshot) => {
        snapshot.forEach((childsnapshot) => {
          if (currentUser.email === childsnapshot.val().email) {
            ngo_checker = true;
          }
        });
      });
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-400 to-emerald-400 shadow-md z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[8vh] flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/' className="text-white hover:text-gray-200 transition-colors">
            <h1 className='text-3xl font-semibold'>S&nbsp;h&nbsp;o&nbsp;r&nbsp;e&nbsp;s</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <Link to='/alerts' className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors ml-4">
            <Bell size={24} /> {/* Alert icon with routing */}
          </Link>
          {user ? (
            <button onClick={handleLogout} className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors ml-4">
              <User size={24} />
            </button>
          ) : (
            <Link to='/login' className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors ml-4">
              <User size={24} />
            </Link>
          )}
          <button onClick={toggleMenu} className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors lg:hidden ml-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-r from-blue-400 to-emerald-400 shadow-md z-10 absolute top-[8vh] left-0 w-full">
          <nav className="flex flex-col items-center py-4">
            <Link to='/events' className="text-white hover:text-gray-200 transition-colors px-4 py-2">
              Events
            </Link>
            {ngo_checker && (
              <Link to='/createEvent' className="text-white hover:text-gray-200 transition-colors px-4 py-2">
                Create Event
              </Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="text-white hover:text-gray-200 transition-colors px-4 py-2">
                Logout
              </button>
            ) : (
              <Link to='/login' className="text-white hover:text-gray-200 transition-colors px-4 py-2">
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
