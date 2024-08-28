import React from 'react'

const Searchbar = () => {
  return (
    <>
      <div className="fixed top-[140px] left-0 w-full px-4 flex justify-between z-10">
        <input
          type="text"
          placeholder="Search beaches"
          className="w-[75%] h-[40px] border border-gray-300 rounded-lg px-4"
        />
        <button className="w-[20%] h-[40px] bg-emerald-400 text-white rounded-lg ml-2">
          Filter
        </button>
      </div>
    </>
  )
}

export default Searchbar
