const express = require("express");
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Port
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

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


/*****************  PERSON TABLE ************************/

app.get('/personData', (req, res) => {
  const query = 'SELECT * FROM person';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation person:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/personData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO person SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/personData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM person WHERE PersonId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/personData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE person SET ? WHERE PersonId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});



/*****************  EMPLOYEE TABLE ************************/

app.get('/employeeData', (req, res) => {
  const query = 'SELECT * FROM employee';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation person:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/employeeData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO employee SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/employeeData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM employee WHERE EmployeeId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/employeeData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE employee SET ? WHERE EmployeeId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});




