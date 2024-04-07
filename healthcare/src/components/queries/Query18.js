import React, { useState, useEffect } from 'react';
import '../styles/Queries.css'; 

const Query18 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch('/query/18');
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
      <h1 className="query-title">Query 18</h1>
      <h3 className="query-description">For all provinces, give the total number of facilities, the total number of employees 
currently working in the facilities, the total number of employees currently working 
and infected by COVID-19, the maximum capacity of the facilities, and the total hours 
scheduled in all facilities between 2016-01-01 00:00:00 and '2018-12-31 23:59:59. Results should be displayed in 
ascending order by province.
</h3>
      <table className="query-table">
        <thead>
          <tr>
          <th>Province</th>
          <th>Total Number of Facilities</th>
          <th>Total Working Employees in Facilities</th>
          <th>Total Employees Infected with Covid</th>
          <th>Capacity</th>
          <th>Total Hours Schedules in All Facilities</th>
          </tr>
        </thead>
        <tbody>
                {data.map(row => (
        <tr >
            <td>{row.Province}</td>
            <td>{row.total_facilities}</td>
            <td>{row.total_working_employees}</td>
            <td>{row.total_covid_infected_employees}</td>
            <td>{row.Capacity}</td>
            <td>{row.total_scheduled_hours}</td>
        </tr>
        ))}

        </tbody>
      </table>
    </div>
  );
}

export default Query18;
