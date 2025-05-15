const taskRepo = require('./task.repository');

// Membuat task baru dalam suatu grup (harus anggota grup)
exports.createTask = async (req, res) => {
    const { group_id, title, description, status, deadline, assigned_to } = req.body;

    if (!group_id || !title) {
        return res.status(400).json({ success: false, message: "group_id and title are required", payload: null });
    }

    try {
        const isMember = await taskRepo.checkGroupMembership(group_id, req.user.user_id);
        if (!isMember) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        const task = await taskRepo.createTask({ 
            group_id, 
            title, 
            description, 
            status, 
            deadline, 
            assigned_to 
        });
        res.status(201).json({ success: true, message: "Task created", payload: task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil semua task dalam satu grup
exports.getTasksByGroup = async (req, res) => {
    try {
        const tasks = await taskRepo.getTasksByGroup(req.params.group_id);
        res.json({ success: true, message: "Tasks retrieved", payload: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Update task tertentu
exports.updateTask = async (req, res) => {
    try {
        const task = await taskRepo.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found", payload: null });
        }

        const isMember = await taskRepo.checkGroupMembership(task.group_id, req.user.user_id);
        if (!isMember) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        const updated = await taskRepo.updateTask(req.params.id, req.body);
        res.json({ success: true, message: "Task updated", payload: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menghapus task tertentu
exports.deleteTask = async (req, res) => {
    try {
        const task = await taskRepo.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found", payload: null });
        }

        const isMember = await taskRepo.checkGroupMembership(task.group_id, req.user.user_id);
        if (!isMember) {
            return res.status(403).json({ success: false, message: "You are not a member of this group" });
        }

        const deleted = await taskRepo.deleteTask(req.params.id);
        res.json({ success: true, message: "Task deleted", payload: deleted });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mendapatkan task berdasarkan ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await taskRepo.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found", payload: null });
        }
        res.json({ success: true, message: "Task retrieved", payload: task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mendapatkan ringkasan task per status
exports.getTaskSummaryByGroup = async (req, res) => {
    try {
        const summary = await taskRepo.getTaskSummaryByGroup(req.params.group_id);
        res.json({ success: true, message: "Task summary", payload: summary });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mendapatkan task dengan filter berdasarkan status
exports.getFilteredTasks = async (req, res) => {
    try {
        const { status } = req.query;
        const tasks = await taskRepo.getFilteredTasks(req.params.group_id, status);
        res.json({ success: true, message: "Filtered tasks", payload: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil progress task dalam task group
exports.getTaskProgress = async (req, res) => {
    try {
        const { group_id } = req.params;
        const progress = await taskRepo.getTaskProgress(group_id);
        res.json({ success: true, message: "Task progress retrieved", payload: progress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};