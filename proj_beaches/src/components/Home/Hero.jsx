import React from "react";
import { Umbrella, Search } from "lucide-react";
function Hero() {
  return (
    <>
      <main className="h-[60vh] flex items-center justify-center  w-full transition-colors bg-gradient-to-br from-sky-400 via-cyan-300 to-blue-500 duration-1000 relative overflow-hidden">
        <div className="text-center flex flex-col items-center justify-center z-10 animate-fadeIn">
          <h2
            className="
                      text-5xl md:text-7xl lg:text-8xl xl:text-9xl
                      font-extrabold
                      text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
                      mb-4
                      drop-shadow-lg
                      tracking-wide
                      animate-pulse
                      hover:scale-105 transition-transform duration-300
                      py-2
                      border-t-4 border-b-4 border-yellow-400
                      rounded-lg
                    "
          >
            S H O R E S
          </h2>
          <p className="text-xl w-3/4 md:text-2xl text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
            Explore the world of Beaches and find your perfect getaway.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out flex items-center hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={() => (window.location.href = "/search")}
            >
              <Umbrella className="mr-2" />
              Explore Beaches
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 ease-in-out flex items-center hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={() => (window.location.href = "/events")}
            >
              <Search className="mr-2" />
              Find Activities
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Hero;
