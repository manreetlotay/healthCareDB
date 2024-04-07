import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query16 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('/query/16');
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
      <h1 className="query-title">Query 16</h1>
      <h3 className="query-description">Report of all the employees working in all the facilities by role, displayed in ascending order by role.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Employee Role</th>
          <th>Total Employees</th>
          <th>Number of Employees infected with Covid</th>
          </tr>
        </thead>
        <tbody>
        {data.map(row => (
        <tr>
         <td>{row.EmployeeRole}</td>
    <td>{row.total_employees}</td>
    <td>{row.total_infected_with_covid}</td>
        </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default Query16;
