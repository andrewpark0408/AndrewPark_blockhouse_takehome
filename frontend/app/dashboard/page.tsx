"use client";
import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function Dashboard() {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Specific colors for pie chart slices
  const PIE_COLORS = ["#FF0000", "#0000FF", "#FFFF00"]; // Red, Blue, Yellow

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Candlestick Chart Data
        const candlestickResponse = await axios.get('http://localhost:8000/api/candlestick-data/');
        setCandlestickData(candlestickResponse.data?.data || []); // Fallback to empty array if data is undefined

        // Fetch Line Chart Data
        const lineResponse = await axios.get('http://localhost:8000/api/line-chart-data/');
        const transformedLineData = (lineResponse.data?.labels || []).map((label: string, index: number) => ({
          labels: label,
          data: lineResponse.data?.data?.[index], // Make sure the data exists
        }));
        setLineChartData(transformedLineData);

        // Fetch Bar Chart Data
        const barResponse = await axios.get('http://localhost:8000/api/bar-chart-data/');
        const transformedBarData = (barResponse.data?.labels || []).map((label: string, index: number) => ({
          labels: label,
          data: barResponse.data?.data?.[index], // Make sure the data exists
        }));
        setBarChartData(transformedBarData);

        // Fetch Pie Chart Data
        const pieResponse = await axios.get('http://localhost:8000/api/pie-chart-data/');
        const transformedPieData = (pieResponse.data?.labels || []).map((label: string, index: number) => ({
          labels: label,
          data: pieResponse.data?.data?.[index], // Make sure the data exists
        }));
        setPieChartData(transformedPieData);

        setLoading(false); // Data fetching is complete, stop loading
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false); // Even if there's an error, stop loading
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* Added data-testid="loading-spinner" */}
        <div data-testid="loading-spinner" className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Loading charts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Interactive Dashboard</h1>

        {/* Chart Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 justify-items-center">

          {/* Candlestick Chart */}
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl h-96">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Candlestick Chart</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={candlestickData} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="open" stroke="#8884d8" /> {/* Purple */}
                <Line type="monotone" dataKey="close" stroke="#82ca9d" /> {/* Green */}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl h-96">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Line Chart</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <XAxis dataKey="labels" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="data" stroke="#FF8042" /> {/* Orange */}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl h-96">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Bar Chart</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <XAxis dataKey="labels" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="data" fill="#00C49F" /> {/* Green */}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl h-96">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Pie Chart</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} dataKey="data" nameKey="labels" cx="50%" cy="50%" outerRadius={100} label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}
