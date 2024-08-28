import React from 'react'
import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
<div className='pb-10' >
<header className="fixed top-0 left-0 w-full h-[8vh] bg-gradient-to-r from-blue-400 to-emerald-400 shadow-md z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link to='/' className="text-white hover:text-gray-200 transition-colors">
              <h1 className='text-3xl font-semibold'>Beaches</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <button className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white p-2 rounded-full transition-colors">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
</div>
  )
}

export default Navbar