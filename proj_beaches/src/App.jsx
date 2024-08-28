import React from 'react';
import Footer from './components/Footer';
import BeachDivs from './components/BeachDivs';
import Searchbar from './components/Searchbar';
//add BeachDivs later in searchbar and footer
const App = () => {
  
  return (
    <div className="h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full bg-white z-10">
        <img className="mx-auto w-[170px] h-[135px]" src="./logo.png" alt="Logo" />
      </header>

      <Searchbar/>

      
      <Footer />
      
    </div>
  );
};

export default App;
