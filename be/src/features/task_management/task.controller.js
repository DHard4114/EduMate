const taskRepo = require('./task.repository');
const { query } = require('../../database/pg.database');

// Membuat task baru dalam suatu grup (harus anggota grup)
exports.createTask = async (req, res) => {
    const { group_id, title } = req.body;
    if (!group_id || !title) {
        return res.status(400).json({ success: false, message: "group_id and title are required", payload: null });
    }

    try {
        const member = await query(`SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2`, [group_id, req.user.user_id]);
        if (member.rows.length === 0) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        const task = await taskRepo.createTask(req.body);
        res.status(201).json({ success: true, message: "Task created", payload: task });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Mengambil semua task dalam satu grup
exports.getTasksByGroup = async (req, res) => {
    try {
        const tasks = await taskRepo.getTasksByGroup(req.params.group_id);
        res.json({ success: true, message: "Tasks retrieved", payload: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Update task tertentu
exports.updateTask = async (req, res) => {
    try {
        const task = await taskRepo.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found", payload: null });

        const member = await query(`SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2`, [task.group_id, req.user.user_id]);
        if (member.rows.length === 0) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        const updated = await taskRepo.updateTask(req.params.id, req.body);
        res.json({ success: true, message: "Task updated", payload: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Menghapus task tertentu
exports.deleteTask = async (req, res) => {
    try {
        const task = await taskRepo.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found", payload: null });

        const member = await query(`SELECT * FROM group_members WHERE group_id = $1 AND user_id = $2`, [task.group_id, req.user.user_id]);
        if (member.rows.length === 0) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        const deleted = await taskRepo.deleteTask(req.params.id);
        res.json({ success: true, message: "Task deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Mendapatkan task berdasarkan ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await taskRepo.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ success: false, message: "Task not found", payload: null });
        res.json({ success: true, message: "Task retrieved", payload: task });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Mendapatkan ringkasan task per status
exports.getTaskSummaryByGroup = async (req, res) => {
    try {
        const summary = await taskRepo.getTaskSummaryByGroup(req.params.group_id);
        res.json({ success: true, message: "Task summary", payload: summary });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Mendapatkan task dengan filter berdasarkan status
exports.getFilteredTasks = async (req, res) => {
    try {
        const { status } = req.query;
        const tasks = await taskRepo.getFilteredTasks(req.params.group_id, status);
        res.json({ success: true, message: "Filtered tasks", payload: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Menambahkan komentar ke task
exports.addTaskComment = async (req, res) => {
    try {
        const comment = await taskRepo.addTaskComment({
            task_id: req.params.id,
            user_id: req.user.user_id,
            content: req.body.content
        });
        res.status(201).json({ success: true, message: "Comment added", payload: comment });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};

// Mengambil semua komentar dari task
exports.getTaskComments = async (req, res) => {
    try {
        const comments = await taskRepo.getTaskComments(req.params.id);
        res.json({ success: true, message: "Comments retrieved", payload: comments });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", payload: null });
    }
};