const { query } = require('../../database/pg.database');

// Menyimpan task baru
exports.createTask = async ({ group_id, title, description, status, deadline, assigned_to }) => {
    const result = await query(
        `INSERT INTO tasks (group_id, title, description, status, deadline, assigned_to)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [group_id, title, description, status || 'todo', deadline, assigned_to]
    );
    return result.rows[0];
};

// Mengambil semua task di grup
exports.getTasksByGroup = async (group_id) => {
    const result = await query(
        `SELECT * FROM tasks WHERE group_id = $1 ORDER BY created_at`,
        [group_id]
    );
    return result.rows;
};

// Mengambil salah satu task di grup
exports.getTaskById = async (id) => {
    const result = await query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    return result.rows[0];
};

// Update task tertentu
exports.updateTask = async (id, updates) => {
    const fields = [];
    const values = [];
    let i = 1;

    for (const key in updates) {
        fields.push(`${key} = $${i++}`);
        values.push(updates[key]);
    }
    values.push(id);

    const result = await query(
        `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${i} RETURNING *`,
        values
    );
    return result.rows[0];
};

// Hapus task tertentu
exports.deleteTask = async (id) => {
    const result = await query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

// Mengambil rincian dari task tertentu
exports.getTaskById = async (id) => {
    const result = await query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    return result.rows[0];
};

// Mengambil ringkasan jumlah task per status dalam suatu grup
exports.getTaskSummaryByGroup = async (group_id) => {
    const result = await query(`
        SELECT status, COUNT(*) as count
        FROM tasks
        WHERE group_id = $1
        GROUP BY status
    `, [group_id]);
    return result.rows;
};

// Mengambil task berdasarkan status
exports.getFilteredTasks = async (group_id, status) => {
    let queryText = `SELECT * FROM tasks WHERE group_id = $1`;
    let values = [group_id];

    if (status) {
        queryText += ` AND status = $2`;
        values.push(status);
    }

    queryText += ` ORDER BY created_at`;

    const result = await query(queryText, values);
    return result.rows;
};

// Menghitung jumlah task selesai dan total dalam satu grup, serta persentasenya
exports.getTaskProgress = async (group_id) => {
    const result = await query(`
        SELECT 
            COUNT(*) FILTER (WHERE status = 'done') AS completed,
            COUNT(*) AS total
        FROM tasks
        WHERE group_id = $1
    `, [group_id]);

    const { completed, total } = result.rows[0];
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed: parseInt(completed), total: parseInt(total), percentage };
};