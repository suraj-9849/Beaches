import React, { useState, useEffect } from 'react';
import beachData from './locations.json';

const BeachDivs = () => {
  
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
    <>
      <div className="flex-1 overflow-y-auto mt-[200px]">
        <ul className="flex flex-wrap justify-center gap-4 p-4">
          {beaches.map((beach, index) => (
            <li key={index} className="md: min-w-full bg-white border border-black rounded-xl flex flex-col justify-between p-4">
              <div className="min-h-40 bg-white border border-black rounded-xl flex items-center justify-center">
                Beach photo
              </div>
              <div className="w-full flex justify-between items-center mt-2">
                <div className="text-left">
                  <p className="font-semibold">{beach.name}</p>
                  <p className="text-gray-600">{beach.location}</p>
                </div>
                <button className="w-[30px] h-[30px]">
                  <img src="../public/bookmark.png" alt="Bookmark" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BeachDivs
