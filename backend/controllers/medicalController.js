const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/records.json');

// Save medical record
exports.saveRecord = (req, res) => {
  const record = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  let records = [];

  if (fs.existsSync(dataPath)) {
    records = JSON.parse(fs.readFileSync(dataPath));
  }

  records.unshift(record);
  fs.writeFileSync(dataPath, JSON.stringify(records, null, 2));

  res.status(201).json({
    message: 'Medical record saved',
    record
  });
};

// Fetch records
exports.getRecords = (req, res) => {
  if (!fs.existsSync(dataPath)) {
    return res.json([]);
  }

  const records = JSON.parse(fs.readFileSync(dataPath));
  res.json(records);
};
