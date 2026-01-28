const db = require('../db');


exports.getAllStudents = (res) => {
    const query = `
        SELECT 
        student_number,
        class_id,
        visit_date 
        FROM students
        LEFT OUTER JOIN visit
        WHERE students.user_id = visit.user_id
        ORDER BY student_number
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });

};

exports.getStudentbyId = (req, res) => {
    const user_id = req.params.id;
    const [
        student_number,
        class_id,
        parent_name,
        parent_contact
    ] = req.body;

    const query =`
        SELECT student_number,
        class_id,
        parent_name,
        parent_contact 
        FROM students
        WHERE user_id = ?
    `;

    db.query( query,
        [
            user_id,
            student_number, 
            class_id, 
            parent_name, 
            parent_contact
        ], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
        }
    );
};