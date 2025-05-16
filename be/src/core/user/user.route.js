const express = require('express');
const multer = require('multer');
const router = express.Router();
const userController = require('./user.controller');
const verifyToken = require('../../middleware/verifyToken');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('profile_picture'), userController.register);
router.post('/login', userController.login);
router.get('/profile', verifyToken, userController.getProfile);
router.get('/get', userController.getUsers);
router.patch('/profile', verifyToken, upload.single('profile_picture'), userController.updateProfile);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;