const express = require("express");
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Port
const port = 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
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


/*****************  QUERY ************************/
app.post('/query', (req, res) => {
  const { query } = req.body;
  const response = { message: 'Query received and processed', query };
  res.json(response);
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


/*****************  ADDRESS TABLE ************************/

app.get('/addressData', (req, res) => {
  const query = 'SELECT * FROM address';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation address:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/addressData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO address SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/addressData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM address WHERE AddressId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/addressData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE address SET ? WHERE AddressId = ?';

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
      console.error('Error fetching data from relation employee:', err);
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

/*****************  EMPLOYEE FACILITY TABLE ************************/

app.get('/employeeFacilityData', (req, res) => {
  const query = 'SELECT * FROM employeefacility';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation employeefacility:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/employeeFacilityData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO employeefacility SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/employeeFacilityData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM employeefacility WHERE EmployeeFacilityId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/employeeFacilityData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE employeefacility SET ? WHERE EmployeeFacilityId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});


/*****************  FACILITY TABLE ************************/

app.get('/facilityData', (req, res) => {
  const query = 'SELECT * FROM facility';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation facility:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/facilityData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO facility SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/facilityData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM facility WHERE FacilityId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/facilityData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE facility SET ? WHERE FacilityId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});


/*****************  INFECTION TABLE ************************/

app.get('/infectionData', (req, res) => {
  const query = 'SELECT * FROM infection';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation infection:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/infectionData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO infection SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/infectionData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM infection WHERE InfectionId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/infectionData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE infection SET ? WHERE InfectionId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});


/*****************  LOG TABLE ************************/

app.get('/logData', (req, res) => {
  const query = 'SELECT * FROM log';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation log:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/logData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO log SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/logData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM log WHERE LogId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/logData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE log SET ? WHERE LogId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});


/*****************  PERSON RESIDENCE TABLE ************************/

app.get('/personResidenceData', (req, res) => {
  const query = 'SELECT * FROM personresidence';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation personresidence:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/personResidenceData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO personresidence SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/personResidenceData/:PersonId/:ResidenceId', (req, res) => {
  const PersonId = req.params.PersonId;
  const ResidenceId = req.params.ResidenceId;

  const query = 'DELETE FROM personresidence WHERE PersonId = ? AND ResidenceId = ?';

  connection.query(query, [personId, residenceId], (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});



app.put('/personResidenceData/:PersonId/:ResidenceId', (req, res) => {
  const PersonId = req.params.PersonId;
  const ResidenceId = req.params.ResidenceId;
  const updatedData = req.body;

  const query = 'UPDATE personresidence SET ? WHERE PersonId = ? AND ResidenceId = ?';

  connection.query(query, [updatedData, personId, residenceId], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});

/*****************  RELATION TABLE ************************/

app.get('/relationData', (req, res) => {
  const query = 'SELECT * FROM relation';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation relation:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/relationData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO relation SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/relationData/:EmployeeId/:PersonId', (req, res) => {
  const EmployeeId = req.params.EmployeeId;
  const PersonId = req.params.PersonId;

  const query = 'DELETE FROM personresidence WHERE EmployeeId = ? AND PersonId = ?';

  connection.query(query, [EmployeeId, PersonId], (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});



app.put('/relationData/:EmployeeId/:PersonId', (req, res) => {
  const EmployeeId = req.params.EmployeeId;
  const PersonId = req.params.PersonId;
  const updatedData = req.body;

  const query = 'UPDATE personresidence SET ? WHERE EmployeeId = ? AND PersonId = ?';

  connection.query(query, [updatedData, EmployeeId, PersonId], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});


/*****************  RESIDENCE TABLE ************************/

app.get('/residenceData', (req, res) => {
  const query = 'SELECT * FROM residence';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation residence:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/residenceData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO residence SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/residenceData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM residence WHERE ResidenceId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/residenceData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE residence SET ? WHERE ResidenceId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});



/*****************  SCHEDULE TABLE ************************/

app.get('/scheduleData', (req, res) => {
  const query = 'SELECT * FROM schedule';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation schedule:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/scheduleData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO schedule SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/scheduleData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM schedule WHERE ScheduleId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/scheduleData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE schedule SET ? WHERE ScheduleId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});


/*****************  VACCINATION TABLE ************************/

app.get('/vaccinationData', (req, res) => {
  const query = 'SELECT * FROM vaccination';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from relation vaccination:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});


app.post('/vaccinationData', (req, res) => {
  const newItem = req.body; // 

  const query = 'INSERT INTO vaccination SET ?';

  connection.query(query, newItem, (err, result) => {
    if (err) {
      console.error('Error adding entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
      
    }
    res.status(200).json({ message: 'Entry added successfully' });
  });
});


app.delete('/vaccinationData/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM vaccination WHERE VaccinationId = ?';

  connection.query(query, id, (err, result) => {
    if (err) {
      console.error('Error deleting entry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  });
});


app.put('/vaccinationData/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const query = 'UPDATE vaccination SET ? WHERE VaccinationId = ?';

  connection.query(query, [updatedData, id], (err, result) => {
    if (err) {
      console.error('Error updating entry:', err);
      return res.status(400).json({ error: err.sqlMessage });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  });
});

