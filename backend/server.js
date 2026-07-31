require('dotenv').config();
const express = require('express');
const db = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Vertex Technologies EMS Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});