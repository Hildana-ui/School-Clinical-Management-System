console.log('🏢 department.controller.js LOADED');

const db = require('../db');

// GET all departments
exports.getAllDepartments = (req, res) => {
  const sql = `
    SELECT 
      department_id AS id,
      department_name AS name
    FROM department
    ORDER BY department_name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// CREATE department
exports.createDepartment = (req, res) => {
  const { name } = req.body;

  const sql = `
    INSERT INTO department (department_name)
    VALUES (?)
  `;

  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Department created', id: result.insertId });
  });
};

// UPDATE department
exports.updateDepartment = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const sql = `
    UPDATE department
    SET department_name = ?
    WHERE department_id = ?
  `;

  db.query(sql, [name, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Department updated' });
  });
};

// DELETE department
exports.deleteDepartment = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM department
    WHERE department_id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Department deleted' });
  });
};
