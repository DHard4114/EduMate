const db = require('../../database/pg.database');

// Membuat user baru
exports.createUser = async ({ name, username, email, hashedPassword, role, level, profile_picture_url }) => {
    try {
        const result = await db.query(
            `INSERT INTO users (name, username, email, password, role, level, profile_picture_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, name, username, email, role, level`,
            [name, username, email, hashedPassword, role, level, profile_picture_url]
        );
        return result.rows[0];
    } catch (err) {
        console.error(err);
        if (err.code === '23505') {
            if (err.detail.includes('username')) {
                throw new Error("USERNAME_EXISTS");
            }
            if (err.detail.includes('email')) {
                throw new Error("EMAIL_EXISTS");
            }
        }
        throw err;
    }
};

// Mencari user berdasarkan email (untuk login)
exports.findByEmail = async (email) => {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
};

// Mencari user berdasarkan ID
exports.findById = async (id) => {
    const result = await db.query(
        `SELECT id, name, username, email, role, level, profile_picture_url FROM users WHERE id = $1`,
        [id]
    );
    return result.rows[0];
};

exports.findByUsername = async (username) => {
    const result = await db.query(
        `SELECT * FROM users WHERE username = $1`, [username]
    );
    return result.rows[0];
}

exports.getAllUser = async () => {
    const result = await db.query(
        `SELECT * FROM users`
    );
    return result.rows;
}

// Update nama atau level user
exports.updateProfile = async (id, { name, level, profile_picture_url }) => {
    let updates = [];
    let values = [];
    let idx = 1;

    if (name) {
        updates.push(`name = $${idx++}`);
        values.push(name);
    }

    if (level) {
        updates.push(`level = $${idx++}`);
        values.push(level);
    }

    if (profile_picture_url) {
        updates.push(`profile_picture_url = $${idx++}`);
        values.push(profile_picture_url);
    }

    if (updates.length === 0) return null;
    values.push(id);

    const result = await db.query(
        `UPDATE users 
         SET ${updates.join(', ')} 
         WHERE id = $${idx} 
         RETURNING id, name, username, email, level, role, profile_picture_url`,
        values
    );

    return result.rows[0];
};

// Hapus user berdasarkan ID
exports.deleteById = async (id) => {
    const result = await db.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};