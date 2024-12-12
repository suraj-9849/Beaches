import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertCircle, ShieldCheck, Info, Shield } from 'lucide-react';

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const CheckTsunami = ({ lat, lon, tsunamiRating, setTsunamiRating }) => {
  const [error, setError] = useState(null);
  const [nearestDistance, setNearestDistance] = useState(null);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const fetchTsunamiData = async () => {
      try {
        const response = await axios.get(
          'https://thingproxy.freeboard.io/fetch/https://tsunami.incois.gov.in/itews/DSSProducts/OPR/past90days.json'
        );
        const data = response.data;
        const tsunamis = data.datasets || [];
        const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
        const currentTime = Date.now();
        let minDistance = Infinity;

        tsunamis.forEach((event) => {
          const eventDate = event.ORIGINTIME;
          if (!eventDate) return;
          const eventTime = new Date(eventDate).getTime();
          const tsunamiLat = parseFloat(event.LATITUDE);
          const tsunamiLon = parseFloat(event.LONGITUDE);
          const distance = haversineDistance(lat, lon, tsunamiLat, tsunamiLon);

          if (distance < minDistance && currentTime - eventTime <= sevenDaysInMillis) {
            minDistance = distance;
          }
        });

        setNearestDistance(minDistance);
        if (minDistance < 10) {
          setStatus('Unsafe: Tsunami threat detected within 10 km.');
          setTsunamiRating(4);
        } else if (minDistance < 20) {
          setStatus('Moderate: Tsunami detected within 20 km.');
          setTsunamiRating(3);
        } else if (minDistance < 30) {
          setStatus('Safe: Tsunami detected within 30 km.');
          setTsunamiRating(2);
        } else if (minDistance > 100) {
          setStatus('Highly Safe: No tsunami detected within 100 km.');
          setTsunamiRating(1);
        }
      } catch (err) {
        setError('Failed to fetch tsunami data');
        console.error('Error fetching the tsunami data:', err);
      }
    };

    fetchTsunamiData();
  }, [lat, lon]);

  const getAlertConfig = () => {
    if (status.includes('Unsafe')) {
      return {
        bgColor: 'bg-red-600',
        icon: <AlertCircle className="w-6 h-6 text-white" />,
        textColor: 'text-white'
      };
    } else if (status.includes('Moderate')) {
      return {
        bgColor: 'bg-yellow-500',
        icon: <Info className="w-6 h-6 text-white" />,
        textColor: 'text-gray-800'
      };
    } else if (status.includes('Safe')) {
      return {
        bgColor: 'bg-green-500',
        icon: <ShieldCheck className="w-6 h-6 text-white" />,
        textColor: 'text-white'
      };
    } else if (status.includes('Highly Safe')) {
      return {
        bgColor: 'bg-blue-500',
        icon: <Shield className="w-6 h-6 text-white" />,
        textColor: 'text-white'
      };
    } else {
      return {
        bgColor: 'bg-gray-400',
        icon: <Info className="w-6 h-6 text-white" />,
        textColor: 'text-white'
      };
    }
  };

  const config = getAlertConfig();

  return (
    <motion.div
      className={`mt-11 p-3 rounded-md shadow-md ${config.bgColor} text-center flex items-center justify-center max-w-sm mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <div className="flex items-center space-x-2">
          {config.icon}
          <div>
            <h2 className={`text-lg font-semibold ${config.textColor}`}>{status}</h2>
            {nearestDistance && (
              <p className={`text-sm ${config.textColor}`}>
                Nearest tsunami distance: {nearestDistance.toFixed(2)} km
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CheckTsunami;
