const express = require('express');
const router = express.Router();
const { getNotices, createNotice, editNotice, removeNotice } = require('../controllers/noticeController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getNotices);
router.post('/', verifyToken, createNotice);
router.put('/:id', verifyToken, editNotice);
router.delete('/:id', verifyToken, removeNotice);

module.exports = router;