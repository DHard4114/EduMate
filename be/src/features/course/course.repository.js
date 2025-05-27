const { query } = require('../../database/pg.database');

// Manambahkan course baru
exports.createCourse = async ({ title, level, description }) => {
    const result = await query(
        `INSERT INTO courses (title, level, description) VALUES ($1, $2, $3) RETURNING *`,
        [title, level, description]
    );
    return result.rows[0];
};

// Menghapus course
exports.deleteCourse = async (id) => {
    const result = await query(`DELETE FROM courses WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

// Menambahkan materi (text/video)
exports.createCourseMaterial = async ({ course_id, title, type,  content, order_number }) => {
    if (!["text", "video"].includes(type)) throw new Error("Invalid material type");
    const result = await query(
        `INSERT INTO course_materials (course_id, title, type, content, order_number)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [course_id, title, type, content, order_number]
    );
    return result.rows[0];
};

// Menghapus materi
exports.deleteCourseMaterial = async (id) => {
    const result = await query(`DELETE FROM course_materials WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

// Membuat soal kuis
exports.createCourseQuiz = async ({ course_id, question, options, correct_answer, quiz_image_url }) => {
    const result = await query(
        `INSERT INTO course_quizzes (course_id, question, options, correct_answer, quiz_image_url)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [course_id, question, options, correct_answer, quiz_image_url]
    );
    return result.rows[0];
};

// Menghapus soal kuis
exports.deleteCourseQuiz = async (id) => {
    const result = await query(`DELETE FROM course_quizzes WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

// Menyimpan jawaban kuis dalam suatu course
exports.answerQuiz = async ({ user_id, quiz_id, selected_answer }) => {
    const result = await query(`
        INSERT INTO quiz_answers (user_id, quiz_id, selected_answer)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, quiz_id)
        DO UPDATE SET selected_answer = $3, answered_at = NOW()
        RETURNING *;
    `, [user_id, quiz_id, selected_answer]);

    return result.rows[0];
};

// Menampilkan konten couse dan menghitung nilai dari jawaban kuis
exports.getCourseById = async (id, user_id) => {
    const course = await query(`SELECT * FROM courses WHERE id = $1`, [id]);
    const materials = await query(`SELECT * FROM course_materials WHERE course_id = $1 ORDER BY order_number`, [id]);
    const quizzes = await query(`SELECT * FROM course_quizzes WHERE course_id = $1`, [id]);

    // Menghitung skor kuis user
    let score = null;
    if (user_id) {
        const scoreResult = await query(`
            SELECT COUNT(*) FILTER (WHERE quiz_answers.selected_answer = course_quizzes.correct_answer) AS correct,
            COUNT(*) AS total
            FROM course_quizzes
            LEFT JOIN quiz_answers
            ON course_quizzes.id = quiz_answers.quiz_id AND quiz_answers.user_id = $1
            WHERE course_quizzes.course_id = $2
        `, [user_id, id]);

        const { correct, total } = scoreResult.rows[0];
        score = {
            correct: parseInt(correct),
            total: parseInt(total),
            percentage: total > 0 ? Math.round((correct / total) * 100) : 0
        };
    }

    return {
        ...course.rows[0],
        materials: materials.rows,
        quizzes: quizzes.rows,
        score
    };
};

// Mengambil semua course
exports.getAllCourses = async () => {
    const result = await query(`SELECT * FROM courses ORDER BY level`);
    return result.rows;
};

// Mengambil course berdasarkan level
exports.getCoursesByLevel = async (level) => {
    const result = await query(`
        SELECT * FROM courses
        WHERE level = $1
        ORDER BY created_at ASC
    `, [level]);
    return result.rows;
};

// Mengambil progress suatu level berdasarkan course yang sudah selesai
exports.getLevelProgress = async (user_id, level) => {
    // Mengambil semua course di level itu
    const courseResult = await query(`
        SELECT id FROM courses WHERE level = $1
    `, [level]);
    const allCourseIds = courseResult.rows.map(row => row.id);
    const total = allCourseIds.length;

    if (total === 0) {
        return { level, completed: 0, total: 0, percentage: 0, completed_course_ids: [] };
    }

    // Mengecek course yang sudah selesai (semua soal kuis dalam course tersebut terjawab)
    const finished = [];
    for (const course_id of allCourseIds) {
        const quizCountRes = await query(`
            SELECT COUNT(*) FROM course_quizzes WHERE course_id = $1
        `, [course_id]);
        const totalQuiz = parseInt(quizCountRes.rows[0].count);
        if (totalQuiz === 0) continue;

        const answeredRes = await query(`
            SELECT COUNT(*) FROM quiz_answers
            WHERE user_id = $1 AND quiz_id IN (
                SELECT id FROM course_quizzes WHERE course_id = $2
            )
        `, [user_id, course_id]);
        const answered = parseInt(answeredRes.rows[0].count);

        if (answered === totalQuiz) {
            finished.push(course_id);
        }
    }

    const completed = finished.length;
    const percentage = Math.round((completed / total) * 100);

    return {
        level,
        completed,
        total,
        percentage,
        completed_course_ids: finished
    };
};

// Mengambil semua kuis dalam satu course
exports.getCourseQuizzes = async (course_id) => {
    const result = await query(`
        SELECT * FROM course_quizzes
        WHERE course_id = $1
        ORDER BY id ASC
    `, [course_id]);

    return result.rows;
};
