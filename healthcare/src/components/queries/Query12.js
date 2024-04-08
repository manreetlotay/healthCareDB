import React, { useState, useEffect } from 'react';
import '../styles/Queries.css';

const Query12 = () => {
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
      const response = await fetch('/query/12');
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
      <h1 className="query-title">Query 12</h1>
      <h3 className="query-description">Details of all the doctors who have been infected by COVID-19 in the past two
        weeks, sorted in ascending order by the
        facility name, then by the number of secondary residences the doctor has.</h3>
      <table className="query-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Infection Date</th>
            <th>Name of Facility</th>
            <th>Number of secondary residences</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr>
              <td>{row.FirstName}</td>
              <td>{row.LastName}</td>
              <td>{formatDate(row.InfectionDate)}</td>
              <td>{row.Name}</td>
              <td>{row.numSecondary}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default Query12;
