const express = require('express');
const platziApi = require('../services/platziApi');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { data } = await platziApi.get('/categories');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; //