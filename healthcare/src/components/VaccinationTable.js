import React, { useState, useEffect } from 'react';
import DynamicCRUDTable from './common/DynamicCRUDTable';

const VaccinationTable = () => {
  const columns = [
    { name: 'VaccinationId', label: 'Vaccination ID', readOnly: true },
    { name: 'VaccinationDate', label: 'Vaccination Date' },
    { name: 'VaccinationType', label: 'Vaccination Type' },
    { name: 'PersonId', label: 'Person Id' },
    { name: 'FacilityId', label: 'Facility Id' },
    { name: 'DoseNumber', label: 'Dose Number' },
  ];

  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/vaccinationData');
      const data = await response.json();
       // Format the VaccinationDate for each entry
    const formattedData = data.map((item) => {
      return {
        ...item,
        VaccinationDate: new Date(item.VaccinationDate).toISOString().split('T')[0]  
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
      const response = await fetch('/vaccinationData', {
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
      const { VaccinationId, ...updatedData } = updatedItem;
      const response = await fetch(`/vaccinationData/${VaccinationId}`, {
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
      const response = await fetch(`/vaccinationData/${deletedItem.VaccinationId}`, {
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
        tableName="Vaccination"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        uniqueKey="VaccinationId"
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default VaccinationTable;

