const db = require('../database/pg.database');

// Middleware untuk memastikan user adalah anggota grup
module.exports = async function checkGroupMembership(req, res, next) {
    const userId = req.user.user_id;
    
    // Mengambil group_id dari parameter atau body
    const groupId = req.params.group_id || req.body.group_id;
    if (!groupId) {
        return res.status(400).json({ success: false, message: "Group ID is required" });
    }

    try {
        // Cek apakah user adalah anggota grup
        const result = await db.query(
            `SELECT * FROM group_members WHERE user_id = $1 AND group_id = $2`,
            [userId, groupId]
        );

        if (result.rows.length === 0) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        next(); // Lanjut program
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};