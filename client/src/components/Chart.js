import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const Chart = ({ activeCovid }) => {
  const sortedData = activeCovid.sort((a, b) => a.date - b.date);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={1080}
        height={300}
        data={sortedData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="positiveIncrease" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
