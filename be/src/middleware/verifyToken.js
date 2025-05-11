const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware untuk memverifikasi token JWT dari header authorization
module.exports = (req, res, next) => {
    // Mengambil header authorization dari request
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ success: false, message: "No token" });

    const token = authHeader.split(' ')[1];
    try {
        // Verifikasi token menggunakan secret dari .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Menambahkan data user ke request untuk dipakai di controller
        req.user = decoded;
        next(); // Lanjut program
    } catch (err) {
        res.status(403).json({ success: false, message: "Invalid token" });
    }
};