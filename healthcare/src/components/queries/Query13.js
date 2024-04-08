import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query13 = () => {
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
      const response = await fetch('/query/13');
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
      <h1 className="query-title">Query 13</h1>
      <h3 className="query-description">For a given facility, list the emails generated for the cancellation of assignments 
      between 2022-03-01 and 2024-05-01, sorted in descending order by the 
date of the emails</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Log Id</th>
          <th>Facility Id</th>
          <th>Person Id</th>
          <th>Subject</th>
          <th>Body</th>
          <th>Date</th>
          <th>Facility Name</th>
          
          </tr>
        </thead>
        <tbody>
        {data.map(row => (
            <tr>
                <td>{row.LogId}</td>
                <td>{row.FacilityId}</td>
                <td>{row.PersonId}</td>
                <td>{row.Subject}</td>
                <td>{row.Body}</td>
                <td>{formatDate(row.Date)}</td>
                <td>{row.facilityName}</td>
            </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
}

export default Query13;
