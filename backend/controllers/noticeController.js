const { getAllNotices, addNotice, updateNotice, deleteNotice } = require('../models/noticeModel');

const getNotices = (req, res) => {
  getAllNotices((err, notices) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(200).json(notices);
  });
};

const createNotice = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  addNotice(title, description, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(201).json({ message: 'Notice added successfully' });
  });
};

const editNotice = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  updateNotice(id, title, description, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice updated successfully' });
  });
};

const removeNotice = (req, res) => {
  const { id } = req.params;

  deleteNotice(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({ message: 'Notice deleted successfully' });
  });
};

module.exports = { getNotices, createNotice, editNotice, removeNotice };