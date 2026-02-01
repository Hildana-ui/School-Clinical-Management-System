console.log('📚 class.controller.js LOADED');

const db = require('../db');

// GET all classes
exports.getAllClasses = (req, res) => {
  const sql = `
    SELECT
      class_id AS id,
      grade,
      section
    FROM class
    ORDER BY grade, section
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching classes:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};


