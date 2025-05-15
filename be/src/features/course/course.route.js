const express = require('express');
const multer = require('multer');
const router = express.Router();
const courseController = require('./course.controller');
const verifyToken = require('../../middleware/verifyToken');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', verifyToken, courseController.createCourse);
router.delete('/:id', verifyToken, courseController.deleteCourse);
router.post('/material', verifyToken, courseController.createCourseMaterial);
router.delete('/material/:id', verifyToken, courseController.deleteCourseMaterial);
router.post('/quiz', verifyToken, upload.single('quiz_image'), courseController.createCourseQuiz);
router.delete('/quiz/:id', verifyToken, courseController.deleteCourseQuiz);
router.post('/quiz/answer', verifyToken, courseController.answerQuiz);

router.get('/:id', verifyToken, courseController.getCourseById);
router.get('/', verifyToken, courseController.getAllCourses);
router.get('/level/:level', verifyToken, courseController.getCoursesByLevel);
router.get('/level/:level/progress', verifyToken, courseController.getLevelProgress);

module.exports = router;