const express = require('express');
const platziApi = require('../services/platziApi');
const router = express.Router();

// GET /api/products?title=&categoryId=&price_min=&price_max=&offset=&limit=
router.get('/', async (req, res) => {
    try {
        const { title, categoryId, price_min, price_max,
            offset = 0, limit = 12 } = req.query;

        const params = { offset, limit };
        if (title) params.title = title;
        if (categoryId) params.categoryId = categoryId;
        if (price_min) params.price_min = price_min;
        if (price_max) params.price_max = price_max;

        const { data } = await platziApi.get('/products', { params });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const { data } = await platziApi.get(`/products/${req.params.id}`);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

module.exports = router;