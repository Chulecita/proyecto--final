const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

// GET tdoos los users
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST nuevo user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.json({ id: result.insertId, username, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        await pool.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, id]);
        res.json({ id, username, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// eliminar user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;