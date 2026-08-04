const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployees,
  getEmployee,
  getMyProfile,
  updateMyProfile,
  editEmployee,
  removeEmployee,
} = require('../controllers/employeeController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, addEmployee);
router.get('/', verifyToken, getEmployees);
router.get('/me', verifyToken, getMyProfile);
router.put('/me', verifyToken, updateMyProfile);
router.get('/:id', verifyToken, getEmployee);
router.put('/:id', verifyToken, editEmployee);
router.delete('/:id', verifyToken, removeEmployee);

module.exports = router;