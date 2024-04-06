import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const EmployeeFacilityTable = () => {
  const columns = [
    { name: 'EmployeeFacilityId', label: 'Employee Facility ID', readOnly: true },
    { name: 'StartDate', label: 'Start Date' },
    { name: 'endDate', label: 'End Date' },
    { name: 'employeeRole', label: 'Employee Role' },
    { name: 'EmployeeId', label: 'Employee Id' },
    { name: 'FacilityId', label: 'Facility Id' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/employeeFacilityData');
      const data = await response.json();

      // Format the StartDate and endDate for each entry
    const formattedData = data.map((item) => {
      return {
        ...item,
        StartDate: new Date(item.StartDate).toISOString().split('T')[0],  // Format DOB
        endDate: new Date(item.endDate).toISOString().split('T')[0],
      };
    });

    console.log('Fetched data:', formattedData);
    return formattedData;
    
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); 
      setData(result);
    });
  }, []); 

  const handleAdd = async (newItem) => {
    try {
      const response = await fetch('/employeeFacilityData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to add entry: ' + responseData.error);
      }
      fetchData().then((result) => setData(result));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const { EmployeeFacilityId, ...updatedData } = updatedItem;
      const response = await fetch(`/employeeFacilityData/${EmployeeFacilityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to update entry: ' + responseData.error);
      }
      fetchData().then((result) => setData(result));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (deletedItem) => {
    try {
      const response = await fetch(`/employeeFacilityData/${deletedItem.EmployeeFacilityId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }
      fetchData().then((result) => setData(result));
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  return (
    <div className='table-container'>
      <DynamicCRUDTable
        tableName="Employee Facility"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey="EmployeeFacilityId"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default EmployeeFacilityTable;

