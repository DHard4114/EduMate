const db = require('../../database/pg.database');

// Membuat tugas grup baru dan mencatat siapa yang membuat
exports.createGroup = async ({ name, created_by }) => {
    const result = await db.query(
        `INSERT INTO task_groups (name, created_by) VALUES ($1, $2) RETURNING *`,
        [name, created_by]
    );
    return result.rows[0];
};

// Menambahkan user ke grup berdasarkan username (oleh anggota grup)
exports.addMemberToGroupByUsername = async ({ group_id, added_by_id, username }) => {
    // Cek keanggotaan user yang menambahkan
    const memberCheck = await db.query(
        `SELECT 1 FROM group_members WHERE group_id = $1 AND user_id = $2`,
        [group_id, added_by_id]
    );
    if (memberCheck.rowCount === 0) {
        throw new Error("Only group members can add others");
    }

    // Mencari user berdasarkan username (case-insensitive)
    const userResult = await db.query(
        `SELECT id FROM users WHERE LOWER(username) = LOWER($1)`,
        [username]
    );
    if (userResult.rowCount === 0) {
        throw new Error("User not found");
    }

    const newUserId = userResult.rows[0].id;

    // Menambahkan user ke grup jika belum jadi anggota
    const insert = await db.query(
        `INSERT INTO group_members (group_id, user_id)
         SELECT $1, $2
         WHERE NOT EXISTS (
            SELECT 1 FROM group_members WHERE group_id = $1 AND user_id = $2
         )
         RETURNING *`,
        [group_id, newUserId]
    );
    if (insert.rowCount === 0) {
        throw new Error("User is already a member of the group");
    }

    return insert.rows[0];
};

// Mengambil daftar anggota dari grup tertentu
exports.getGroupMembers = async (group_id) => {
    const result = await db.query(
        `SELECT users.id, users.name, users.username, users.email
         FROM group_members
         JOIN users ON users.id = group_members.user_id
         WHERE group_members.group_id = $1
         ORDER BY users.name`,
        [group_id]
    );
    return result.rows;
};

// Mengambil semua tugas grup yang user ikuti
exports.getGroupsByUser = async (user_id) => {
    const result = await db.query(
        `SELECT task_groups.* FROM task_groups
         JOIN group_members ON group_members.group_id = task_groups.id
         WHERE group_members.user_id = $1`,
        [user_id]
    );
    return result.rows;
};

// Menghapus grup (hanya bisa oleh pembuat)
exports.deleteGroup = async ({ group_id, user_id }) => {
    const result = await db.query(
        `DELETE FROM task_groups
         WHERE id = $1 AND created_by = $2
         RETURNING *`,
        [group_id, user_id]
    );
    return result.rowCount > 0;
};

// Menambahkan komentar untuk grup
exports.addGroupComment = async ({ group_id, user_id, content }) => {
    const result = await db.query(
        `INSERT INTO group_comments (group_id, user_id, content)
         VALUES ($1, $2, $3) RETURNING *`,
        [group_id, user_id, content]
    );
    return result.rows[0];
};

// Mengambil komentar grup
exports.getGroupComments = async (group_id) => {
    const result = await db.query(
        `SELECT group_comments.id, group_comments.content, group_comments.created_at, users.username
        FROM group_comments
        JOIN users ON users.id = group_comments.user_id
        WHERE group_comments.group_id = $1
        ORDER BY group_comments.created_at`,
        [group_id]
    );
    return result.rows;
};