import React, { useState } from 'react'
import Searchbar from '../Searchbar'
import BeachDivs from '../BeachDivs'
import Footer from '../Footer'
import Navbar from '../Navbar'

function Home() {
  const [input, setInput] = useState("");

  return (
    <div className="min-h-screen flex flex-col w-full ">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Searchbar input={input} setInput={setInput} />
        <BeachDivs filter={input} />
      </main>
      <Footer />
    </div>
  )
}

export default Home