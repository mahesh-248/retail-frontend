import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const User = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Password validation
  const isPasswordValid = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Email validation
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@(gmail\.com|[a-z0-9.-]+\.[a-z]{2,})$/;
    return emailPattern.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setErrorMessage('All fields are required!');
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorMessage('Password must be at least 8 characters long, contain a lowercase letter, uppercase letter, number, and special character.');
      return;
    }

    if (!isEmailValid(email)) {
      setErrorMessage('Please enter a valid email address (either Gmail or organization email).');
      return;
    }

    // If all validations pass
    setMessage('Sign Up / Sign In successful!');
    setErrorMessage('');
    // Store the user info (for demo purposes, in real life this would be done via API)
    // localStorage.setItem('username', username);
    // localStorage.setItem('email', email);

    // Navigate to HomePage and pass username and email via state
    navigate('/', { state: { username, email } });
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  };

  return (
    <div className="user-container">
      <header className="user-header">
        <h1>User Sign In / Sign Up</h1>
      </header>

      <div className="user-content">
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>

        {message && <div className="success-message">{message}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default User;
