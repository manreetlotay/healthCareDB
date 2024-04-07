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
      <h1 className="query-title">Result of Query 8</h1>
      <h3 className="query-description">For a given employee, get the details of all the people who live with the employee at 
the primary address and at all the secondary addresses. For every address the employee 
has, you need to provide the residence type for that address, and for every person who 
lives at that address, you need to provide the person’s first name, last name, occupation 
of the person, and the relationship with the employee.
</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Full Address</th>
            <th>Residence Type</th>
            <th>Person ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Occupation</th>
            <th>Relationship</th>
           
          </tr>
        </thead>
        <tbody>
            {data.map(row => (
             <tr key={row.PersonId}>
             <td>{row.full_address}</td>
            <td>{row.residence_type}</td>
            <td>{row.PersonId}</td>
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
