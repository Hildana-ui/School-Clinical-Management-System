const db = require('../db');

exports.addPrescription = (req, res) => {
    const {
        visit_id,
        medication_id,
        dosage,
        frequency,
        duration,
        instructions
    } = req.body;

    if (!visit_id || !medication_id || !dosage) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        INSERT INTO prescriptions (
            visit_id,
            medication_id,
            dosage,
            frequency,
            duration,
            instructions
        )
        VALUES (?, ?, ?, ?, ?,?)
    `;

    db.query(
        query,
        [
            visit_id,
            medication_id,
            dosage,
            frequency,
            duration,
            instructions
        ],
        (err, result) => {
            if(err) {
                return res.status(500).json({ error: err.message });
            }


            res.status(201).json({
                message: 'Prescription added successfully',
                prescription_id: result.insertId
            });
        }
    );
};


exports.updatePrescription = (req, res) => {
    const prescription_id = req.params.id;

    const {
        medication_id,
        dosage,
        frequency,
        duration,
        instructions
    } = req.body;

    if (!medication || !dosage) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const query = `
        UPDATE prescriptions
        SET
            medication_id = ?,
            dosage = ?,
            frequency = ?,
            duration = ?,
            instructions = ?
        WHERE prescription_id = ?
    `;

    db.query(
        query,
        [
            medication_id,
            dosage,
            frequency,
            duration,
            instructions
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Prescription not found' });
            }


            const auditQuery = `
                INSERT INTO audit_log (
                    user_id,
                    action,
                    entity,
                    entity_id,
                    timestamp
                )
                VALUES (?, 'UPDATE', 'PRESCRIPTION', ?, NOW())
            `;

            db.query(auditQuery, [req.user_id, prescription_id], err => {
                if (err) return res.status(500).json({ error: err.message });
                
                res.json({ message: 'Prescription updated successfully' });
            });
        }
    );
};