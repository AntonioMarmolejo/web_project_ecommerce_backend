const express   = require('express');
const platziApi = require('../services/platziApi');
const router    = express.Router();

// ─── POST /api/auth/register ────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
    }

    const { data } = await platziApi.post('/users', {
      name,
      email,
      password,
      avatar: avatar || 'https://picsum.photos/800',
    });

    res.status(201).json(data);
  } catch (err) {
    const msg = err.response?.data?.message || 'Error al registrar usuario';
    res.status(err.response?.status || 500).json({ error: msg });
  }
});

// ─── POST /api/auth/login ───────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const { data } = await platziApi.post('/auth/login', { email, password });
    res.json(data); // { access_token, refresh_token }
  } catch (err) {
    res.status(401).json({ error: 'Credenciales incorrectas' });
  }
});

// ─── GET /api/auth/profile ──────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    const { data } = await platziApi.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

// ─── POST /api/auth/refresh ─────────────────────────────────
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { data } = await platziApi.post('/auth/refresh-token', { refreshToken });
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
});

module.exports = router;
