const express = require('express');
const router = express.Router();
const groupController = require('./group.controller');
const verifyToken = require('../../middleware/verifyToken');

router.post('/', verifyToken, groupController.createGroup);
router.post('/addmember', verifyToken, groupController.addMemberByUsername);
router.delete('/:group_id/members/:username', verifyToken, groupController.removeMemberByUsername);
router.get('/:group_id/members', verifyToken, groupController.getGroupMembers);
router.get('/mygroups', verifyToken, groupController.getUserGroups);
router.delete('/:group_id', verifyToken, groupController.deleteGroup);

router.post('/:group_id/comments', verifyToken, groupController.addGroupComment);
router.get('/:group_id/comments', verifyToken, groupController.getGroupComments);

module.exports = router;