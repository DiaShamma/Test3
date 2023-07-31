// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/fetch-data', async (req, res) => {
  const celestialObjectName = req.query.objectName;
  const API_KEY = '73dc8c89c9msh22eeca55100af21p1006f1jsn303a4b2d5156'; // Replace with your actual RapidAPI key
  const API_URL = `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/${celestialObjectName}`;

  try {
    const response = await fetch(API_URL, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
