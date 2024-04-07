import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query9 = () => {
  const [data, setData] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
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
      const response = await fetch('/query/9');
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
      <h1 className="query-title">Result of Query 9</h1>
      <h3 className="query-description">Details of all the employees currently working in a specific facility who have at 
least one secondary residence, sorted in descending order by start date, then 
by first name, then by last name.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Start Date of Work</th>
          <th>Date of Birth</th>
          <th>Medicare Card Number</th>
          <th>Phone Number</th>
          <th>Primary Address</th>
          <th>Citizenship</th>
          <th>Email</th>
          <th>Number of secondary residences</th>
          </tr>
        </thead>
        <tbody>
        {data.map(row => (
            <tr>
                <td>{row.FirstName}</td>
                <td>{row.LastName}</td>
                <td>{formatDate(row.StartDate)}</td>
                <td>{formatDate(row.DOB)}</td>
                <td>{row.MedicareCardNumber}</td>
                <td>{row.phonenumber}</td>
                <td>{row.Address}</td>
                <td>{row.Citizenship}</td>
                <td>{row.Email}</td>
                <td>{row.SecondaryResidenceCount}</td>
            </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
}

export default Query9;
