"use client"

import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);


export const Chart = () => {
  const marketGrowthData = {
    labels: ['2022', '2023', '2024', '2025', '2029', '2032'],
    datasets: [
      {
        label: 'Market Size (USD billion)',
        data: [3.21, 8.03, 34.80, 7.09, 110.74, 117.78],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const marketShareData = {
    labels: ['Tata Motors', 'MG Motor India', 'Mahindra & Mahindra Ltd', 'Hero Electric', 'Ather Energy', 'Others'],
    datasets: [
      {
        data: [72, 10.8, 9, 3.5, 2.5, 2.2],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'EV Market Growth in India',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Market Size (USD billion)',
        },
      },
    },
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'EV Market Share in India',
      },
    },
  };
  return (
    <div>
      <div style={{ width: '40%', margin: 'auto' }}>
        <Line data={marketGrowthData} options={lineOptions} />
      </div>
      <div style={{ width: '40%', margin: 'auto' }}>
        <Pie data={marketShareData} options={pieOptions} />
      </div>
    </div>
  );
};
