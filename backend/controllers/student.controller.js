const db = require('../db');


exports.getAllStudents = (req, res) => {
  const { query, grade, visit } = req.query;

  let sql = `
    SELECT 
      s.user_id,
      s.student_number,
      u.username AS student_name,
      c.grade,
      c.section,
      MAX(v.visit_date) AS last_visit_date
    FROM student s
    JOIN users u ON s.user_id = u.user_id
    LEFT JOIN class c ON s.class_id = c.class_id
    LEFT JOIN visit v ON s.user_id = v.student_id
  `;

  const conditions = [];
  const params = [];

  if (grade) {
    conditions.push('c.grade = ?'); // filter by grade from class table
    params.push(grade);
  }

  if (query) {
    conditions.push('(s.student_number LIKE ? OR u.username LIKE ?)');
    params.push(`%${query}%`, `%${query}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' GROUP BY s.user_id, s.student_number, u.username, c.grade, c.section';
  sql += ' ORDER BY s.student_number;';
  console.log('SQL:', sql, 'Params:', params); 

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('DB error in getAllStudents:', err);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};



exports.getStudentbyId = (req, res) => {
    const user_id = req.params.id;

    const query =`
        SELECT 
            s.student_number,
            s.parent_name,
            s.parent_contact,
            c.grade,
            c.section
        FROM student s
        JOIN class c ON s.class_id = c.class_id
        WHERE s.user_id = ?
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

exports.getStudentInfoById = (req, res) => {
    const user_id = req.params.id;

    const query = `
        SELECT s.student_id, u.username AS full_name
        FROM student s
        JOIN users u ON s.user_id = u.user_id
        WHERE s.user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const student = results[0];
        student.student_name = student.student_name
            .split(/\s+/)
            .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
            .join(' ');

        res.json(student);
    });
};


exports.completeStudentProfile = (req, res) => {
  const { user_id } = req.params;
  const {
    student_number,
    parent_name,
    parent_contact,
    grade,
    section
  } = req.body;

  const classQuery = `
    SELECT class_id
    FROM class
    WHERE grade = ? AND section = ?
  `;

  db.query(classQuery, [grade, section], (err, classResult) => {
    if (err) {
      console.error('DB error in completeProfile:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!classResult.length)
      return res.status(400).json({ message: 'Class not found' });

    const class_id = classResult[0].class_id;

    const insertQuery = `
      INSERT INTO student
      (user_id, student_number, parent_name, parent_contact, class_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [user_id, student_number, parent_name, parent_contact, class_id],
      (err) => {
        if (err) return res.status(500).json({ message: 'Insert failed' });

        res.json({ message: 'Profile completed' });
      }
    );
  });
};