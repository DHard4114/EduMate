const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');
const verifyToken = require('../../middleware/verifyToken');
const checkGroupMembership = require('../../middleware/checkGroupMembership');

router.post('/', verifyToken, checkGroupMembership, taskController.createTask);
router.get('/group/:group_id', verifyToken, checkGroupMembership, taskController.getTasksByGroup);
router.put('/:id', verifyToken, taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);
router.get('/:id', verifyToken, taskController.getTaskById);
router.get('/group/:group_id/summary', verifyToken, checkGroupMembership, taskController.getTaskSummaryByGroup);
router.get('/group/:group_id/filter', verifyToken, taskController.getFilteredTasks);
router.post('/:id/comments', verifyToken, taskController.addTaskComment);
router.get('/:id/comments', verifyToken, taskController.getTaskComments);

module.exports = router;