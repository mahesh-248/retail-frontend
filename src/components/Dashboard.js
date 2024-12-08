import React from 'react';
import { useNavigate } from 'react-router-dom';
import Demographics from './Demographics';
import EngagementOverTime from './EngagementOverTime';
import '../App.css'; // Importing App.css for styling

const Dashboard = () => {
  const navigate = useNavigate();  // Initialize navigate hook

  // Redirect to the "search by hshd_num" page
  const handleSearchRedirect = () => {
    navigate('/search');  // Use navigate to redirect
  };

  // Navigate back to Home
  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    // <div className="dashboard-container">
    //   <header className="dashboard-header" style={{display: "flex", flexDirection:"row"}}>
    //     <div style={{alignContent:"center", marginLeft:"650px"}}>
    //         <h1>Retail Analytics Dashboard</h1>
    //         <p className="intro-text">Explore the retail challenges with data-driven insights</p>
    //     </div>
    //     <div className="search-btn-container">
    //       <button onClick={handleSearchRedirect} className="search-btn">Search by Household Number</button>
    //     </div>
    //   </header>
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Retail Analytics Dashboard</h1>
          <p>Explore the retail challenges with data-driven insights</p>
        </div>
        <div className="header-right">
          <button className="home-btn" onClick={handleHomeRedirect}>Home</button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-section">
            <Demographics />
        </section>

        <section className="dashboard-section">
          <div className="chart-container">
            <EngagementOverTime />
          </div>
        </section>

        {/* Example of future sections */}
        {/* <section className="dashboard-section">
          <h2>Basket Analysis (Cross-Selling)</h2>
          <div className="chart-container">
            <Doughnut data={basketAnalysisChart} />
          </div>
        </section> */}

        
      </div>
    </div>
  );
};

export default Dashboard;
