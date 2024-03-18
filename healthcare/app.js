const express = require("express");
const mysql = require('mysql');

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


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


//Port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


