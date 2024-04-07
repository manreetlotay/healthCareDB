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
      <h1 className="query-title">Result of Query 8</h1>
      <h3 className="query-description">Get details of all the facilities recorded in the system. Details include facility name, 
address, city, province, postal-code, phone number, web address, type, capacity, name 
of the general manager, number of employees currently working at the facility, number 
of doctors currently working in the facility, and number of nurses currently working in 
the facility. Results should be displayed sorted in ascending order by province, then by 
city, then by type, then by number of doctors currently working for the facility.</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Name</th>
          <th>Address Id</th>
          <th>City</th>
          <th>Province</th>
          <th>Postal Code</th>
          <th>Phone Number</th>
          <th>Web Address</th>
          <th>Type Of Facility</th>
          <th>Capacity</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Number of Doctors</th>
          <th>Number of Nurses</th>
          </tr>
        </thead>
        <tbody>
           {data.map(row => (
            <tr key={row.PersonId}>
             <td>{row.Name}</td>
              <td>{row.AddressId}</td>
              <td>{row.City}</td>
              <td>{row.Province}</td>
              <td>{row.PostalCode}</td>
              <td>{row.PhoneNumber}</td>
              <td>{row.WebAddress}</td>
              <td>{row.TypeOfFacility}</td>
              <td>{row.Capacity}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.NumDoctor}</td>
              <td>{row.NumNurse}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Query8;
