import React, {useState, useEffect} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import '../App.css';  // Use shared styles from App.css

const HomePage = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername && storedEmail) {
      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="home-container">
      {!username && (
          <button 
            onClick={() => navigate('/user')} 
            className="home-btn"
          >
            Sign In / Sign Up
          </button>
        )}

      {username && (
          <button 
            onClick={() => {localStorage.removeItem('username');
                      localStorage.removeItem('email'); 
                      setUsername("");
                      setEmail(""); 
                      navigate('/user');
                    }} 
            className="home-btn"
          >
            Logout
          </button>
      )}
      

      <header className="navbar">
        <div className="navbat-container">
          <h1 className="navbar-brand"  href="#">Retail Insights Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="home-content">
        <div className="home-intro">
          <h2>Welcome to the Retail Insights Dashboard</h2>
          <p>
            Explore customer demographics, engagement trends, seasonal product insights, and more. Choose an action from the options below.
          </p>
        </div>

        {/* Display User Info if Logged In */}
        {username && email && (
          <div className="user-info">
            <h3>Welcome, {username}!</h3>
            <p>Email: {email}</p>
          </div>
        )}



          {/* Main Actions */}
        <div className="action-cards">
          <div className="action-card">
            <h3>Fetch Data</h3>
            <p>Retrieve and analyze data based on household numbers.</p>
            <Link to="/fetch-data" className="btn btn-primary">Fetch Data</Link>
          </div>
          <div className="action-card">
            <h3>Dashboard</h3>
            <p>Visualize insights on demographics, spending patterns, and more.</p>
            <Link to="/dashboard" className="btn btn-success">Dashboard</Link>
          </div>
          <div className="action-card">
            <h3>Churn Prediction</h3>
            <p>Predict which customers are at risk of disengaging.</p>
            <Link to="/churn-prediction" className="btn btn-churn">ChurnPrediction</Link>
          </div>
          <div className="action-card">
            <h3>Basket Analysis</h3>
            <p>Identify commonly purchased product combinations.</p>
            <Link to="/basket-analysis" className="btn btn-basket">BasketAnalysis</Link>
          </div>
          <div className="action-card">
            <h3>Upload Data</h3>
            <p>Upload CSV data to update the database with new household information.</p>
            <Link to="/upload" className="btn btn-secondary">Upload Data</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Retail Insights Dashboard | Developed by Siddartha Reddy</p>
      </footer>
    </div>
  );
};

export default HomePage;
