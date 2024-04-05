import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const ResidenceTable = () => {
  const columns = [
    { name: 'ResidenceId', label: 'Residence ID', readOnly: true },
    { name: 'PhoneNumber', label: 'Phone Number' },
    { name: 'NumberOfBedrooms', label: 'Number of Bedrooms' },
    { name: 'TypeOfResidence', label: 'Type of Residence' },
    { name: 'AddressId', label: 'Address Id' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/residenceData');
      const data = await response.json();
      console.log('Fetched data:', data); 
      return data;
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
      const response = await fetch('/residenceData', {
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
      const { ResidenceId, ...updatedData } = updatedItem;
      const response = await fetch(`/residenceData/${ResidenceId}`, {
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
      const response = await fetch(`/residenceData/${deletedItem.ResidenceId}`, {
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
        tableName="Residence"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey="ResidenceId"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ResidenceTable;

