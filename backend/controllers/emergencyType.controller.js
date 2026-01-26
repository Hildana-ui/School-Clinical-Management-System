const db = require('../db');

exports.getAllEmergencyTypes = (req, res) => {
    const query = `
        SELECT emergency_type_id, name, description
        FROM emergency_types
        ORDER BY name
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }


        res.json(results);
    });
};