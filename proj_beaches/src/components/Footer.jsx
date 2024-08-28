import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full bg-emerald-400 h-[60px] flex justify-around items-center">
        <button className="w-[30px] h-[30px]">
          <img src="./search.png" alt="Search" />
        </button>
        <button className="w-[40px] h-[40px]">
          <img src="../public/map.png" alt="Map" />
        </button>
        <button className="w-[30px] h-[30px]">
          <img src="./bookmark.png" alt="Bookmark" />
        </button>
      </footer>
    </>
  )
}

export default Footer
