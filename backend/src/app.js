const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.use('/api', routes);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API de Inventario y Control de Stock');
});

module.exports = app;
