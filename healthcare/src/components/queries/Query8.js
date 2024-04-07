import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; // Import the CSS file for styling

const Query8 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('/query/8');
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
      <h1 className="query-title">Result of Query 8</h1>
      <table className="query-table">
        <thead>
          <tr>
            <th>Person ID</th>
            <th>Date of Birth</th>
            <th>SSN</th>
          </tr>
        </thead>
        <tbody>
          {data.map(person => (
            <tr key={person.PersonId}>
              <td>{person.PersonId}</td>
              <td>{person.DOB}</td>
              <td>{person.SSN}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Query8;
