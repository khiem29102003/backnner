const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Lấy danh sách giao dịch
router.get('/', (req, res) => {
    const query = 'SELECT * FROM transactions';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Thêm giao dịch mới
router.post('/add', (req, res) => {
    const { user_id, amount, type, description } = req.body;
    const query = 'INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, amount, type, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'Transaction added successfully!' });
    });
});

// Lấy giao dịch theo ID người dùng
router.get('/user/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM transactions WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// Xóa giao dịch theo ID
router.delete('/:transactionId', (req, res) => {
    const { transactionId } = req.params;
    const query = 'DELETE FROM transactions WHERE id = ?';
    db.query(query, [transactionId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Transaction deleted successfully!' });
    });
});

module.exports = router;
