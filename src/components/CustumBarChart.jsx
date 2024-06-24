import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustumBarChart = ({ data, dataKey }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey={dataKey} fill="#0088FE" />
    </BarChart>
  </ResponsiveContainer>
);

export default CustumBarChart;
