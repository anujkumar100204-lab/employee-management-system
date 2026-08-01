const db = require('../config/db');
const bcrypt = require('bcrypt');
const { getLastEmployeeId, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../models/employeeModel');

const generateNextEmployeeId = (lastId) => {
  if (!lastId) {
    return 'EMP001';
  }

  const numberPart = parseInt(lastId.replace('EMP', ''), 10);
  const nextNumber = numberPart + 1;
  const paddedNumber = String(nextNumber).padStart(3, '0');

  return `EMP${paddedNumber}`;
};

const addEmployee = (req, res) => {
  const { email, password, full_name, gender, department_id, phone, address, salary } = req.body;

  if (!email || !password || !full_name || !gender || !department_id || !salary) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  getLastEmployeeId((err, lastId) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }

    const newEmployeeId = generateNextEmployeeId(lastId);

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }

      const createUserQuery = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';

      db.query(createUserQuery, [email, hashedPassword, 'employee'], (err, userResult) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user', error: err.message });
        }

        const newUserId = userResult.insertId;

        const createEmployeeQuery = `
          INSERT INTO employees 
          (user_id, employee_id, full_name, gender, department_id, phone, address, salary) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [newUserId, newEmployeeId, full_name, gender, department_id, phone || null, address || null, salary];

        db.query(createEmployeeQuery, values, (err, employeeResult) => {
          if (err) {
            return res.status(500).json({ message: 'Error creating employee', error: err.message });
          }

          res.status(201).json({
            message: 'Employee added successfully',
            employee_id: newEmployeeId,
          });
        });
      });
    });
  });
};

const getEmployees = (req, res) => {
  getAllEmployees((err, employees) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(200).json(employees);
  });
};

const getEmployee = (req, res) => {
  const { id } = req.params;

  getEmployeeById(id, (err, employee) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  });
};

const editEmployee = (req, res) => {
  const { id } = req.params;
  const { full_name, phone, address, department_id, salary } = req.body;

  if (!full_name || !department_id || !salary) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  updateEmployee(id, { full_name, phone, address, department_id, salary }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  });
};

const removeEmployee = (req, res) => {
  const { id } = req.params;

  deleteEmployee(id, (err, success) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (!success) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
};

module.exports = { addEmployee, getEmployees, getEmployee, editEmployee, removeEmployee };