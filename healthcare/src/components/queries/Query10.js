import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query10 = () => {
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
      const response = await fetch('/query/10');
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
      <h1 className="query-title">Query 10</h1>
      <h3 className="query-description">For a given employee with EmployeeId = 36, get the details of all the schedules she/he has been scheduled 
before 2025, sorted in ascending order by facility 
name, then by day of the year, the by start time.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Facility Name</th>
          <th>Day of the Year</th>
          <th>Start Time</th>
          <th>End Time</th>
          </tr>
        </thead>
        <tbody>
                {data.map(row => (
        <tr>
            <td>{row.Name}</td>
            <td>{row['DATE(sch.StartTime)']}</td>
            <td>{row['TIME(sch.StartTime)']}</td>
            <td>{row['TIME(sch.EndTime)']}</td>
        </tr>
        ))}


        </tbody>
      </table>
    </div>
  );
}

export default Query10;
