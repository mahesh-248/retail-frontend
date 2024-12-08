import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './BasketAnalysis.css';
const BasketAnalysis = () => {
  const [metrics, setMetrics] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [actuals, setActuals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchBasketAnalysis();
  }, []);


  const fetchBasketAnalysis = () => {
    fetch('https://retialdb-backend.azurewebsites.net/dashboard/basket_analysis')
      .then((response) => response.json())
      .then((data) => {
        setMetrics({
          r2_score: data.r2_score,
          mse: data.mse,
        });
        setPredictions(data.predictions);
        setActuals(data.actuals);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching basket analysis data:', error));
  };

  const chartData = {
    labels: Array.from({ length: predictions.length }, (_, i) => `Transaction ${i + 1}`),
    datasets: [
      {
        label: 'Predicted Spend',
        data: predictions,
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: 'Actual Spend',
        data: actuals,
        fill: false,
        borderColor: '#FFA500',
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Ensures chart fills the container
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 45, // Rotate labels for better readability
          minRotation: 45,
        },
        grid: {
          display: false,  // Remove grid lines for cleaner look
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,  // Display grid lines for the y-axis
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Spend: $${tooltipItem.raw.toFixed(2)}`;  // Display spend value in tooltip
          },
        },
      },
    },
  };

  const handleHomeRedirect = () => {
    navigate('/');  // Redirect to the home/dashboard page
  };

  return (
    <div className="basket-analysis-container">
      <h2 className="section-title">Basket Analysis - Predicting Total Spend</h2>


      <div className="metrics-container">
        <div className="metric">
          <strong>R² Score:</strong> {metrics.r2_score || "calculating"}
        </div>
        <div className="metric">
          <strong>MSE:</strong> {metrics.mse || "calculating"}
        </div>
      </div>

      <div className="chart-container">
        {loading? "loading....." : (<Line data={chartData} />)}
      </div>

      <div className="note">
        <p><strong>Note:</strong> The above chart shows the predicted vs. actual spend for the transactions in the test set.</p>
      </div>

      <div className="home-btn-container">
        <button onClick={handleHomeRedirect} className="home-btn">Home</button>
      </div>
    </div>
  );
};

export default BasketAnalysis;

