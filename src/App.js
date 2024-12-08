import React, { useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataDisplay from './components/DataDisplay';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import UploadData from './components/UploadData';
import User from './components/User';  // Import User.js
import BasketAnalysis from './components/BasketAnalysis';
import ChurnPrediction from './components/ChurnPrediction';

import './App.css';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/search" element={<DataDisplay />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fetch-data" element={<DataDisplay />} />
        <Route path="/upload" element={<UploadData />} />
        <Route path="/user" element={<User />} /> {/* Add this line to define the /user route */}
        <Route path="/basket-analysis" element={<BasketAnalysis />} />
        <Route path="/churn-prediction" element={<ChurnPrediction />} />

      </Routes>
    </Router>
  );
}

export default App;