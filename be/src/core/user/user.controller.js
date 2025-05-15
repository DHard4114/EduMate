const userRepo = require('./user.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cloudinary = require('../../utils/cloudinary');

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
        let profile_picture_url = null;

        // Upload gambar ke cloudinary (jika ada)
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'profile_pictures' },
                    (err, result) => {
                        if (err) return reject(new Error("Image upload failed"));
                        resolve(result);
                    }
                ).end(req.file.buffer);
            });

            profile_picture_url = uploadResult.secure_url;
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await userRepo.createUser({ 
            name, 
            username, 
            email, 
            hashedPassword: hashed, 
            role, 
            level,
            profile_picture_url
        });
        res.status(201).json({ success: true, message: "User registered", payload: user });
    } catch (err) {
        if (err.message === "EMAIL_EXISTS") {
            return res.status(400).json({ success: false, message: "Email already exists", payload: null });
        }
        if (err.message === "USERNAME_EXISTS") {
            return res.status(400).json({ success: false, message: "Username already exists", payload: null });
        }
        res.status(500).json({ success: false, message: err.message, payload: null });
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

        res.json({ success: true, message: "Login successful", token, user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            level: user.level,
            profile_picture_url: user.profile_picture_url
        } });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: err.message, payload: null });
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
        res.status(500).json({ success: false, message: err.message, payload: null });
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
        let profile_picture_url = null;

        // Upload foto profil baru (jika ada)
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'profile_pictures' },
                    (err, result) => {
                        if (err) return reject(new Error("Image upload failed"));
                        resolve(result);
                    }
                ).end(req.file.buffer);
            });

            profile_picture_url = uploadResult.secure_url;
        }
        else {
            // Menggunakan foto profil lama jika tidak upload yang baru
            const existing = await userRepo.findById(req.user.user_id);
            profile_picture_url = existing.profile_picture_url;
        }

        const updated = await userRepo.updateProfile(req.user.user_id, { name, level, profile_picture_url });
        res.json({ success: true, message: "Profile updated", payload: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
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
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};