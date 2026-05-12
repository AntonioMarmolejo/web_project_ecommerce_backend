const platziApi = require('../services/platziApi');

// ─── Middleware de autenticación JWT ────────────────────────
// Verifica el token con Platzi API antes de dar acceso
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token con Platzi API
    const { data } = await platziApi.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    req.user = data; // adjuntar usuario al request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;
