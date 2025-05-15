const courseRepo = require('./course.repository');

// Membuat course baru
exports.createCourse = async (req, res) => {
    try {
        const { title, level, description } = req.body;
        const created = await courseRepo.createCourse({ title, level, description });
        res.status(201).json({ success: true, message: "Course created", payload: created });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menghapus course
exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await courseRepo.deleteCourse(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Course not found or already deleted" });
        }
        res.json({ success: true, message: "Course deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Membuat materi (text/video)
exports.createCourseMaterial = async (req, res) => {
    try {
        const { course_id, type, content, order_number } = req.body;
        const material = await courseRepo.createCourseMaterial({ course_id, type, content, order_number });
        res.status(201).json({ success: true, message: "Material added", payload: material });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Menghapus materi
exports.deleteCourseMaterial = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await courseRepo.deleteCourseMaterial(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Material not found" });
        }
        res.json({ success: true, message: "Material deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Membuat soal kuis
exports.createCourseQuiz = async (req, res) => {
    try {
        const { course_id, question, options, correct_answer } = req.body;
        const quiz = await courseRepo.createCourseQuiz({ course_id, question, options, correct_answer });
        res.status(201).json({ success: true, message: "Quiz added", payload: quiz });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Menghapus soal kuis
exports.deleteCourseQuiz = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await courseRepo.deleteCourseQuiz(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Quiz not found" });
        }
        res.json({ success: true, message: "Quiz deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Menyimpan jawaban kuis dalam suatu course
exports.answerQuiz = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const { quiz_id, selected_answer } = req.body;

        const saved = await courseRepo.answerQuiz({ user_id, quiz_id, selected_answer });
        res.status(200).json({ success: true, message: "Answer saved", payload: saved });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Menampilkan konten course sekaligus menghitung skor kuis
exports.getCourseById = async (req, res) => {
    try {
        const course = await courseRepo.getCourseById(req.params.id, req.user.user_id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found", payload: null });
        }
        res.json({ success: true, message: "Course retrieved", payload: course });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil semua course
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseRepo.getAllCourses();
        res.json({ success: true, message: "Courses retrieved", payload: courses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil course berdasarkan level
exports.getCoursesByLevel = async (req, res) => {
    try {
        const level = req.params.level;
        const courses = await courseRepo.getCoursesByLevel(level);
        res.json({ success: true, message: "Courses retrieved by level", payload: courses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menampilkan progress dari suatu level
exports.getLevelProgress = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const level = req.params.level;

        const progress = await courseRepo.getLevelProgress(user_id, level);

        // naik level jika course level ini sudah selesai semua
        const { completed, total } = progress;
        const levelOrder = ['beginner', 'intermediate', 'advanced'];
        const currentLevelIndex = levelOrder.indexOf(level);
        const nextLevel = levelOrder[currentLevelIndex + 1];

        if (completed === total && total > 0 && nextLevel) {
            await userRepo.updateProfile(user_id, { level: nextLevel });
        }

        res.status(200).json({
            success: true,
            message: "Level progress retrieved",
            payload: progress
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};