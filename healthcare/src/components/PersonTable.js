import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const PersonTable = () => {
  const columns = [
    { name: 'PersonId', label: 'Person ID', readOnly: true },
    { name: 'MedicareCardNumber', label: 'Medicare Card Number' },
    { name: 'SSN', label: 'SSN' },
    { name: 'DOB', label: 'Date of Birth' },
    { name: 'Email', label: 'Email' },
    { name: 'Citizenship', label: 'Citizenship' },
    { name: 'FirstName', label: 'First Name' },
    { name: 'LastName', label: 'Last Name' },
    { name: 'phonenumber', label: 'Phone Number' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/personData');
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
      const response = await fetch('/personData', {
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
      const { PersonId, ...updatedData } = updatedItem;
      const response = await fetch(`/personData/${PersonId}`, {
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
      const response = await fetch(`/personData/${deletedItem.PersonId}`, {
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
        tableName="Person"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey="PersonId"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default PersonTable;

