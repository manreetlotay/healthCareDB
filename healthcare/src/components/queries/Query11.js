import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query11 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('/query/11');
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
      <h1 className="query-title">Query 11</h1>
      <h3 className="query-description">For a given employee with EmployeeId = 1, get the details of all the people who live with the employee at 
the primary address and at all the secondary addresses.
</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Full Address</th>
            <th>Residence Type</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Occupation</th>
            <th>Relationship with Employee</th>
           
          </tr>
        </thead>
        <tbody>
              {data.map(row => (
        <tr >
          <td>{row.full_address}</td>
          <td>{row.residence_type}</td>
          <td>{row.FirstName}</td>
          <td>{row.LastName}</td>
          <td>{row.occupation}</td>
          <td>{row.relationship}</td>
        </tr>
      ))}

        </tbody>
      </table>
    </div>
  );
}

export default Query11;
