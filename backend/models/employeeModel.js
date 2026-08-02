const db = require('../config/db');

const getLastEmployeeId = (callback) => {
  const query = 'SELECT employee_id FROM employees ORDER BY id DESC LIMIT 1';

  db.query(query, (err, results) => {
    if (err) return callback(err, null);

    if (results.length === 0) {
      return callback(null, null);
    }

    callback(null, results[0].employee_id);
  });
};

const getAllEmployees = (filters, callback) => {
  let query = `
    SELECT 
      employees.id, 
      employees.employee_id, 
      employees.full_name, 
      employees.gender, 
      employees.phone, 
      employees.salary,
      departments.department_name,
      employees.department_id
    FROM employees
    JOIN departments ON employees.department_id = departments.id
    WHERE 1=1
  `;

  const values = [];

  if (filters.search) {
    query += ' AND (employees.full_name LIKE ? OR employees.employee_id LIKE ?)';
    values.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  if (filters.department_id) {
    query += ' AND employees.department_id = ?';
    values.push(filters.department_id);
  }

  db.query(query, values, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const getEmployeeById = (id, callback) => {
  const query = `
    SELECT 
      employees.*, 
      departments.department_name
    FROM employees
    JOIN departments ON employees.department_id = departments.id
    WHERE employees.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

const updateEmployee = (id, data, callback) => {
  const query = `
    UPDATE employees 
    SET full_name = ?, phone = ?, address = ?, department_id = ?, salary = ?
    WHERE id = ?
  `;

  const values = [data.full_name, data.phone, data.address, data.department_id, data.salary, id];

  db.query(query, values, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const deleteEmployee = (id, callback) => {
  const getUserIdQuery = 'SELECT user_id FROM employees WHERE id = ?';

  db.query(getUserIdQuery, [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);

    const userId = results[0].user_id;

    const deleteEmployeeQuery = 'DELETE FROM employees WHERE id = ?';

    db.query(deleteEmployeeQuery, [id], (err) => {
      if (err) return callback(err, null);

      const deleteUserQuery = 'DELETE FROM users WHERE id = ?';

      db.query(deleteUserQuery, [userId], (err) => {
        if (err) return callback(err, null);
        callback(null, true);
      });
    });
  });
};

module.exports = { getLastEmployeeId, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };