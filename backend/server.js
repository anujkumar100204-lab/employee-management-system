require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const salaryRoutes = require('./routes/salaryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Vertex Technologies EMS Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/salary', salaryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});