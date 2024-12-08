import React, { useState } from 'react';
import axios from 'axios';
import { useTable, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const DataDisplay = () => {
  const navigate = useNavigate();
  const [hshdNum, setHshdNum] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setHshdNum(e.target.value);
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://retialdb-backend.azurewebsites.net/data/${hshdNum}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'HSHD_NUM', accessor: 'hshd_num' },
      { Header: 'Basket Number', accessor: 'basket_num' },
      { Header: 'Date', accessor: 'purchase' },
      { Header: 'Product Number', accessor: 'product_num' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Commodity', accessor: 'commodity' },
      { Header: 'Spend', accessor: 'spend' },
      { Header: 'Units', accessor: 'units' },
      { Header: 'Store', accessor: 'store_r' },
      { Header: 'Week Number', accessor: 'week_num' },
      { Header: 'Year', accessor: 'year' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Navigate to the home page
  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Sample Data Pull for Household Number</h1>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <form onSubmit={fetchData}>
          <input
            type="number"
            placeholder="Enter Household Number (hshd_num)"
            value={hshdNum}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="submit-btn">Fetch Data</button>
        </form>
      </div>

      {/* Loading and Error States */}
      {loading && <div className="loading-state">Loading...</div>}
      {error && <div className="error-state">{error}</div>}

      {/* Data Table */}
      {data.length > 0 && (
        <div className="table-section">
          <h2>Data for Household {hshdNum}</h2>
          <table {...getTableProps()} className="data-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* Home Button */}
      <div className="home-btn-container">
        <button onClick={handleHomeRedirect} className="home-btn">Home</button>
      </div>
    </div>
  );
};

export default DataDisplay;