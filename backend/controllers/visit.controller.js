const db = require('../db');

exports.addVisit = (req, res) => {
    const { 
        student_id,
        reason,
        emergency_type_id,
        visit_date,
        notes
    } = req.body;

    const nurse_id = req.user_id;


    if (!student_id || !reason || !emergency_type || !visit_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        INSERT INTO visits (
        student_id,
        nurse_id,
        visit_date,
        reason,
        emergency_type_id,
        notes
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            student_id,
            nurse_id,
            visit_date,
            reason,
            emergency_type_id,
            notes || null
        ],
        (err, result) => {
            if (err) return res.status(500).json({ error:err.message });

            res.status(201).json({
                message: 'Visit added successfully',
                visit_id: result.insertId
            });
        }
    );
};

exports.updateVisit = (req, res) => {
    const visit_id = req.params.id;

    const {
        reason,
        emergency_type_id,
        visit_date,
        notes
    } = req.body;

    if (!reason || !emergency_type || !visit_date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        UPDATE visits
        SET
            reason = ?,
            emergency_type_id = ?,
            visit_date = ?,
            notes = ?
        WHERE visit_id = ?
    `;

    db.query(
        query,
        [
            reason,
            emergency_type_id,
            visit_date,
            notes || null,
            visit_id
        ],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Visit not found' });
            }

            const auditQuery = `
                INSERT INTO audit_logs (
                    user_id,
                    action, 
                    entity, 
                    entity_id,
                    timestamp
                )
                VALUES (?, 'UPDATE', 'VISIT', ?, NOW())
            `;

            db.query(auditQuery, [req.user_id, visit_id], err => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({ message: 'Visit updated successfully' });
            });
        }
    );
};