import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-400 to-emerald-400 shadow-md z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[8vh] flex justify-between items-center">
        <div className="flex items-center">
          <Link to='/' className="text-white hover:text-gray-200 transition-colors">
            <h1 className='text-3xl font-semibold'>Beaches</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <button className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors ml-4">
            <Link to='/login'><User size={24} /></Link>
          </button>
          <button onClick={toggleMenu} className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors lg:hidden">
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
            <Link to='/createEvent' className="text-white hover:text-gray-200 transition-colors px-4 py-2">
              Create Event
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
