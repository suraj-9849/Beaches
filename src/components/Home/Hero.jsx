import React from 'react';
import { Umbrella, Search, Waves } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] lg:h-[80vh] bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-white mb-6 animate-fade-in-up">
          SHORES
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-white mb-8 animate-fade-in-up animation-delay-300">
          Discover Paradise at Your Fingertips
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-600">
          <button
            className="group bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out flex items-center hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={() => (window.location.href = '/search')}
          >
            <Umbrella className="mr-2 group-hover:animate-bounce" />
            <span className="text-sm sm:text-base">Explore Beaches</span>
          </button>
          <button
            className="group bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out flex items-center hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={() => (window.location.href = '/events')}
          >
            <Search className="mr-2 group-hover:animate-pulse" />
            <span className="text-sm sm:text-base">Find Activities</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
