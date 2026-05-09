const express = require('express');
const platziApi = require('../services/platziApi');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { data } = await platziApi.post('/auth/login', req.body);
        res.json(data);
    } catch (err) {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { data } = await platziApi.post('/users', req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;