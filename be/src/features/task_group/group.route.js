const express = require('express');
const router = express.Router();
const groupController = require('./group.controller');
const verifyToken = require('../../middleware/verifyToken');

router.post('/', verifyToken, groupController.createGroup);
router.post('/addmember', verifyToken, groupController.addMemberByUsername);
router.get('/:group_id/members', verifyToken, groupController.getGroupMembers);
router.get('/mygroups', verifyToken, groupController.getUserGroups);

module.exports = router;