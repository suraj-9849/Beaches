import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full ">
      <Navbar />
      <main className="flex-grow flex flex-col mt-10 ">
       <h1 className='mt-10 text-6xl font-bold ' > I am Home Page</h1>
      </main>
      <Footer />
    </div>
  )
}

export default Home