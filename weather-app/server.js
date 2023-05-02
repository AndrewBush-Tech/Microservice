const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// CORS middleware to allow requests from your React app
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/quakes', async (req, res) => {
  const { time, lat, lon } = req.query;
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${time}&latitude=${lat}&longitude=${lon}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching earthquake data');
  }
});

// Serve the React app
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
