import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'tailwindcss/tailwind.css';

const extractWaveData = (message) => {
  
    const highWaveMatch = message.match(/High waves?\s*in\s*the\s*range\s*of\s*([\d.]+)\s*-\s*([\d.]+)\s*m/i);
    const highWave = highWaveMatch ? ((parseFloat(highWaveMatch[1]) + parseFloat(highWaveMatch[2])) / 2).toFixed(1) : 'N/A';
  
    const swellSurgeMatch = message.match(/Swell waves? in the range of \d+\.?\d* - \d+\.?\d* sec period with (\d+\.?\d*) - (\d+\.?\d*) m height/i);
   
    const swellSurge = swellSurgeMatch ? parseFloat(swellSurgeMatch[1]) : 'N/A';
  
    return { highWave, swellSurge };
  };
  
  
  
  
const WaveAlerts = ({ district, onWaveDataUpdate }) => {
  const [highWaveAlerts, setHighWaveAlerts] = useState([]);
  const [swellSurgeAlerts, setSwellSurgeAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
      

        if (!district) {
          setError('District is not provided');
          return;
        }

        const response = await axios.get('https://sarat.incois.gov.in/incoismobileappdata/rest/incois/hwassalatestdata');
        const data = response.data;

        const highWaveAlerts = JSON.parse(data.HWAJson).filter(alert =>
          alert.District.toLowerCase() === district.toLowerCase()
        );
        setHighWaveAlerts(highWaveAlerts);

        const swellSurgeAlerts = JSON.parse(data.SSAJson).filter(alert =>
          alert.District.toLowerCase() === district.toLowerCase()
        );
        setSwellSurgeAlerts(swellSurgeAlerts);

      } catch (error) {
        setError('Failed to fetch alerts');
        console.error(error);
      }
    };

    fetchAlerts();
  }, [district, onWaveDataUpdate]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-black rounded-3xl shadow-2xl border border-white border-opacity-20">
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      {highWaveAlerts.length === 0 && swellSurgeAlerts.length === 0 ? (
        <p className="text-center">No alerts found for this district.</p>
      ) : (
        <div className="space-y-6">
          {highWaveAlerts.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">High Wave Alerts</h3>
              {highWaveAlerts.map(alert => {
                const { highWave, swellSurge } = extractWaveData(alert.Message);
                onWaveDataUpdate(highWave, swellSurge);

                return (
                  <div key={alert.OBJECTID} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className={`w-6 h-6 rounded-full`} style={{ backgroundColor: alert.Color }}></div>
                      <div className="ml-4">
                        <strong className="text-lg">{alert.Alert}</strong>
                        <p className="text-sm">Issue Date: {dayjs(alert['Issue Date'], 'DD-MM-YYYY').format('MMM DD, YYYY')}</p>
                      </div>
                    </div>
                    <p className="text-md font-bold mt-2">High Wave: {highWave} m</p>
                    <p className="text-sm mt-2">{alert.Message}</p>
                  </div>
                );
              })}
            </div>
          )}

          {swellSurgeAlerts.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Swell Surge Alerts</h3>
              {swellSurgeAlerts.map(alert => {
                const { highWave, swellSurge } = extractWaveData(alert.Message);
                onWaveDataUpdate(highWave, swellSurge);
                return (
                  <div key={alert.OBJECTID} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <div className={`w-6 h-6 rounded-full`} style={{ backgroundColor: alert.Color }}></div>
                      <div className="ml-4">
                        <strong className="text-lg">{alert.Alert}</strong>
                        <p className="text-sm">Issue Date: {dayjs(alert['Issue Date'], 'DD-MM-YYYY').format('MMM DD, YYYY')}</p>
                      </div>
                    </div>
                    <p className="text-md font-bold mt-2">Swell Surge: {swellSurge} m</p>
                    <p className="text-sm mt-2">{alert.Message}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WaveAlerts;