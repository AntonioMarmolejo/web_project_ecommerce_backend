const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares globales
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://ecommerceproyectofinal.duckdns.org',
        'https://ecommerceproyectofinal.duckdns.org',
    ],
    credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;