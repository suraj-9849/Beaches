import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CarouselWithDetails from './Carousel.jsx';
import WeatherComponent from './WeatherComponent.jsx';
import Alerts from './Alerts.jsx'; 
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import ShowReviews from './ShowReviews.jsx';
import WaveAlerts from './WaveAlerts.jsx';
import GraphComponent from './GraphComponent'; 
import CheckTsunami from './CheckTsunami.jsx';
import Descript from './Descript.jsx';
const Show = () => {
  const location = useLocation();
  const { state } = location;
  const { location: beachLocation, lat, long, name, id, district } = state || {};

  
  const [tsunamiRating, setTsunamiRating] = useState(0);

  const [currentSpeed, setCurrentSpeed] = useState(0);

  const [highWave, setHighWave] = useState(0);
  const [swellSurge, setSwellSurge] = useState(0);
  const [weatherData, setWeatherData] = useState();
  const handleWaveDataUpdate = (highWave, swellSurge) => {
    if (highWave !== 'N/A') {
      setHighWave(highWave);
    }
    if (swellSurge !== 'N/A') {
      setSwellSurge(swellSurge);
    }
  };
  const [forecastData, setForecastData] = useState([]);

  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow relative overflow-hidden">

        <div className="relative z-10 container mx-auto px-4 py-12 mt-10 pb-32">
          {/* Beach Carousel Section */}
          <section className="mb-20">
            <CarouselWithDetails beachLocation={beachLocation} lat={lat} long={long} name={name} beachId={id} district={district} />
          </section>

          
          <div className="p-8 max-w-4xl mx-auto text-black rounded-3xl shadow-2xl  border border-white border-opacity-20">
            <WeatherComponent beachLocation={beachLocation} lat={lat} long={long} name={name} id={id} district={district} swellSurge={swellSurge} highWave={highWave} currentSpeed={currentSpeed} forecastData={forecastData} setForecastData={setForecastData} weatherData={weatherData} setWeatherData={setWeatherData}/>
            <CheckTsunami lat={lat} lon={long} tsunamiRating={tsunamiRating} setTsunamiRating={setTsunamiRating} />
            <section>
            <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-wide text-shadow-lg">

            </h2>
            <Alerts district={district} currentSpeed={currentSpeed} setCurrentSpeed={setCurrentSpeed} />
            <WaveAlerts district={district} onWaveDataUpdate={handleWaveDataUpdate}/>
          </section>
            <GraphComponent forecastData={forecastData} /> {/* Use the new Graph component */}
            <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-md mb-8">
              <div className="text-md font-semibold mb-4"><Descript data={JSON.stringify(weatherData)} /></div>
            </div>
          </div>
          {/* Alerts Section */}
          
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