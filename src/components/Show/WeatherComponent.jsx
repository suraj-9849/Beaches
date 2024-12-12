import React, { useEffect, useState } from 'react';
import {
  Sun,
  Droplet,
  Wind,
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Umbrella,
  ShieldCheck,
  Waves,
  AudioWaveform,
  Gauge
} from 'lucide-react';
import Descript from './Descript';
import CheckTsunami from './CheckTsunami';

const convertTemperature = (temp, toFahrenheit) => {
  return toFahrenheit ? (temp * 9) / 5 + 32 : temp;
};

const WeatherIcon = ({ weatherCode }) => {
  const icons = {
    0: <Sun className="w-12 h-12 text-yellow-400" />,
    1: <CloudRain className="w-12 h-12 text-gray-400" />,
    2: <CloudRain className="w-12 h-12 text-gray-400" />,
    3: <CloudRain className="w-12 h-12 text-gray-400" />,
    4: <Umbrella className="w-12 h-12 text-blue-400" />
  };
  return icons[weatherCode] || <CloudRain className="w-12 h-12 text-blue-400" />;
};

const WeatherCard = ({ icon, title, value, unit }) => (
  <div className="bg-white bg-opacity-10 p-6 rounded-2xl flex items-center justify-between backdrop-blur-md shadow-lg transition-all duration-300 hover:shadow-2xl hover:bg-opacity-20">
    <div className="flex items-center">
      {icon}
      <div className="ml-4">
        <p className="text-lg opacity-80">{title}</p>
        <p className="text-4xl font-bold">
          {value} {unit}
        </p>
      </div>
    </div>
  </div>
);

const WeatherComponent = ({
  lat,
  long,
  weatherData,
  setWeatherData,
  swellSurge,
  highWave,
  currentSpeed,
  forecastData,
  setForecastData
}) => {
  const [tempUnit, setTempUnit] = useState('C');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const fetchWeatherData = async () => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,rain,showers,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_direction_80m,wind_gusts_10m,temperature_80m`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();

      const selectedDateString = selectedDate.toISOString().split('T')[0];
      const hour = selectedDate.getHours();
      const index = data.hourly.time.findIndex(
        (time) => time.startsWith(selectedDateString) && new Date(time).getHours() === hour
      );

      if (index !== -1) {
        const tempCelsius = data.hourly.temperature_2m[index];
        const waterTempCelsius = data.hourly.temperature_80m[index];
        const windSpeedKmh = data.hourly.wind_speed_10m[index];
        const windSpeedMs = windSpeedKmh / 3.6;

        const humidity = data.hourly.relative_humidity_2m[index];
        const weatherCode = data.hourly.weather_code[index];

        setWeatherData({
          airTemperature: convertTemperature(tempCelsius, tempUnit === 'F'),
          waterTemperature: convertTemperature(waterTempCelsius, tempUnit === 'F'),
          windSpeed: windSpeedMs,
          humidity,
          weatherCode
        });

        const forecastData = data.hourly.time.slice(index, index + 24).map((time, i) => ({
          time: new Date(time).getHours(),
          temperature: convertTemperature(data.hourly.temperature_2m[index + i], tempUnit === 'F'),
          humidity: data.hourly.relative_humidity_2m[index + i],
          windSpeed: data.hourly.wind_speed_10m[index + i] / 3.6
        }));
        setForecastData(forecastData);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
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
  const formula =
    1 -
    ((0.25 * swellSurge) / 3 +
      (0.25 * highWave) / 5 +
      (0.25 * currentSpeed) / 2 +
      (0.25 * weatherData.windSpeed.toFixed(1)) / 25);
  const safeScore = (formula * 10).toFixed(2);

  return (
    <>
      <h2 className="text-4xl font-bold mb-8 text-center">Weather Dashboard</h2>

      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => handleDateChange('prev')}
          className="hover:text-yellow-400 transition-all duration-300"
        >
          <ChevronLeft size={32} />
        </button>
        <h3 className="text-2xl font-semibold">
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </h3>
        <button
          onClick={() => handleDateChange('next')}
          className="hover:text-yellow-400 transition-all duration-300"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeatherCard
          icon={<ShieldCheck className="w-12 h-12 text-teal-400" />}
          title="Safety Score"
          value={safeScore}
          unit={`/10`}
        />
        <WeatherCard
          icon={<WeatherIcon weatherCode={weatherData.weatherCode} />}
          title="Air Temperature"
          value={weatherData.airTemperature.toFixed(1)}
          unit={`°${tempUnit}`}
        />
        <WeatherCard
          icon={<Droplet className="w-12 h-12 text-blue-400" />}
          title="Water Temperature"
          value={weatherData.waterTemperature.toFixed(1)}
          unit={`°${tempUnit}`}
        />
        <WeatherCard
          icon={<Wind className="w-12 h-12 text-green-400" />}
          title="Wind Speed"
          value={weatherData.windSpeed.toFixed(1)}
          unit="m/s"
        />
      </div>

      <button
        onClick={toggleTempUnit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
      >
        Switch to °{tempUnit === 'C' ? 'F' : 'C'}
      </button>
    </>
  );
};

export default WeatherComponent;
