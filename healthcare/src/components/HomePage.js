import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1>Healthcare Database System</h1>
        <h2>Access the tables below or perform a query</h2>
        <div className="button-container">
          <a href="/person" className="homepage-button">Person</a>
          <a href="/employee" className="homepage-button">Employee</a>
          <a href="/query" className="homepage-button query">Query</a>
          <a href="/appointments" className="homepage-button">Appointments</a>
          {/* Add more buttons as needed */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
