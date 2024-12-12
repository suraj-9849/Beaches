import React, { useState, useEffect } from 'react';
import axios from 'axios';

const extractCurrentSpeed = (message) => {
  const match = message.match(
    /Surface current speeds in the range of (\d+\.\d+)\s*-\s*(\d+\.\d+)\s*m\/sec/i
  );
  if (match) {
    const minSpeed = parseFloat(match[1]);
    const maxSpeed = parseFloat(match[2]);
    return ((minSpeed + maxSpeed) / 2).toFixed(1);
  }
  console.warn('Current speed regex did not match:', message);
  return 'N/A';
};

const Alerts = ({ district, currentSpeed, setCurrentSpeed }) => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        if (!district) {
          setError('District is not provided');
          return;
        }

        const response = await axios.get(
          'https://samudra.incois.gov.in/incoismobileappdata/rest/incois/currentslatestdata'
        );
        const data = response.data;
        const parsedAlerts = JSON.parse(data.CurrentsJson);

        const lowerCaseDistrict = typeof district === 'string' ? district.toLowerCase().trim() : '';

        const filteredAlerts = parsedAlerts.filter((alert) => {
          const alertDistrict = alert.District ? alert.District.toLowerCase().trim() : '';

          return alertDistrict === lowerCaseDistrict;
        });

        setAlerts(filteredAlerts);
      } catch (error) {
        setError('Failed to fetch alerts');
        console.error(error);
      }
    };

    fetchAlerts();
  }, [district]);

  useEffect(() => {
    if (alerts.length > 0) {
      const firstAlert = alerts[0];
      const speed = extractCurrentSpeed(firstAlert.Message);
      setCurrentSpeed(speed);
    }
  }, [alerts, setCurrentSpeed]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-black rounded-3xl shadow-2xl border border-white border-opacity-20">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {alerts.length === 0 ? (
        <p className="text-center">No alerts found for this district.</p>
      ) : (
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Ocean Current Alerts</h3>
          {alerts.map((alert) => (
            <div key={alert.OBJECTID} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div
                  className={`w-6 h-6 rounded-full`}
                  style={{ backgroundColor: alert.Color }}
                ></div>
                <div className="ml-4">
                  <strong className="text-lg">{alert.Alert}</strong>
                  <p className="text-sm">Issue Date: {alert['Issue Date']}</p>
                </div>
              </div>
              <p className="text-md font-bold mt-2">Ocean Current Speed: {currentSpeed} m/s</p>
              <p className="text-sm mt-2">{alert.Message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
