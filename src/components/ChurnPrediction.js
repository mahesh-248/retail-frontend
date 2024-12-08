import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import './ChurnPrediction.css';
import { useNavigate } from 'react-router-dom';


const ChurnPrediction = () => {
  const [churnData, setChurnData] = useState([]);
  const [categoryData, setCategoryData] = useState({
    department: 'All',
    commodity: 'All',
    brand_type: 'All',
    organic_flag: 'All',
  });

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChurnData();
  }, []);

  const fetchChurnData = () => {
    const { department, commodity, brand_type, organic_flag } = categoryData;
    fetch(`https://retialdb-backend.azurewebsites.net/churn_prediction?department=${department}&commodity=${commodity}&brand_type=${brand_type}&organic_flag=${organic_flag}`)
      .then((response) => response.json())
      .then((data) => {
        setChurnData(data);
        formatChartData(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching churn data:', error));
  };

  // Format the data for the Line chart
  const formatChartData = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const dates = data.map((item) => new Date(item.purchase)); 
      const totalSpend = data.map((item) => item.total_spend);

      const monthLabels = [];
      const monthNames = [];
      dates.forEach((date, index) => {
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; 
          const formattedMonth = date.toLocaleString('default', { month: 'short' }) + `' ${date.getFullYear().toString().slice(-2)}`;
          monthLabels.push(formattedMonth);
          monthNames.push(monthYear);
      });

      console.log("monthlabes", monthLabels, totalSpend)

      setChartData({
        labels: monthLabels,
        datasets: [
          {
            label: `Total Spend`,
            data: totalSpend,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.1,
          },
        ],
      });
    }
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  const handleApplyClick = () => {
    fetchChurnData(); // Fetch data based on the selected filters
  };

  return (
    <div className="churn-container">
      <h2 className="header">Churn Prediction: Customer Engagement Over Time</h2>
      <div className="header-right">
          <button className="home-btn" onClick={handleHomeRedirect}>Home</button>
      </div>
      {/* Category Selection */}
        <div className="filters-container">
        <div className="filter">
        <label>Select Department: </label>
        <select name="department" value={categoryData.department} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="FOOD">Food</option>
          <option value="NON-FOOD">Non-food</option>
          <option value="PHARMA">Pharma</option>
        </select>
        </div>
    <div className="filter">
        <label>Select Commodity: </label>
        <select name="commodity" value={categoryData.commodity} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="ACTIVITY">Activity</option>
          <option value="ALCOHOL">Alcohol</option>
          <option value="AUTO">Auto</option>
          <option value="BABY">Baby</option>
          <option value="BAKERY">Bakery</option>
          <option value="BULK PRODUCTS">Bulk Products</option>
          <option value="CLOTHING">Clothing</option>
          <option value="COSMETICS">Cosmetics</option>
          <option value="DAIRY">Dairy</option>
          <option value="DELI">Deli</option>
          <option value="FLORAL">Floral</option>
          <option value="MISK">Misk</option>
        </select>
        </div>

<div className="filter">
        <label>Select Brand Type: </label>
        <select name="brand_type" value={categoryData.brand_type} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="PRIVATE">Private</option>
          <option value="NATIONAL">National</option>
        </select>
        </div>

<div className="filter">
        <label>Select Organic: </label>
        <select name="organic_flag" value={categoryData.organic_flag} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
        </div>

        <button className="apply-btn" onClick={handleApplyClick}>Apply</button>
      </div>

      {/* Line Chart for Engagement Over Time */}
      <div className="chart-container">
        {churnData && churnData.length > 0 ? (
          <Line data={chartData} />
        ) : (
          loading ? <p> loading.... </p> : <p>lNo data available for the selected filters</p>
        )}
      </div>
    </div>
  );
};

export default ChurnPrediction;
