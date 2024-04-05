import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const PersonResidenceTable = () => {
  const columns = [
    { name: 'PersonId', label: 'Person ID', readOnly: true },
    { name: 'ResidenceId', label: 'Residence Id' },
    { name: 'TypeOfResidence', label: 'Type of Residence' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/personResidenceData');
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
      const response = await fetch('/personResidenceData', {
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
      const { PersonId, ResidenceId, ...updatedData } = updatedItem;
      const response = await fetch(`/personResidenceData/${PersonId}/${ResidenceId}`, {
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
      const { PersonId, ResidenceId } = deletedItem;
      const response = await fetch(`/personResidenceData/${PersonId}/${ResidenceId}`, {
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
        tableName="Person Residence"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey={item => `${item.PersonId}-${item.ResidenceId}`}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default PersonResidenceTable;

