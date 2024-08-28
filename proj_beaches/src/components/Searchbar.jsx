import React from 'react'
import { Search } from 'lucide-react'

const Searchbar = ({ input, setInput }) => {
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className="w-full h-[20vh] bg-[#EEF5FE] px-4 flex justify-center items-center">
      <div className="max-w-3xl w-full pt-[7vh] mx-auto">
        <div className="flex items-center shadow-lg rounded-lg bg-white">
          <div className="p-3">
            <Search className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search beaches"
            value={input}
            onChange={handleInput}
            className="w-full py-3 text-gray-700 bg-transparent focus:outline-none"
            aria-label="Search beaches"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 text-white font-semibold rounded-r-lg transition-all duration-300 hover:from-blue-500 hover:via-teal-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default Searchbar