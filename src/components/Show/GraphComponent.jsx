import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GraphComponent = ({ forecastData }) => {
  const memoizedForecastChart = useMemo(
    () => (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData}>
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis yAxisId="left" stroke="#ffd700" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}
            labelStyle={{ color: '#333' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#ffd700"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    ),
    [forecastData]
  );

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-2xl backdrop-blur-md shadow-lg mb-8">
      <h4 className="text-2xl font-semibold mb-4">24-Hour Forecast</h4>
      {memoizedForecastChart}
    </div>
  );
};

export default GraphComponent;
