console.log('✅ user.controller.js loaded');

const db = require('../db');

/* GET all users */
exports.getAllUsers = (req, res) => {
  db.query(
    'SELECT user_id, username, email, role_id, is_active FROM users',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

/* GET user by ID */
exports.getUserById = (req, res) => {
  const id = req.params.id;

    db.query(
        `SELECT user_id, username, email, role_id, is_active FROM users WHERE user_id = ?`,
        [id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0)
                return res.status(404).json({ message: 'User not found' });

            res.json(results[0]);
        }
    );
};

/* UPDATE user */
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { email, role_id } = req.body;

    db.query(
        `UPDATE users SET email = ?, role_id = ? WHERE user_id = ?`,
        [email, role_id, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0)
                return res.status(404).json({ message: 'User not found' });

            res.json({ message: 'User updated' });
        }
    );
};

/* DEACTIVATE user */
exports.deactivateUser = (req, res) => {
  const id = req.params.id;

  db.query(
    'UPDATE users SET is_active = false WHERE user_id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'User not found' });

      res.json({ message: 'User deactivated successfully' });
    }
  );
};
