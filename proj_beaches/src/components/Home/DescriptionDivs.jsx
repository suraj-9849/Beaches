import React from 'react';
import { Waves, Search, Map } from 'lucide-react';

const contentData = {
  Events: {
    title: "Beach Cleanup Events",
    description: "Join our waves of change! Participate in beach cleanups with local NGOs.",
    buttonName: 'Dive In',
    url: '/events',
    icon: Waves,
    bgColor: 'from-blue-400 to-teal-300'
  },
  Search: {
    title: "Find Your Perfect Beach",
    description: "Discover hidden coastal gems and plan your next seaside adventure.",
    buttonName: 'Explore Shores',
    url: '/search',
    icon: Search,
    bgColor: 'from-yellow-300 to-orange-300'
  },
  MapView: {
    title: "Coastal Map",
    description: "Navigate our interactive map to find beaches and cleanup locations.",
    buttonName: 'Chart Your Course',
    url: '/map',
    icon: Map,
    bgColor: 'from-green-400 to-blue-500'
  }
};

function DescriptionDivs({ data }) {
  const content = contentData[data] || {};
  const Icon = content.icon;

  return (
    <div className='flex items-center flex-col justify-center mt-10' >
        <div className={`max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-br ${content.bgColor} flex flex-col items-center justify-center `}>
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <Icon className="h-10 w-10 text-white mr-3" />
          <h2 className="text-2xl font-bold text-white">{content.title}</h2>
        </div>
        <p className="text-white text-base mb-6">{content.description}</p>
        <div className="flex justify-center">
          <a 
            href={content.url} 
            className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <span>{content.buttonName}</span>
            <Icon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="w-full h-16 bg-white bg-opacity-30 flex items-center justify-center">
        <svg className="w-full h-8 text-white opacity-50" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
    </div>
  );
}

export default DescriptionDivs;