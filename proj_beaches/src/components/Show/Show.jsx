import React from 'react';
import { useLocation } from 'react-router-dom';
import CarouselWithDetails from './carousel.jsx';
import WeatherComponent from './WeatherComponent.jsx';

const Show = () => {
  const location = useLocation();
  const { state } = location;
  const { location: beachLocation, lat, long, name } = state || {};
  console.log("hello");
  return (
    <div>
      <CarouselWithDetails {...{beachLocation, lat, long, name }}/>
      <br />
      <WeatherComponent {...{beachLocation, lat, long, name }}/>
    </div>
  );
};

export default Show;
