const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  //secure: false,
  auth: {
    user: 'tdatabase9@gmail.com',
    pass: 'okc353_4_db',
  }
});


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

  connection.query(query, [PersonId, ResidenceId], (err, result) => {
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

  connection.query(query, [updatedData, PersonId, ResidenceId], (err, result) => {
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

  const query = 'DELETE FROM relation WHERE EmployeeId = ? AND PersonId = ?';

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

  const query = 'UPDATE relation SET ? WHERE EmployeeId = ? AND PersonId = ?';

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



/*****************************RETRIEVE EMAILS OF EMPLOYEES WHO SHARE THE SAME SCHEDULE AS THE INFECTED***************************/


app.get('/getSharedScheduleEmails/:personId', async (req, res) => {
  const personId = req.params.personId;

  const query = `SELECT email FROM person WHERE (
    SELECT DISTINCT s.EmployeeId
    FROM schedule s
    JOIN employeefacility ef ON s.EmployeeId = ef.EmployeeId
    WHERE s.EmployeeId IN (
        SELECT s2.EmployeeId
        FROM employeefacility ef2
        JOIN schedule s2 ON ef2.EmployeeId = s2.EmployeeId
        WHERE ef2.FacilityId = (SELECT FacilityId FROM employeefacility WHERE EmployeeId = ?)
        AND s2.EmployeeId != 1
        AND DATE(s2.StartTime) IN (SELECT DATE(StartTime) FROM schedule WHERE EmployeeId = ? AND Time(s2.StartTime) < Time(schedule.EndTime) AND Time(s2.EndTime) > Time(schedule.StartTime))
    )
  ) = PersonId;`;

  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(query, [personId, personId, personId], (err, results) => {
        if (err) {
          console.error('Error fetching shared schedule emails:', err);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    const emails = results.map(result => result.email);
    console.log('Retrieved emails:', emails);

    const email = 'lotaymk@gmail.com';
    const mailOptions = {
      from: ' "nodemailer" <tdatabase9@gmail.com>',
      to: email,
      subject: 'Warning',
      text: 'One of your colleagues with whom you worked in the past two weeks has been infected with COVID-19 (or else…)'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to', email, ':', error);
      } else {
        console.log('Email sent to', email, ':', info.response);
      }
    });

    // Send emails to each recipient
    // emails.forEach(email => {
    //   const mailOptions = {
    //     from: 'tdatabase9@gmail.com',
    //     to: email,
    //     subject: 'Warning',
    //     text: 'One of your colleagues with whom you worked in the past two weeks has been infected with COVID-19 (or else…)'
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.error('Error sending email to', email, ':', error);
    //     } else {
    //       console.log('Email sent to', email, ':', info.response);
    //     }
    //   });
    // });

    res.json({ message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


/*******************************************QUERIES*****************************************/

const query8 = `
SELECT 
    f.Name,
    CONCAT(a.HouseNumber, ' ', a.StreetName, ', ', a.City, ', ', a.Province, ' ', a.PostalCode) AS Address,
    a.City,
    a.Province,
    a.PostalCode,
    f.PhoneNumber,
    f.WebAddress,
    f.TypeOfFacility,
    f.Capacity,
    CONCAT(person.firstName, ' ', person.lastName) AS gmName,
    (
        SELECT COUNT(*)
        FROM employeefacility AS efCount 
        WHERE efCount.employeeRole = "Doctor" AND efCount.FacilityId = f.FacilityId
    ) AS NumDoctor,
    (
        SELECT COUNT(*)
        FROM employeefacility AS efCount 
        WHERE efCount.employeeRole = "Nurse" AND efCount.FacilityId = f.FacilityId
    ) AS NumNurse,
    (
        SELECT COUNT(*)
        FROM employeefacility AS efCount 
        WHERE efCount.FacilityId = f.FacilityId
    ) AS NumEmployees
FROM 
    person
JOIN 
    employee ON person.PersonId = employee.EmployeeId
JOIN 
    employeefacility AS ef1 ON ef1.employeeId = employee.EmployeeId
JOIN 
    facility AS f ON ef1.FacilityId = f.FacilityId
JOIN 
    address AS a ON a.AddressId = f.FacilityId
WHERE 
    ef1.employeeRole = 'Administrative Personnel'
    AND ef1.endDate IS NULL
ORDER BY 
    a.Province ASC, a.City ASC, NumDoctor ASC;
`;



const query9 = `
SELECT 
    person.FirstName,
    person.LastName,
    ef.StartDate,
    person.DOB,
    person.MedicareCardNumber,
    person.phonenumber,
    CONCAT(ad.HouseNumber, ' ', ad.StreetName, ', ', ad.Province, ', ', ad.PostalCode) AS Address,
    person.Citizenship,
    person.Email,
    (
        SELECT COUNT(*)
        FROM personresidence AS pr_secondary
        WHERE pr_secondary.PersonId = person.PersonId
            AND pr_secondary.TypeOfResidence = 0
    ) AS SecondaryResidenceCount
FROM
    person
JOIN
    employee AS e ON e.EmployeeId = person.PersonId
JOIN
    employeefacility AS ef ON ef.EmployeeId = e.EmployeeId
JOIN
    personresidence AS pr_primary ON pr_primary.PersonId = person.PersonId
    AND pr_primary.TypeOfResidence = 1
JOIN
    residence AS res ON pr_primary.ResidenceId = res.ResidenceId
JOIN
    address AS ad ON ad.AddressId = res.AddressId
WHERE
    ef.FacilityId = 6 AND ef.EndDate IS NULL
    AND person.PersonId IN (
        SELECT pr.PersonId
        FROM personresidence AS pr
        WHERE pr.TypeOfResidence = 0
    )
ORDER BY
    ef.StartDate DESC, person.FirstName DESC, person.LastName DESC;
`;

const query10 = `
SELECT 
    f.Name,
    DATE(sch.StartTime),
    TIME(sch.StartTime),
    TIME(sch.EndTime)
FROM 
    employeefacility AS ef
JOIN 
    facility AS f ON f.FacilityId = ef.FacilityId
JOIN 
    schedule AS sch ON sch.EmployeeId = ef.EmployeeId
WHERE 
    ef.EmployeeId = 36
    AND DATE(sch.StartTime) <= "2025-01-01"
ORDER BY 
    f.Name ASC, DATE(sch.StartTime) ASC, sch.StartTime;
`;

const query11 = `
SELECT 
    pr.ResidenceId,
    CONCAT(a.HouseNumber, ' ', a.StreetName, ', ', a.City, ', ', a.Province, ', ', a.PostalCode) AS full_address,
    (
        SELECT 
            CASE 
                WHEN TypeOfResidence = 1 THEN 'Primary' 
                ELSE 'Secondary' 
            END 
        FROM 
            personresidence 
        WHERE 
            ResidenceId=pr.ResidenceId 
            AND PersonId=6
    ) AS residence_type,
    p.FirstName,
    p.LastName,
    (
        SELECT 
            GROUP_CONCAT(DISTINCT employeeRole) 
        FROM 
            employeefacility 
        WHERE 
            EmployeeId=pr.PersonId 
            AND EndDate IS NULL
    ) AS occupation,
    (
        SELECT 
            relationship 
        FROM 
            relation 
        WHERE 
            PersonId=pr.PersonId 
            AND EmployeeId=6
    ) AS relationship
FROM 
    personresidence AS pr
JOIN 
    residence AS res ON pr.ResidenceId = res.ResidenceId
JOIN 
    address AS a ON res.AddressId = a.AddressId
JOIN 
    person AS p ON pr.PersonId = p.PersonId
WHERE 
    pr.ResidenceId IN (
        SELECT ResidenceId
        FROM personresidence
        WHERE PersonId=6
    )
    AND pr.PersonId <> 6;
`;




const query12 = `
SELECT 
    p.FirstName, 
    p.LastName, 
    inf.InfectionDate, 
    f.Name, 
    (
        SELECT COUNT(*) 
        FROM personresidence AS pr 
        WHERE pr.PersonId = ef.EmployeeId 
        AND pr.TypeOfResidence = 0
    ) AS numSecondary 
FROM 
    employeefacility AS ef
JOIN 
    infection AS inf ON inf.PersonId = ef.EmployeeId
JOIN 
    person AS p ON p.PersonId = ef.EmployeeId
JOIN 
    facility AS f ON f.FacilityId = ef.FacilityId
WHERE 
    ef.employeeRole = "Doctor" 
    AND DATEDIFF(CURRENT_DATE, inf.InfectionDate) <= 14 
    AND ef.endDate IS NULL;
`;



const query13 = `
SELECT 
    * 
FROM 
    log
WHERE 
    log.FacilityId = 1 
    AND log.Subject = "Cancel" 
    AND log.Date > "2020-03-01" 
    AND log.Date < "2024-05-01"
ORDER BY 
    log.Date DESC;
`;



const query14 = `
SELECT
    ef.EmployeeId,
    p.FirstName,
    p.LastName,
    ef.EmployeeRole,
    COUNT(DISTINCT pr.ResidenceId) AS number_of_secondary_residences
FROM 
    employeefacility AS ef
JOIN 
    person AS p ON ef.EmployeeId = p.PersonId
JOIN 
    personresidence AS pr ON p.PersonId = pr.PersonId
JOIN 
    schedule AS s ON ef.EmployeeId = s.EmployeeId
WHERE 
    s.EndTime >= DATE_SUB(CURDATE(), INTERVAL 4 WEEK) 
    AND pr.TypeOfResidence = 0 
    AND ef.FacilityId = 6
GROUP BY 
    ef.EmployeeId
HAVING 
    COUNT(DISTINCT pr.ResidenceId) >= 3
ORDER BY 
    EmployeeRole, COUNT(DISTINCT pr.ResidenceId) ASC;
`;


const query15 = `
SELECT
    p.FirstName,
    p.LastName,
    ef.StartDate,
    p.DOB,
    p.Email,
    COUNT(DISTINCT i.InfectionId) AS total_COVID_infections,
    COUNT(DISTINCT v.VaccinationId) AS total_vaccinations,
    (
        SELECT IFNULL(HOUR(SUM(TIMEDIFF(EndTime, StartTime))), 0)
        FROM schedule
        WHERE EmployeeId = ef.EmployeeId
    ) AS total_scheduled_hours,
    COUNT(DISTINCT pr.ResidenceId) AS number_of_secondary_residences
FROM 
    employeefacility AS ef
JOIN 
    person AS p ON ef.EmployeeId = p.PersonId
LEFT JOIN 
    personresidence AS pr ON p.PersonId = pr.PersonId AND pr.TypeOfResidence = 0
LEFT JOIN 
    vaccination AS v ON p.PersonId = v.PersonId
JOIN 
    infection AS i ON p.PersonId = i.PersonId AND EXISTS (SELECT 1 FROM infection WHERE PersonId=p.PersonId AND InfectionDate >= DATE_SUB(CURDATE(), INTERVAL 2 WEEK))
WHERE 
    ef.EmployeeRole = 'Nurse' 
    AND ef.EndDate IS NULL 
    AND i.InfectionType = 'Covid-19'
GROUP BY 
    ef.EmployeeId
HAVING 
    COUNT(DISTINCT ef.FacilityId) >= 2
ORDER BY 
    ef.StartDate, p.FirstName, p.LastName ASC;
`;


const query16 = `
SELECT
    ef.EmployeeRole,
    COUNT(DISTINCT ef.EmployeeId) AS total_employees,
    (
        SELECT COUNT(DISTINCT PersonId) 
        FROM infection 
        WHERE PersonId = ef.EmployeeId 
        AND InfectionType = 'Covid-19' 
        AND active
    ) AS total_infected_with_covid
FROM 
    employeefacility AS ef
WHERE 
    ef.EndDate IS NULL
GROUP BY 
    ef.EmployeeRole
ORDER BY 
    ef.EmployeeRole ASC;
`;

const query17 = `
SELECT
    ef.EmployeeRole,
    COUNT(DISTINCT ef.EmployeeId) AS total_employees,
    (
        SELECT COUNT(DISTINCT PersonId) 
        FROM person 
        WHERE 
            PersonId = ef.EmployeeId 
            AND NOT EXISTS (
                SELECT 1 
                FROM infection AS i 
                WHERE i.PersonId = ef.EmployeeId 
                AND InfectionType = 'Covid-19'
            )
    ) AS total_never_infected_with_covid
FROM 
    employeefacility AS ef
WHERE 
    ef.EndDate IS NULL
GROUP BY 
    ef.EmployeeRole
ORDER BY 
    ef.EmployeeRole ASC;
`;

const query18 = `
SELECT
    a.Province,
    COUNT(DISTINCT f.FacilityId) AS total_facilities,
    COUNT(DISTINCT ef.EmployeeId) AS total_working_employees,
    (
        SELECT COUNT(DISTINCT PersonId) 
        FROM infection 
        WHERE active AND PersonId = ef.EmployeeId
    ) AS total_covid_infected_employees,
    f.Capacity,
    IFNULL(HOUR(SUM(TIMEDIFF(s.EndTime, s.StartTime))), 0) AS total_scheduled_hours
FROM 
    address AS a
JOIN 
    facility AS f ON a.AddressId = f.AddressId
LEFT JOIN 
    employeefacility AS ef ON f.FacilityId = ef.FacilityId AND ef.EndDate IS NULL
LEFT JOIN 
    schedule AS s ON ef.EmployeeId = s.EmployeeId AND s.StartTime >= '2016-01-01 00:00:00' AND s.EndTime <= '2018-12-31 23:59:59'
GROUP BY 
    a.Province
ORDER BY 
    a.Province ASC;
`;



/***************************EXECUTING QUERIES 8 to 21*************************/
app.get('/query/:nb', (req, res) => {
  const nb = req.params.nb;
  let query = '';
  /*switch statement to set query based on nb of query recieved in request */
  switch(nb) {
    case '8': 
      query = query8;
      break;
    case '9': 
      query = query9;
      break;
    case '10': 
      query = query10;
      break;
    case '11':
        query = query11;;
        break; 
    case '12': 
        query = query12;
        break;
    case '13': 
        query = query13;
        break;
    case '14': 
        query = query14;
        break;
    case '15':
        query = query15;
        break; 
    case '16': 
        query = query16;
        break;
    case '17':
        query = query17;
        break; 
    case '18': 
        query = query18;
        break;
    default:
      res.status(400).json({ error: 'Invalid query number' });
      return;
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});