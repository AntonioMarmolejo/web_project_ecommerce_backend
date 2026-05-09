const express = require('express');
const platziApi = require('../services/platziApi');
const router = express.Router();

// ─── Constantes de paginación ───────────────────────────────
const DEFAULT_LIMIT = 12;  // productos por página
const MAX_LIMIT = 24;  // máximo permitido

// ─── GET /api/products ──────────────────────────────────────
// Query params:
//   page       → número de página (default: 1)
//   limit      → productos por página (default: 12, max: 24)
//   title      → buscar por nombre
//   categoryId → filtrar por categoría
//   price_min  → precio mínimo
//   price_max  → precio máximo
router.get('/', async (req, res) => {
    try {
        // 1. Leer y validar parámetros

        const page = Math.max(1, parseInt(req.query.page) || 1);


        const limit = Math.min(MAX_LIMIT, parseInt(req.query.limit) || DEFAULT_LIMIT);


        const offset = (page - 1) * limit; // ← conversión page → offset


        // 2. Construir params para Platzi API
        const params = { offset, limit };

        const { title, categoryId, price_min, price_max } = req.query;
        if (title) params.title = title;
        if (categoryId) params.categoryId = Number(categoryId);
        if (price_min) params.price_min = Number(price_min);
        if (price_max) params.price_max = Number(price_max);

        // 3. Llamar a Platzi API
        const { data: products } = await platziApi.get('/products', { params });

        // 4. Responder con datos + metadata de paginación

        res.json({


            data: products,


            pagination: { page, limit, offset, count: products.length },


        });

    } catch (err) {
        console.error('Error en GET /products:', err.message);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// ─── GET /api/products/:id ──────────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const { data } = await platziApi.get(`/products/${req.params.id}`);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// ─── GET /api/products/:id/related ─────────────────────────
router.get('/:id/related', async (req, res) => {
    try {
        const { data } = await platziApi.get(`/products/${req.params.id}/related`);
        res.json(data);
    } catch (err) {
        res.status(404).json({ error: 'Sin productos relacionados' });
    }
});

module.exports = router;