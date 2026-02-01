console.log('🔥 emergencyType.controller.js LOADED');

const db = require('../db');

// GET ALL
exports.getAllEmergencyTypes = (req, res) => {
    const sql = `
        SELECT emergency_type_id, emergency_name, severity_level
        FROM emergency_type
        ORDER BY emergency_name
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// CREATE
exports.createEmergencyType = (req, res) => {
    const { emergency_name, severity_level } = req.body;

    const sql = `
        INSERT INTO emergency_type (emergency_name, severity_level)
        VALUES (?, ?)
    `;

    db.query(sql, [emergency_name, severity_level], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Emergency type created' });
    });
};

// UPDATE
exports.updateEmergencyType = (req, res) => {
    const { id } = req.params;
    const { emergency_name, severity_level } = req.body;

    const sql = `
        UPDATE emergency_type
        SET emergency_name = ?, severity_level = ?
        WHERE emergency_type_id = ?
    `;

    db.query(sql, [emergency_name, severity_level, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Emergency type updated' });
    });
};

// DELETE
exports.deleteEmergencyType = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM emergency_type
        WHERE emergency_type_id = ?
    `;

    db.query(sql, [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Emergency type deleted' });
    });
};

