"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Rechart = () => {
  const bestPerformingStocks = [
    { name: 'SMCI', value: 176.0 },
    { name: 'VST', value: 157.2 },
    { name: 'NVDA', value: 121.4 },
    { name: 'CEG', value: 86.0 },
    { name: 'DECK', value: 63.7 },
    { name: 'GE', value: 61.9 },
    { name: 'FSLR', value: 57.7 },
    { name: 'NRG', value: 56.7 },
    { name: 'HWM', value: 56.4 },
    { name: 'MU', value: 46.5 },
  ];

  const widelyHeldStocks = [
    { name: 'AAPL', value: -0.1 },
    { name: 'MSFT', value: 10.5 },
    { name: 'GOOGL', value: 23.5 },
    { name: 'AMZN', value: 16.1 },
    { name: 'TSLA', value: -28.3 },
    { name: 'NVDA', value: 121.4 },
  ];

  const topValueStocks = [
    { name: 'BASFY', forwardPE: 14.2, pegRatio: 0.99, dividendYield: 5.2 },
    { name: 'F', forwardPE: 6.0, pegRatio: 0.78, dividendYield: 5.0 },
    { name: 'KBH', forwardPE: 8.4, pegRatio: 0.7, dividendYield: 1.4 },
    { name: 'PVH', forwardPE: 10.0, pegRatio: 0.9, dividendYield: 0.1 },
    { name: 'UHS', forwardPE: 13.6, pegRatio: 0.9, dividendYield: 0.4 },
  ];

  const topDividendStocks = [
    { name: 'KHC', value: 5 },
    { name: 'O', value: 6 },
    { name: 'DOC', value: 6 },
    { name: 'USB', value: 5 },
    { name: 'WEC', value: 4.25 },
  ];

  const topAnalystRecommendations = [
    { name: 'ARE', value: 1.17 },
    { name: 'ZTS', value: 1.18 },
    { name: 'AMZN', value: 1.22 },
    { name: 'UBER', value: 1.25 },
    { name: 'MSFT', value: 1.25 },
    { name: 'LVS', value: 1.29 },
    { name: 'DAL', value: 1.29 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Top Stocks 2024 Report</h1>

      <p className="text-lg">
        This report provides an overview of the top-performing stocks in 2024, based on various sources and criteria.
        We'll examine the best-performing stocks, widely held stocks, top-ranked value stocks, top dividend stocks,
        and stocks with the highest analyst recommendations.
      </p>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Best-Performing Stocks in the S&P 500 Index (June 2024)</h2>
        <p className="mb-4">
          The chart below shows the top 10 best-performing stocks in the S&P 500 index as of June 2024.
          Super Micro Computer (SMCI) leads the pack with an impressive 176% gain, followed by Vistra (VST) at 157.2%
          and Nvidia (NVDA) at 121.4%. These stocks have significantly outperformed the broader market,
          showcasing exceptional growth in their respective sectors.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bestPerformingStocks}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Performance 2024 (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Widely Held Stocks in the S&P 500 Index (June 2024)</h2>
        <p className="mb-4">
          This chart displays the performance of widely held stocks in the S&P 500 index.
          Notably, Nvidia (NVDA) stands out with a 121.4% gain, while other tech giants like Apple (AAPL),
          Microsoft (MSFT), Alphabet (GOOGL), and Amazon (AMZN) show more modest gains.
          Tesla (TSLA) has experienced a significant decline of 28.3% during this period.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={widelyHeldStocks}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" name="Performance 2024 (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Top-Ranked Classic Value Stocks 2024</h2>
        <p className="mb-4">
          This chart presents the top-ranked classic value stocks for 2024, comparing their Forward P/E ratios,
          PEG ratios, and dividend yields. BASF SE (BASFY) offers a high dividend yield of 5.2%, while Ford Motor Company (F)
          has the lowest Forward P/E ratio at 6.0. KB Home (KBH) shows a balanced profile with a low PEG ratio of 0.7.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topValueStocks}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="forwardPE" fill="#8884d8" name="Forward P/E" />
            <Bar dataKey="pegRatio" fill="#82ca9d" name="PEG Ratio" />
            <Bar dataKey="dividendYield" fill="#ffc658" name="Dividend Yield (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Top Dividend Stocks 2024</h2>
        <p className="mb-4">
          This pie chart illustrates the dividend yields of the top dividend stocks for 2024.
          Realty Income Trust (O) and Healthpeak (DOC) lead with 6% dividend yields each,
          followed by Kraft Heinz (KHC) and U.S. Bank (USB) at 5% each. WEC Energy (WEC) rounds out the top five
          with a 4.25% dividend yield. These stocks offer attractive income potential for dividend-focused investors.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topDividendStocks}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {topDividendStocks.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Top Stocks by Analyst Recommendation</h2>
        <p className="mb-4">
          This chart shows the top stocks based on analyst recommendations, with lower scores indicating stronger buy recommendations.
          Alexandria Real Estate Equities (ARE) has the strongest recommendation with a score of 1.17,
          closely followed by Zoetis (ZTS) at 1.18 and Amazon (AMZN) at 1.22.
          These stocks are highly favored by analysts, suggesting strong potential for future performance.
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topAnalystRecommendations}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Analyst Recommendation Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rechart;
