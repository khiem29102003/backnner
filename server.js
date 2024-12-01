const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'revenue_db',
});

// API lưu lịch sử tính toán
app.post('/save-history', (req, res) => {
  const { userId, revenue, costs, profit } = req.body;
  const query = 'INSERT INTO history (user_id, revenue, costs, profit) VALUES (?, ?, ?, ?)';
  db.execute(query, [userId, revenue, costs, profit], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error saving history' });
    }
    res.status(200).json({ message: 'History saved successfully' });
  });
});

// API lấy toàn bộ lịch sử tính toán
app.get('/get-all-history', (req, res) => {
  const query = 'SELECT * FROM history ORDER BY created_at DESC';
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching history' });
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
