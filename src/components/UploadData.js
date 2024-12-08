import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Use shared styles from App.css

const UploadData = () => {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 3) {
      setFiles(selectedFiles);
      setMessage('');
      setErrorMessage('');
      // setErrorExplanation('');
    } else {
      alert('You can upload a maximum of 3 datasets');
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!files.lenght==0) {
      alert('Please select at least one file to upload');
      return;
    }

    const formData = new FormData();
    // formData.append('file', file);
    files.forEach((file) => {
      formData.append('file', file);
    });

    setLoading(true);
    setMessage('Uploading...');

    try {
      
      const response = await axios.post('https://retialdb-backend.azurewebsites.net/upload', formData, {
         headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      setErrorMessage('');
    } catch (error) {
      setMessage('');
      setErrorMessage('Error uploading file. Please ensure the dataset matches the required format.');
    } finally {
      setLoading(false);
    }
  };

  // Home Button - Navigate to Home Page
  const handleHomeRedirect = () => {
    navigate('/');
  };

return (
    <div className="upload-container">
      
        <button onClick={handleHomeRedirect} className="home-btn">Home</button>
        {/* <h1>Upload CSV Data</h1> */}
      

      <div className="upload-content">
        {/* Instructions */}
        <h2 className="upload-title">Upload CSV Data</h2>
        <p className="upload-instructions">
          Please upload up to 3 CSV files containing household, transaction, and product data. The file should have the following columns:
          <br />
          - Household dataset: `hshd_num`, `l`, `age_range`, `income_range`, etc.
          <br />
          - Transaction dataset: `basket_num`, `hshd_num`, `purchase`, `spend`, etc.
          <br />
          - Product dataset: `product_num`, `department`, `commodity`, `brand_ty`, etc.
        </p>

        {/* File Upload Form */}
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-area">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              accept=".csv"
              multiple
            />
          </div>

          {/* Loading or Upload Button */}
          {loading ? (
            <div className="loading">Uploading...</div>
          ) : (
            <button type="submit" className="upload-btn">Upload File</button>
          )}
        </form>

        {/* Status Messages */}
        {message && <div className="status-message"><p>{message}</p></div>}
        {errorMessage && <div className="error-message"><p>{errorMessage}</p></div>}
      </div>
    </div>
  );
};

export default UploadData;
