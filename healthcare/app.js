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

//Port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


