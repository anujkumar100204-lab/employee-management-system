// require('dotenv').config();
// const express = require('express');
// const db = require('./config/db');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('Vertex Technologies EMS Backend is running!');
// });

// app.use('/api/auth', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Vertex Technologies EMS Backend is running!');
});

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});