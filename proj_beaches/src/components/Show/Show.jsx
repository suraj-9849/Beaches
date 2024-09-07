import React from 'react';
import { useLocation } from 'react-router-dom';
import CarouselWithDetails from './Carousel.jsx';
import WeatherComponent from './WeatherComponent.jsx';
import Alerts from './Alerts.jsx'; // Import the Alerts component
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import ShowReviews from './ShowReviews.jsx';
import WaveAlerts from './WaveAlerts.jsx';
import CheckTsunami from './CheckTsunami.jsx';
const Show = () => {
  const location = useLocation();
  const { state } = location;
  const { location: beachLocation, lat, long, name, id, district } = state || {};
  console.log('District value:', district);


  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">

        <div className="relative z-10 container mx-auto px-4 py-12 mt-10 pb-32">
          {/* Beach Carousel Section */}
          <section className="mb-20">
            <CarouselWithDetails beachLocation={beachLocation} lat={lat} long={long} name={name} beachId={id} district={district} />
          </section>

          {/* Weather Component Section */}
          <section>
            <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-wide text-shadow-lg">
              Current Weather
            </h2>
            <WeatherComponent beachLocation={beachLocation} lat={lat} long={long} name={name} id={id} district={district} />
          </section>

          {/* Alerts Section */}
          <section>
            <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-wide text-shadow-lg">

            </h2>
            <Alerts district={district} />
            <WaveAlerts district={district} />
            <CheckTsunami lat={lat} lon={long} />
          </section>
        </div>

        {/* SVG Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <ShowReviews beachId={id} />
        <br />
        <br />
      </main>
      <br />
      <Footer />
    </div>
  );
};

export default Show;
