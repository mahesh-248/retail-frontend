import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';  // Auto registers Chart.js components
import "../App.css"

const Demographics = () => {
  const [demographicsData, setDemographicsData] = useState([]);
  const [xAxisType, setXAxisType] = useState('age_range'); // Default X-axis is age_range

  useEffect(() => {
    // Fetch the demographics data from the backend with the selected group_by field
    fetch(`https://retialdb-backend.azurewebsites.net/dashboard/insights?group_by=${xAxisType}`)
      .then((response) => response.json())
      .then((data) => {
        setDemographicsData(data.demographics); // Assuming backend returns demographics data in the format we need
      })
      .catch((error) => console.error("Error fetching demographics data:", error));
  }, [xAxisType]); // Re-fetch data when the X-axis type changes

  // Prepare the chart data based on the selected X-axis type
  const chartData = {
    labels: demographicsData.map((item) => item.group_value),  // Get labels based on the X-axis type (age_range, children, income_range)
    datasets: [
      {
        label: `Engagement Score for ${xAxisType}`,
        data: demographicsData.map((item) => item.engagement_score),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 90, // Rotate the X-axis labels to make them more readable
          minRotation: 45,
        },
      },
    },
  };

  // Handle button click to change the X-axis data
  const handleXAxisChange = (newXAxis) => {
    setXAxisType(newXAxis);
  };

  return (
    <div className="demographics-container">
      {/* <h2 style={{textAlign:"left"}}>Demographics and Engagement</h2> */}
      {/* Buttons to toggle between age_range, children, and income_range */}
      <div className="button-group">
        <button onClick={() => handleXAxisChange('age_range')}>Age Range</button>
        <button onClick={() => handleXAxisChange('children')}>Children</button>
        <button onClick={() => handleXAxisChange('income_range')}>Income Range</button>
      </div>

      {/* Bar chart with dynamically changing X-axis */}
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Demographics;
