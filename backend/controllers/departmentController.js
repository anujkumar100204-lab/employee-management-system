const { getAllDepartments, addDepartment, updateDepartment, deleteDepartment } = require('../models/departmentModel');

const getDepartments = (req, res) => {
  getAllDepartments((err, departments) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(200).json(departments);
  });
};

const createDepartment = (req, res) => {
  const { department_name } = req.body;

  if (!department_name) {
    return res.status(400).json({ message: 'Department name is required' });
  }

  addDepartment(department_name, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(201).json({ message: 'Department added successfully' });
  });
};

const editDepartment = (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;

  if (!department_name) {
    return res.status(400).json({ message: 'Department name is required' });
  }

  updateDepartment(id, department_name, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department updated successfully' });
  });
};

const removeDepartment = (req, res) => {
  const { id } = req.params;

  deleteDepartment(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  });
};

module.exports = { getDepartments, createDepartment, editDepartment, removeDepartment };