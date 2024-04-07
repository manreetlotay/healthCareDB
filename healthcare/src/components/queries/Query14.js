import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query14 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('/query/14');
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
      <h1 className="query-title">Query 14</h1>
      <h3 className="query-description">For a given facility with FacilityId = 6, generate a list of all the employees who have at least three
secondary residences and who have been on schedule to work in the last four weeks, displayed in ascending order by role, then by the number of 
secondary residences.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role of Employee</th>
          <th>Number of Secondary Residences</th>
          </tr>
        </thead>
        <tbody>
        {data.map(row => (
        <tr>
          <td>{row.FirstName}</td>
          <td>{row.Lastname}</td>
          <td>{row.EmployeeRole}</td>
          <td>{row.number_of_secondary_residences}</td>
        </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default Query14;
