const db = require('../db');


exports.getAllStudents = (req, res) => {
  const { query, grade, visit } = req.query;

  let sql = `
    SELECT 
      s.user_id,
      s.student_number,
      s.class_id,
      MAX(v.visit_date) AS last_visit_date
    FROM students s
    LEFT JOIN visits v ON s.user_id = v.student_id
  `;

  const conditions = [];
  const params = [];

  if (grade) {
    conditions.push('s.class_id = ?');
    params.push(grade);
  }

  if (query) {
    conditions.push('s.student_number LIKE ?');
    params.push(`%${query}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' GROUP BY s.user_id, s.student_number, s.class_id ORDER BY s.student_number;';

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(results);
  });
};


exports.getStudentbyId = (req, res) => {
    const user_id = req.params.id;

    const query =`
        SELECT student_number,
        class_id,
        parent_name,
        parent_contact 
        FROM students
        WHERE user_id = ?
    `;

     db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(results[0]);
    });
};