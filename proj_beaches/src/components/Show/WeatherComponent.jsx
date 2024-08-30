import React, { useEffect, useState } from 'react';
import { Sun, Droplet, Wind, Waves, ChevronLeft, ChevronRight, Thermometer, CloudRain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Descript from './Descript';
const convertTemperature = (temp, toFahrenheit) => {
  return toFahrenheit ? (temp * 9/5) + 32 : temp;
};

const WeatherIcon = ({ weatherCode }) => {
  switch(weatherCode) {
    case 0: return <Sun className="w-12 h-12 text-yellow-400" />;
    case 1:
    case 2:
    case 3: return <CloudRain className="w-12 h-12 text-gray-400" />;
    default: return <CloudRain className="w-12 h-12 text-blue-400" />;
  }
};

const WeatherComponent = ({ lat, long }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState('C');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,rain,showers,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_direction_80m,wind_gusts_10m,temperature_80m`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        const selectedDateString = selectedDate.toISOString().split('T')[0];
        const hour = selectedDate.getHours();
        const index = data.hourly.time.findIndex((time) => time.startsWith(selectedDateString) && new Date(time).getHours() === hour);

        if (index !== -1) {
          const tempCelsius = data.hourly.temperature_2m[index];
          const waterTempCelsius = data.hourly.temperature_80m[index];
          const windSpeedKmh = data.hourly.wind_speed_10m[index];
          const waveHeight = (windSpeedKmh ** 2) / 9.81; 
          const humidity = data.hourly.relative_humidity_2m[index];
          const weatherCode = data.hourly.weather_code[index];

          setWeatherData({
            airTemperature: convertTemperature(tempCelsius, tempUnit === 'F'),
            waterTemperature: convertTemperature(waterTempCelsius, tempUnit === 'F'),
            windSpeed: windSpeedKmh / 3.6,
            waveHeight,
            humidity,
            weatherCode
          });

          // Prepare forecast data for the chart
          const forecastData = data.hourly.time.slice(index, index + 24).map((time, i) => ({
            time: new Date(time).getHours(),
            temperature: convertTemperature(data.hourly.temperature_2m[index + i], tempUnit === 'F'),
          }));
          setForecastData(forecastData);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [selectedDate, tempUnit, lat, long]);

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'C' ? 'F' : 'C');
  };

  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  if (!weatherData) {
    return <div className="text-center text-lg text-white">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl backdrop-blur-lg border border-white border-opacity-20">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Weather Dashboard</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => handleDateChange('prev')} className="text-white hover:text-yellow-400 transition-all duration-300">
            <ChevronLeft size={32} />
          </button>
          <h3 className="text-2xl font-semibold text-white">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <button onClick={() => handleDateChange('next')} className="text-white hover:text-yellow-400 transition-all duration-300">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-20">
          <div className="flex items-center">
            <WeatherIcon weatherCode={weatherData.weatherCode} />
            <div className="ml-4">
              <p className="text-lg text-white opacity-80">Air Temperature</p>
              <p className="text-4xl font-bold text-white">{weatherData.airTemperature.toFixed(1)}°{tempUnit}</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-20">
          <div className="flex items-center">
            <Droplet className="w-12 h-12 text-blue-400" />
            <div className="ml-4">
              <p className="text-lg text-white opacity-80">Water Temperature</p>
              <p className="text-4xl font-bold text-white">{weatherData.waterTemperature.toFixed(1)}°{tempUnit}</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-20">
          <div className="flex items-center">
            <Wind className="w-12 h-12 text-green-400" />
            <div className="ml-4">
              <p className="text-lg text-white opacity-80">Wind Speed</p>
              <p className="text-4xl font-bold text-white">{weatherData.windSpeed.toFixed(1)} m/s</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-20">
          <div className="flex items-center">
            <Waves className="w-12 h-12 text-indigo-400" />
            <div className="ml-4">
              <p className="text-lg text-white opacity-80">Wave Height</p>
              <p className="text-4xl font-bold text-white">{weatherData.waveHeight.toFixed(2)} m</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-md shadow-lg mb-8">
        <h4 className="text-2xl font-semibold text-white mb-4">24-Hour Forecast</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={forecastData}>
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}
              labelStyle={{ color: '#333' }}
            />
            <Line type="monotone" dataKey="temperature" stroke="#ffd700" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-md shadow-lg mb-8">
        <h4 className="text-md font-semibold text-white mb-4"><Descript data={JSON.stringify(weatherData)} /></h4>
      </div>

      <button
        onClick={toggleTempUnit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
      >
        Switch to °{tempUnit === 'C' ? 'F' : 'C'}
      </button>
    </div>
  );
};

export default WeatherComponent;