import React from "react";
import { Umbrella, Search } from "lucide-react";
function Hero() {
  return (
    <main className="pt-60 pb-20 flex flex-col transition-colors bg-gradient-to-br from-sky-400 via-cyan-300 to-blue-500 duration-1000 relative overflow-hidden">
      <div className="text-center z-10 mb-8 animate-fadeIn">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-wide">
          Beaches App
        </h2>
        <p className="text-xl w-3/4 md:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
          Explore the world of Beaches and find your perfect getaway.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out flex items-center hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
            <Umbrella className="mr-2" />
            Explore Beaches
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out flex items-center hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
            <Search className="mr-2" />
            Find Activities
          </button>
        </div>
      </div>
    </main>
  );
}

export default Hero;
