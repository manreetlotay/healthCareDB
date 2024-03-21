import './App.css';
import React, { useState, useEffect } from 'react';
//import PersonTable from './components/PersonTable'
//import Table from './components/TasksCRUDTable';
import DynamicCRUDTable from './components/common/DynamicCRUDTable';
import PersonTable from './components/PersonTable';

// const columns = [
//   { name: 'PersonId', label: 'PersonId', readOnly: true },
//   { name: 'MedicareCardNumber', label: 'MedicareCareNumber' },
//   { name: 'SSN', label: 'SSN' },
//   { name: 'dob', label: 'Date of Birth' },
//   { name: 'email', label: 'Email' },
//   { name: 'citizenship', label: 'Citizenship' },
//   { name: 'firstName', label: 'First Name' },
//   { name: 'lastName', label: 'Last Name' },
//   { name: 'phoneNumber', label: 'Phone Number' },
// ];

const fetchData = async () => {
  try {
    const response = await fetch('/personData');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return []; // Return empty array if there's an error
  }
};

const handleAdd = (newData) => {
  // Implement add functionality
};

const handleUpdate = (newData) => {
  // Implement update functionality
};

const handleDelete = (deletedData) => {
  // Implement delete functionality
};


function App() {

  // const [personData, setPersonData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/personData');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       setPersonData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []); 

  return (
    <div className="App">
      <PersonTable />

{/* <h1>Person Data</h1>
      <div>
        {personData.map((person) => (
          <div key={person.PersonId}>
            <p>Person ID: {person.PersonId}</p>
            <p>Medicare Card Number: {person.MedicareCardNumber}</p>
            <p>SSN: {person.SSN}</p>
            <p>Date of Birth: {person.DOB}</p>
            <p>Email: {person.Email}</p> */}
            {/* <p>Citizenship: {person.Citizenship}</p>
            <p>First Name: {person.FirstName}</p>
            <p>Last Name: {person.LastName}</p>
            <p>Phone Number: {person.PhoneNumber}</p>
            <p>Residence: {person.ResidenceId}</p>
            <p>Address: {person.Address}</p>
    <p>City: {person.City}</p>
    <p>Province: {person.Province}</p>
    <p>Postal Code: {person.PostalCode}</p>
    <p>Phone Number: {person.PhoneNumber}</p>
    <p>Number of Bedrooms: {person.NumberOfBedrooms}</p>
    <p>Type of Residence: {person.TypeOfResidence}</p>
          </div>
        ))}
      </div> */}
    
      {/* <Table />
      <DynamicCRUDTable
    tableName="User Table"
    columns={columns}
    fetchData={fetchData}
    onAdd={handleAdd}
    onUpdate={handleUpdate}
    onDelete={handleDelete}
  /> */}
    </div>
  );
}

export default App;
