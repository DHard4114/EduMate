const groupRepo = require('./group.repository');

// Membuat tugas grup baru
exports.createGroup = async (req, res) => {
    try {
        const group = await groupRepo.createGroup({ name: req.body.name, created_by: req.user.user_id });
        // Menambahkan pembuat sebagai anggota grup
        await groupRepo.addMemberToGroup(group.id, req.user.user_id); // auto join ke group
        res.status(201).json({ success: true, message: "Group created", payload: group });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menambahkan member ke grup tertentu
exports.addMemberByUsername = async (req, res) => {
    try {
        const { group_id, username } = req.body;
        const added_by_id = req.user.user_id;

        const added = await groupRepo.addMemberToGroupByUsername({
            group_id,
            added_by_id,
            username
        });

        res.status(200).json({ success: true, message: "User added to group", payload: added });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Mengambil daftar anggota dari suatu grup
exports.getGroupMembers = async (req, res) => {
    try {
        const group_id = req.params.group_id;
        const members = await groupRepo.getGroupMembers(group_id);
        res.json({ success: true, message: "Members retrieved", payload: members });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil semua tugas grup yang user ikuti
exports.getUserGroups = async (req, res) => {
    try {
        const groups = await groupRepo.getGroupsByUser(req.user.user_id);
        res.json({ success: true, message: "Groups retrieved", payload: groups });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menghapus grup (hanya bisa oleh pembuat)
exports.deleteGroup = async (req, res) => {
    try {
        const group_id = req.params.group_id;
        const user_id = req.user.user_id;

        const deleted = await groupRepo.deleteGroup({ group_id, user_id });

        if (!deleted) {
            return res.status(403).json({ success: false, message: "Only group creator can delete this group" });
        }

        res.json({ success: true, message: "Group deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Menambahkan komentar ke grup
exports.addGroupComment = async (req, res) => {
    try {
        const comment = await groupRepo.addGroupComment({
            group_id: req.params.group_id,
            user_id: req.user.user_id,
            content: req.body.content
        });
        res.status(201).json({ success: true, message: "Group comment added", payload: comment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};

// Mengambil komentar dari grup
exports.getGroupComments = async (req, res) => {
    try {
        const comments = await groupRepo.getGroupComments(req.params.group_id);
        res.json({ success: true, message: "Group comments retrieved", payload: comments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, payload: null });
    }
};