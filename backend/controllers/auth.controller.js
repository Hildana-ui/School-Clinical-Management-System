const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { username, password, email, role_id } = req.body;

    if (!username || !password || !email || !role_id) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    db.query(
        `INSERT INTO users (username, password_hash, email, role_id, is_active)
         VALUES (?, ?, ?, ?, true)`,
        [username, passwordHash, email, role_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const user_id = result.insertId;

            // ✅ If user is a student, create entry in students table
            if (parseInt(role_id) === 3) {
                db.query(
                    `INSERT INTO students (student_id, student_name)
                     VALUES (?, ?)`,
                    [user_id, username], // default name = username; you can allow later editing
                    (err2) => {
                        if (err2) return res.status(500).json({ error: err2.message });
                        res.status(201).json({ message: 'Student registered successfully' });
                    }
                );
            } else {
                res.status(201).json({ message: 'User registered successfully' });
            }
        }
    );
};


exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query(
        `SELECT * FROM users WHERE username = ? AND is_active = true`,
        [username],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0)
                return res.status(401).json({ message: 'Invalid credentials' });

            const user = results[0];

            const isMatch = bcrypt.compareSync(password, user.password_hash);
            if (!isMatch)
                return res.status(401).json({ message: 'Invalid credentials' });

            res.json({
                message: 'Login Successful',
                user_id: user.user_id,
                role_id: user.role_id
            });
        }
    );
};