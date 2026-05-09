const express = require('express');
const platziApi = require('../services/platziApi');
const router = express.Router();

// ─── GET /api/categories ────────────────────────────────────
// Devuelve todas las categorías para poblar el selector
router.get('/', async (req, res) => {

    try {
        const { data } = await platziApi.get('/categories');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
});

// ─── GET /api/categories/:id/products ──────────────────────
// Productos de una categoría específica (con paginación)
router.get('/:id/products', async (req, res) => {

    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(24, parseInt(req.query.limit) || 12);
        const offset = (page - 1) * limit;

        const { data } = await platziApi.get(
            `/categories/${req.params.id}/products`,
            { params: { offset, limit } }
        );
        res.json({ data, pagination: { page, limit, offset, count: data.length } });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos de categoría' });
    }
});

module.exports = router;