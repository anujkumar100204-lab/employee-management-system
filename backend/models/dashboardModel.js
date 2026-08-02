const db = require('../config/db');

const getDashboardStats = (callback) => {
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM employees) AS total_employees,
      (SELECT COUNT(*) FROM departments) AS total_departments,
      (SELECT COUNT(*) FROM employees WHERE gender = 'male') AS male_employees,
      (SELECT COUNT(*) FROM employees WHERE gender = 'female') AS female_employees
  `;

  const chartQuery = `
    SELECT departments.department_name, COUNT(employees.id) AS employee_count
    FROM departments
    LEFT JOIN employees ON employees.department_id = departments.id
    GROUP BY departments.id, departments.department_name
  `;

  db.query(statsQuery, (err, statsResults) => {
    if (err) return callback(err, null);

    db.query(chartQuery, (err, chartResults) => {
      if (err) return callback(err, null);

      callback(null, {
        stats: statsResults[0],
        chartData: chartResults,
      });
    });
  });
};

module.exports = { getDashboardStats };