const express = require('express');
const cors = require('cors');
const router = express.Router();

// Define an endpoint to fetch brokers
// router.get("/brokers", async (req, res) => {
//     try {
//       const brokers = await Broker.find();
//       res.json(brokers);
//     } catch (error) {
//       console.error("Error fetching brokers:", error);
//       res.status(500).json({ status: 'error', error: 'Internal server error' });
//     }
//   });



// app.get('/api/persons', (req, res) => {
//     connection.query('SELECT * FROM person', (error, results) => {
//       if (error) {
//         res.status(500).json({ error });
//       } else {
//         res.json(results);
//       }
//     });
//   });


  // API endpoint to fetch data from MySQL table
  router.get('/personData', (req, res) => {
    // Perform database query to fetch data from MySQL table
    const query = 'SELECT * FROM person';
  
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


module.exports = router;