const express = require('express');
const router = express.Router();
const pomodoroController = require('./pomodoro.controller');
const verifyToken = require('../../middleware/verifyToken');

router.post('/done', verifyToken, pomodoroController.saveSession);
router.get('/summary', verifyToken, pomodoroController.getSummary);
router.get('/history', verifyToken, pomodoroController.getHistory);
router.delete('/:id', verifyToken, pomodoroController.deleteSession);

module.exports = router;