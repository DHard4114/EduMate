const userRepo = require('./user.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrasi user baru
exports.register = async (req, res) => {
    const { name, username, email, password, level, role } = req.body;

    // Validasi panjang password
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long.",
            payload: null
        });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await userRepo.createUser({ 
            name, 
            username, 
            email, 
            hashedPassword: hashed, 
            role, 
            level 
        });
        res.status(201).json({ success: true, message: "User registered", payload: user });
    } catch (err) {
        if (err.message === "EMAIL_EXISTS") {
            return res.status(400).json({ success: false, message: "Email already exists", payload: null });
        }
        if (err.message === "USERNAME_EXISTS") {
            return res.status(400).json({ success: false, message: "Username already exists", payload: null });
        }
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Login dan generate JWT token
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user;

        // Cek apakah input adalah email (mengandung "@")
        if (email.includes('@')) {
            user = await userRepo.findByEmail(email);
        } else {
            user = await userRepo.findByUsername(email);
        }

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials", payload: null });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: "Invalid credentials", payload: null });
        }

        const token = jwt.sign(
            { user_id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '6h' }
        );

        res.json({ success: true, message: "Login successful", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Mendapatkan data profil user yang sedang login
exports.getProfile = async (req, res) => {
    try {
        const user = await userRepo.findById(req.user.user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found", payload: null });
        }
        res.json({ success: true, message: "Profile retrieved", payload: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Update nama dan level user
exports.updateProfile = async (req, res) => {
    const { name, level } = req.body;

    const allowedLevels = ['beginner', 'intermediate', 'advanced'];
    if (level && !allowedLevels.includes(level)) {
        return res.status(400).json({ success: false, message: "Invalid level", payload: null });
    }

    try {
        const updated = await userRepo.updateProfile(req.user.user_id, { name, level });
        res.json({ success: true, message: "Profile updated", payload: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Menghapus user berdasarkan ID
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await userRepo.deleteById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found", payload: null });
        }
        res.json({ success: true, message: "User deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};