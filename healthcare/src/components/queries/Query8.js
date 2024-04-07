import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

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
      <h1 className="query-title">Query 8</h1>
      <h3 className="query-description">Get details of all the facilities recorded in the system, sorted in ascending order by province, then by 
city, then by type, then by number of doctors currently working for the facility.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Facility Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Province</th>
          <th>Postal Code</th>
          <th>Phone Number</th>
          <th>Web Address</th>
          <th>Type Of Facility</th>
          <th>Capacity</th>
          <th>Name of the General Manager</th>
          <th>number of employees</th>
          <th>Number of Doctors</th>
          <th>Number of Nurses</th>
          </tr>
        </thead>
        <tbody>
        {data.map(row => (
        <tr key={row.PersonId}>
          <td>{row.Name}</td>
          <td>{row.Address}</td>
          <td>{row.City}</td>
          <td>{row.Province}</td>
          <td>{row.PostalCode}</td>
          <td>{row.PhoneNumber}</td>
          <td>{row.WebAddress}</td>
          <td>{row.TypeOfFacility}</td>
          <td>{row.Capacity}</td>
          <td>{row.gmName}</td>
          <td>{row.NumDoctor}</td>
          <td>{row.NumNurse}</td>
          <td>{row.NumEmployees}</td>
        </tr>
))}

        </tbody>
      </table>
    </div>
  );
}

export default Query8;
