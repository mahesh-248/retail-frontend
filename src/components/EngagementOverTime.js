import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import '../App.css'

const EngagementOverTime = () => {
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2018');

  useEffect(() => {
    // Fetch the engagement over time data from the backend
    fetch(`https://retialdb-backend.azurewebsites.net/dashboard/engagement_over_time?year=${selectedYear}`)
      .then((response) => response.json())
      .then((data) => {
        setYearlyData(data.yearlyData); // Data for pie chart (yearly units)
        setMonthlyData(data.monthlyData); // Data for bar chart (monthly units)
        setAvailableYears(data.availableYears); // Available years for the dropdown
      })
      .catch((error) => console.error("Error fetching engagement data:", error));
  }, [selectedYear]);

  // Pie chart data for yearly units
  const pieChartData = {
    labels: yearlyData.map((item) => item.year),
    datasets: [
      {
        label: 'Total Units per Year',
        data: yearlyData.map((item) => item.total_units),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF7F50'],
        hoverOffset: 4,
      },
    ],
  };

  // Bar chart data for monthly units (for selected year)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const barChartData = {
    labels: monthlyData.map((item) => monthNames[item.month - 1]), // e.g., 'Month 1', 'Month 2', etc.
    datasets: [
      {
        label: `Units Sold in ${selectedYear}`,
        data: monthlyData.map((item) => item.total_units),
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  // Handle year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className='engagement-over-time-container'>
      {/* <h2>Engagement Over Time</h2> */}
      <div className="pie-chart-container">
        <h3>Total Units per Year</h3>
        <Pie data={pieChartData} />
      </div>

      <div className="year-selection">
        <label>Select Year: </label>
        <select value={selectedYear} onChange={handleYearChange}>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="bar-chart-container">
        <h3>Monthly Units in {selectedYear}</h3>
        <Bar data={barChartData} options={{ responsive: true }} />
      </div>
      </div>
  );
};

export default EngagementOverTime;
