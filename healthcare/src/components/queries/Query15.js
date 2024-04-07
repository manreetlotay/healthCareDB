import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query15 = () => {
  const [data, setData] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('/query/15');
      const data = await response.json();
      console.log('Fetched data:', data); 
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  return (
    <div className="query-container">
      <h1 className="query-title">Query 15</h1>
      <h3 className="query-description">Details of nurses who are currently working at two or more different facilities and 
have been infected by COVID-19 in the last two weeks, sorted in ascending order by first day of work, then by first name, 
then by last name.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>First Day of Work</th>
          <th>Date of Birth</th>
          <th>Email Address</th>
          <th>Total Covid Infections</th>
          <th>Number of Vaccinations</th>
          <th>Total number of Hours Scheduled</th>
          <th>Number of secondary residences</th>
          </tr>
        </thead>
        <tbody>
                {data.map(row => (
        <tr >
            <td>{row.FirstName}</td>
            <td>{row.LastName}</td>
            <td>{row.StartDate}</td>
            <td>{row.DOB}</td>
            <td>{row.Email}</td>
            <td>{row.total_COVID_infections}</td>
            <td>{row.total_vaccinations}</td>
            <td>{row.total_scheduled_hours}</td>
            <td>{row.number_of_secondary_residences}</td>
        </tr>
        ))}


        </tbody>
      </table>
    </div>
  );
}

export default Query15;
