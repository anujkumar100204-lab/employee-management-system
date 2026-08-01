const db = require('../config/db');

const getAllDepartments = (callback) => {
  const query = `
    SELECT 
      departments.id, 
      departments.department_name,
      COUNT(employees.id) AS employee_count
    FROM departments
    LEFT JOIN employees ON employees.department_id = departments.id
    GROUP BY departments.id, departments.department_name
  `;

  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const addDepartment = (department_name, callback) => {
  const query = 'INSERT INTO departments (department_name) VALUES (?)';

  db.query(query, [department_name], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const updateDepartment = (id, department_name, callback) => {
  const query = 'UPDATE departments SET department_name = ? WHERE id = ?';

  db.query(query, [department_name, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const deleteDepartment = (id, callback) => {
  const query = 'DELETE FROM departments WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

module.exports = { getAllDepartments, addDepartment, updateDepartment, deleteDepartment };