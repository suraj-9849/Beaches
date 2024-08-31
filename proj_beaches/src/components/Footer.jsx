import React from 'react'
import { Search, Map, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex items-center w-full left-0  h-[8vh] z-50 bg-gradient-to-r from-emerald-400 to-blue-500 shadow-lg">
    
        <div className="flex justify-around items-center w-full h-full ">
          <Link to='/search'  ><FooterButton icon={<Search size={24} />} label="Search" /></Link>
          <Link to='/map' ><FooterButton icon={<Map size={28} />} label="Map" /></Link>
          <Link to='/BookMark' ><FooterButton icon={<Bookmark size={24} />} label="Bookmark" /></Link>
        </div>

    </footer>
  )
}

const FooterButton = ({ icon, label }) => (
  <button className="flex flex-col items-center justify-center w-16 h-full text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
)

export default Footer