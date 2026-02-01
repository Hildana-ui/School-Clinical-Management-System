const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { username, password, email, role_id } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    db.query(
        `INSERT INTO users (username, password_hash, email, role_id, is_active)
        VALUES(?, ?, ?, ?, true)`,
        [username, passwordHash, email, role_id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully'});
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