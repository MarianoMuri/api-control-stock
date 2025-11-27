const { Movimiento, Producto } = require('../models');

// GET /api/movimientos
async function listarMovimientos(req, res) {
    try {
        const movimientos = await Movimiento.findAll({
            include: {
                model: Producto,
                as: 'producto',
                attributes: ['id', 'nombre', 'stock']
            },
            order: [['fecha', 'DESC']]
        });

        res.json(movimientos);
    } catch (error) {
        console.error('Error al listar movimientos:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos' });
    }
}

// GET /api/movimientos/producto/:id_producto
async function listarMovimientosPorProducto(req, res) {
    const { id_producto } = req.params;

    try {
        const movimientos = await Movimiento.findAll({
            where: { id_producto },
            include: {
                model: Producto,
                as: 'producto',
                attributes: ['id', 'nombre', 'stock']
            },
            order: [['fecha', 'DESC']]
        });

        res.json(movimientos);
    } catch (error) {
        console.error('Error al listar movimientos por producto:', error);
        res.status(500).json({ error: 'Error al obtener los movimientos' });
    }
}

// POST /api/movimientos
// body: { id_producto, tipo: 'ingreso'|'egreso', cantidad, fecha }
async function crearMovimiento(req, res) {
    const { id_producto, tipo, cantidad, fecha } = req.body;

    if (!id_producto || !tipo || !cantidad) {
        return res.status(400).json({
            error: 'Los campos id_producto, tipo y cantidad son obligatorios'
        });
    }

    if (!['ingreso', 'egreso'].includes(tipo)) {
        return res.status(400).json({ error: 'El tipo debe ser ingreso o egreso' });
    }

    if (cantidad <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser mayor a cero' });
    }

    try {
        // 1. Verificar producto
        const producto = await Producto.findByPk(id_producto);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // 2. Calcular nuevo stock
        let nuevoStock = producto.stock;

        if (tipo === 'ingreso') {
            nuevoStock = producto.stock + cantidad;
        } else if (tipo === 'egreso') {
            if (producto.stock < cantidad) {
                return res.status(400).json({
                    error: 'Stock insuficiente para realizar el egreso'
                });
            }
            nuevoStock = producto.stock - cantidad;
        }

        // 3. Actualizar stock del producto
        producto.stock = nuevoStock;
        await producto.save();

        // 4. Crear movimiento
        const movimiento = await Movimiento.create({
            id_producto,
            tipo,
            cantidad,
            fecha: fecha || new Date()
        });

        res.status(201).json({
            mensaje: 'Movimiento registrado y stock actualizado',
            movimiento,
            stock_actual: producto.stock
        });
    } catch (error) {
        console.error('Error al crear movimiento:', error);
        res.status(500).json({ error: 'Error al registrar el movimiento' });
    }
}

module.exports = {
    listarMovimientos,
    listarMovimientosPorProducto,
    crearMovimiento
};
