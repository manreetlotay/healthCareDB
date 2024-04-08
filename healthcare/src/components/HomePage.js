import React from 'react';
import './styles/HomePage.css';
import QueryDropdown from './common/QueryDropdown';

const HomePage = () => {

  //query options
  const options = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];
  

  return (
    <div>
    <div className="homepage">
      <div className="homepage-content">
        <h1>Healthcare Database System</h1>
        <h2>Access the tables below</h2>
        <div className="button-container">
          <a href="/address" className="homepage-button">Address</a>
          <a href="/employee" className="homepage-button">Employee</a>
          <a href="/employeeFacility" className="homepage-button">Employee Facility</a>
          <a href="/facility" className="homepage-button">Facility</a>
          <a href="/infection" className="homepage-button">Infection</a>
          <a href="/log" className="homepage-button">Log</a>
          <a href="/person" className="homepage-button">Person</a>
          <a href="/personResidence" className="homepage-button">Person Residence</a>
          <a href="/relation" className="homepage-button">Relation</a>
          <a href="/residence" className="homepage-button">Residence</a>
          <a href="/schedule" className="homepage-button">Schedule</a>
          <a href="/vaccination" className="homepage-button">Vaccination</a>
          </div>
          <h2>Run the queries below</h2>
          <div className='dropdown-container'>
            <QueryDropdown className="dropdown" options={options} />
          </div>
      </div>
    </div>
    <div className='extra'></div></div>
  );
};

export default HomePage;
