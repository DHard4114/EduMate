const pomodoroRepo = require('./pomodoro.repository');

// Menyimpan sesi Pomodoro
exports.saveSession = async (req, res) => {
    const { type, duration } = req.body;
    const allowed = ['pomodoro', 'short_break', 'long_break'];

    if (!allowed.includes(type) || !duration) {
        return res.status(400).json({ success: false, message: "Invalid input", payload: null });
    }

    try {
        const session = await pomodoroRepo.saveSession({
            user_id: req.user.user_id,
            type,
            duration
        });
        res.status(201).json({ success: true, message: "Session saved", payload: session });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil total durasi sesi Pomodoro (summary)
exports.getSummary = async (req, res) => {
    try {
        const summary = await pomodoroRepo.getSummary(req.user.user_id);
        res.json({ success: true, message: "Summary retrieved", payload: summary });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil seluruh riwayat sesi
exports.getHistory = async (req, res) => {
    try {
        const history = await pomodoroRepo.getHistory(req.user.user_id);
        res.json({ success: true, message: "History retrieved", payload: history });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menghapus sesi tertentu
exports.deleteSession = async (req, res) => {
    try {
        const deleted = await pomodoroRepo.deleteSession(req.params.id, req.user.user_id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Session not found", payload: null });
        }
        res.json({ success: true, message: "Session deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};