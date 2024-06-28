import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Microsoft', marketCap: 3.1, divYield: 0.7, avgReturn: 28.3 },
  { name: 'Apple', marketCap: 3.0, divYield: 0.5, avgReturn: 25.3 },
  { name: 'Nvidia', marketCap: 3.0, divYield: 0.0, avgReturn: 74.8 },
  { name: 'Alphabet', marketCap: 2.2, divYield: 0.5, avgReturn: 20.1 },
  { name: 'Meta', marketCap: 1.3, divYield: 0.4, avgReturn: 22.9 },
  { name: 'TSMC', marketCap: 0.724, divYield: 1.5, avgReturn: 25.8 },
  { name: 'Broadcom', marketCap: 0.649, divYield: 1.5, avgReturn: 38.1 },
];

export const NewChart = () => {
  return (
    <div className="flex flex-col space-y-8">
      <h2 className="text-2xl font-bold text-center">Top Technology Stocks (June 2024)</h2>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="marketCap" fill="#8884d8" name="Market Cap (Trillion $)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="divYield" fill="#82ca9d" name="Dividend Yield (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgReturn" fill="#ffc658" name="10-Year Avg. Annualized Return (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

