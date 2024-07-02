const express = require('express');
const router = express.Router();
const pool = require('../DB/db');

// GET todas las movies
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM movies');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST crear nueva movie
router.post('/', async (req, res) => {
    const { title, genre, year } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO movies (title, genre, year) VALUES (?, ?, ?)', [title, genre, year]);
        res.json({ id: result.insertId, title, genre, year });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT actualizar movie
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, genre, year } = req.body;
    try {
        await pool.query('UPDATE movies SET title = ?, genre = ?, year = ? WHERE id = ?', [title, genre, year, id]);
        res.json({ id, title, genre, year });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// eliminar movie
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM movies WHERE id = ?', [id]);
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;