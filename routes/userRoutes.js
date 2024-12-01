const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Đăng ký người dùng
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: 'User registered successfully!' });
    });
});

// Đăng nhập người dùng
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.status(200).send({ message: 'Login successful', user: result[0] });
    });
});

module.exports = router;
