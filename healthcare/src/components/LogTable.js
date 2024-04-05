import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const LogTable = () => {
  const columns = [
    { name: 'LogId', label: 'Log ID', readOnly: true },
    { name: 'FacilityId', label: 'Facility Id' },
    { name: 'PersonId', label: 'Person Id' },
    { name: 'Subject', label: 'Subject' },
    { name: 'Body', label: 'Body' },
    { name: 'Date', label: 'Date' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/logData');
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
      const response = await fetch('/logData', {
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
      const { LogId, ...updatedData } = updatedItem;
      const response = await fetch(`/logData/${LogId}`, {
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
      const response = await fetch(`/logData/${deletedItem.LogId}`, {
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
        tableName="Log"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey="LogId"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default LogTable;

