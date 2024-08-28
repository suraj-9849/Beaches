import React, { useState, useEffect } from 'react';
import beachData from './locations.json';

const App = () => {
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    const allBeaches = [];
    Object.keys(beachData).forEach(state => {
      const stateBeaches = Object.keys(beachData[state]);
      stateBeaches.forEach(beach => {
        allBeaches.push({ name: beach, location: state });
      });
    });
    setBeaches(allBeaches);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full bg-white z-10">
        <img className="mx-auto w-[170px] h-[135px]" src="./logo.png" alt="Logo" />
      </header>

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

      <div className="flex-1 overflow-y-auto mt-[200px]">
        <ul className="flex flex-wrap justify-center gap-4 p-4">
          {beaches.map((beach, index) => (
            <li key={index} className="w-[407px] h-[250px] bg-white border border-black rounded-xl flex flex-col justify-between p-4">
              <div className="w-[380px] h-[170px] bg-white border border-black rounded-xl flex items-center justify-center">
                Beach photo
              </div>
              <div className="w-full flex justify-between items-center mt-2">
                <div className="text-left">
                  <p className="font-semibold">{beach.name}</p>
                  <p className="text-gray-600">{beach.location}</p>
                </div>
                <button className="w-[30px] h-[30px]">
                  <img src="./bookmark.png" alt="Bookmark" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed top-[820px] left-[175px] bg-emerald-400 w-[80px] h-[150px] rounded-full z-10 flex justify-center items-start">
        <button className="w-[50px] h-[50px] absolute -top-[-15px]">
          <img src="./map.png" alt="Map" />
        </button>
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-emerald-400 h-[80px] flex justify-around items-center">
        <button className="mr-[200px] w-[30px] h-[30px]">
          <img src="./search.png" alt="Search" />
        </button>
       
        <button className="w-[30px] h-[30px]">
          <img src="./bookmark.png" alt="Bookmark" />
        </button>
      </footer>
    </div>
  );
};

export default App;
