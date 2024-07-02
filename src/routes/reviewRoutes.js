const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

// GET todas las reviews
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM reviews');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST nueva review
router.post('/', async (req, res) => {
    const { user_id, movie_id, review } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO reviews (user_id, movie_id, review) VALUES (?, ?, ?)', [user_id, movie_id, review]);
        res.json({ id: result.insertId, user_id, movie_id, review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar review
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    try {
        await pool.query('UPDATE reviews SET review = ? WHERE id = ?', [review, id]);
        res.json({ id, review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// eliminar review
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;