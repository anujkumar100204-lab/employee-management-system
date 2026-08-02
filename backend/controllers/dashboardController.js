const { getDashboardStats } = require('../models/dashboardModel');

const getDashboard = (req, res) => {
  getDashboardStats((err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(200).json(data);
  });
};

module.exports = { getDashboard };