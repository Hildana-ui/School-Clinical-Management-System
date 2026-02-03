const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
  const { username, password, email, role_id } = req.body;

  if (!username || !password || !email || !role_id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const normalizedUsername = username.trim();

  db.query(
    `INSERT INTO users (username, password, email, role_id, is_active)
     VALUES (?, ?, ?, ?, true)`,
    [normalizedUsername, passwordHash, email, role_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: 'Signup successful',
        user_id: result.insertId,
        role_id
      });
    }
  );
};


exports.login = (req, res) => {
  const { username, password } = req.body;
  const usernameNormalized = username.trim().toLowerCase();

  db.query(
    `SELECT * FROM users WHERE LOWER(username) = ? AND is_active = true`,
    [usernameNormalized],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(401).json({ message: 'Invalid credentials' });

      const user = results[0];

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (user.role_id === 3) {
        db.query(
          `SELECT 1 FROM student WHERE user_id = ?`,
          [user.user_id],
          (err2, rows) => {
            if (err2) return res.status(500).json({ error: err2.message });

            return res.json({
              message: 'Login successful',
              user_id: user.user_id,
              role_id: user.role_id,
              needs_profile: rows.length === 0
            });
          }
        );
      } else {
        res.json({
          message: 'Login successful',
          user_id: user.user_id,
          role_id: user.role_id,
          needs_profile: false
        });
      }
    }
  );
};
