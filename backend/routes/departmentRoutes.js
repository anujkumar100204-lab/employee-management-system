const express = require('express');
const router = express.Router();
const { getDepartments, createDepartment, editDepartment, removeDepartment } = require('../controllers/departmentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getDepartments);
router.post('/', verifyToken, createDepartment);
router.put('/:id', verifyToken, editDepartment);
router.delete('/:id', verifyToken, removeDepartment);

module.exports = router;