const db = require('../config/db');

const getAllNotices = (callback) => {
  const query = 'SELECT * FROM notices ORDER BY created_at DESC';

  db.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const addNotice = (title, description, callback) => {
  const query = 'INSERT INTO notices (title, description) VALUES (?, ?)';

  db.query(query, [title, description], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const updateNotice = (id, title, description, callback) => {
  const query = 'UPDATE notices SET title = ?, description = ? WHERE id = ?';

  db.query(query, [title, description, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

const deleteNotice = (id, callback) => {
  const query = 'DELETE FROM notices WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

module.exports = { getAllNotices, addNotice, updateNotice, deleteNotice };