import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const InfectionTable = () => {
  const columns = [
    { name: 'InfectionId', label: 'Infection ID', readOnly: true },
    { name: 'PersonId', label: 'Person Id' },
    { name: 'InfectionType', label: 'Infection Type' },
    { name: 'InfectionDate', label: 'Infection Date' },
    { name: 'active', label: 'Active' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/infectionData');
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
      const response = await fetch('/infectionData', {
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
      const { InfectionId, ...updatedData } = updatedItem;
      const response = await fetch(`/infectionData/${InfectionId}`, {
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
      const response = await fetch(`/infectionData/${deletedItem.InfectionId}`, {
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
        tableName="Infection"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey="InfectionId"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default InfectionTable;

