const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const requests = require('./request');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect mysql to express
const connection = mysql.createConnection({
    host: 'okc353.encs.concordia.ca',
    user: 'okc353_4',
    password: 'Hd514mod16',
    database: 'okc353_4'
  });

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
});

//Requests
//app.use(requests);

app.get('/personData', (req, res) => {
  // Perform database query to fetch data from MySQL table
  const query = 'SELECT * FROM person';
  // const query = `
  // SELECT 
  //   p.*, 
  //   r.Address, 
  //   r.City, 
  //   r.Province, 
  //   r.PostalCode, 
  //   r.PhoneNumber, 
  //   r.NumberOfBedrooms, 
  //   r.TypeOfResidence 
  // FROM 
  //   person p 
  // JOIN 
  //   residence r 
  // ON 
  //   p.ResidenceId = r.ResidenceId`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation person:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Send fetched data as JSON response
    res.json(results);
  });
});



//add entry in person table
app.post('/personData', (req, res) => {
  const newItem = req.body; // New data sent from the client-side

  // Construct the SQL query to insert the new entry into the person table
  const query = 'INSERT INTO person SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});

//delete entry in person table
app.delete('/personData/:id', (req, res) => {
  const id = req.params.id;

  // Construct the SQL query to delete the entry from the person table
  const query = 'DELETE FROM person WHERE PersonId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});

//update entry in person table
app.put('/personData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body; // Updated data sent from the client-side

  // Construct the SQL query to update the entry in the person table
  const query = 'UPDATE person SET ? WHERE PersonId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});





//Port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


