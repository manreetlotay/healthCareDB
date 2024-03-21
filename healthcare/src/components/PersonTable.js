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
    { name: 'PhoneNumber', label: 'Phone Number' },
    { name: 'ResidenceId', label: 'Residence Id'}
  ];

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/personData');
      const data = await response.json();
      console.log('Fetched data:', data); // Log fetched data
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((result) => {
      console.log('Setting data:', result); // Log data being set
      setData(result);
    });
  }, []); 

  const handleAdd = async (newItem) => {
    console.log('Adding new item:', newItem);
    // Implement add functionality
  };

  const handleUpdate = async (updatedItem) => {
    console.log('Updating item:', updatedItem);
    // Implement update functionality
  };

  const handleDelete = async (deletedItem) => {
    console.log('Deleting item:', deletedItem);
    // Implement delete functionality
  };

  return (
    <div>
      <DynamicCRUDTable
        tableName="Person"
        columns={columns}
        fetchData={fetchData}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PersonTable;
