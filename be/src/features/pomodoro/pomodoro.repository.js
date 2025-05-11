const db = require('../../database/pg.database');

// Menyimpan data sesi Pomodoro ke database
exports.saveSession = async ({ user_id, type, duration }) => {
    const result = await db.query(
        `INSERT INTO pomodoro_sessions (user_id, type, duration_minutes)
         VALUES ($1, $2, $3) RETURNING *`,
        [user_id, type, duration]
    );
    return result.rows[0];
};

// Mengambil total durasi untuk sesi 'pomodoro' yang telah dilakukan user
exports.getSummary = async (user_id) => {
    const result = await db.query(
        `SELECT COALESCE(SUM(duration_minutes), 0) AS total_minutes
         FROM pomodoro_sessions
         WHERE user_id = $1 AND type = 'pomodoro'`,
        [user_id]
    );
    return result.rows[0];
};

// Mengambil riwayat sesi user berdasarkan waktu mulai
exports.getHistory = async (user_id) => {
    const result = await db.query(
        `SELECT * FROM pomodoro_sessions
         WHERE user_id = $1
         ORDER BY started_at DESC`,
        [user_id]
    );
    return result.rows;
};

// Menghapus sesi berdasarkan ID dan user yang bersangkutan
exports.deleteSession = async (id, user_id) => {
    const result = await db.query(
        `DELETE FROM pomodoro_sessions
         WHERE id = $1 AND user_id = $2
         RETURNING *`,
        [id, user_id]
    );
    return result.rows[0];
};