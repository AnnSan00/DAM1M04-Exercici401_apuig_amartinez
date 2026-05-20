// ==========================================
// RUTAS VENDES (VENTAS)
// ==========================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


// ==========================================
// LISTADO DE VENTAS
// ==========================================

router.get('/', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const limit = 10;
        const offset = pagina * limit;

        const [vendes] = await db.pool.query(`
            SELECT s.*, c.name as client_name
            FROM sales s
            LEFT JOIN customers c ON s.customer_id = c.id
            ORDER BY s.sale_date DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        res.render('vendes', { vendes, pagina });

    } catch (error) {
        console.error("Error cargando ventas:", error);
        res.send("Error en vendes");
    }
});


// ==========================================
// FORMULARIO NUEVA VENTA
// ==========================================

router.get('/afegir', async (req, res) => {
    try {
        const [clients] = await db.pool.query("SELECT * FROM customers");
        const [products] = await db.pool.query("SELECT * FROM products WHERE stock > 0");

        res.render('vendaAfegir', { clients, products });

    } catch (error) {
        console.error(error);
        res.send("Error cargando formulario venta");
    }
});


// ==========================================
// CREAR VENTA + CONTROL STOCK
// ==========================================

router.post('/create', async (req, res) => {
    const conn = await db.pool.getConnection();

    try {
        const { customer_id, products } = req.body;

        // products viene como array de objetos
        // ejemplo: [{id:1, qty:2}, {id:3, qty:1}]

        await conn.beginTransaction();

        let total = 0;

        // 1. Crear venta vacía
        const [result] = await conn.query(
            "INSERT INTO sales (customer_id, total) VALUES (?, 0)",
            [customer_id]
        );

        const saleId = result.insertId;

        // 2. Procesar productos
        for (let item of products) {
            const { id, qty } = item;

            // obtener producto
            const [[product]] = await conn.query(
                "SELECT * FROM products WHERE id = ?",
                [id]
            );

            if (!product) throw new Error("Producto no encontrado");

            if (product.stock < qty) {
                throw new Error(`Stock insuficiente para ${product.name}`);
            }

            const lineTotal = product.price * qty;
            total += lineTotal;

            // insertar línea
            await conn.query(
                `INSERT INTO sale_items 
                (sale_id, product_id, qty, unit_price, line_total)
                VALUES (?, ?, ?, ?, ?)`,
                [saleId, id, qty, product.price, lineTotal]
            );

            // actualizar stock
            await conn.query(
                "UPDATE products SET stock = stock - ? WHERE id = ?",
                [qty, id]
            );
        }

        // 3. actualizar total venta
        await conn.query(
            "UPDATE sales SET total = ? WHERE id = ?",
            [total, saleId]
        );

        await conn.commit();

        res.redirect('/vendes');

    } catch (error) {
        await conn.rollback();
        console.error("Error creando venta:", error);
        res.send(error.message);

    } finally {
        conn.release();
    }
});


// ==========================================
// VER DETALLE VENTA
// ==========================================

router.get('/veure', async (req, res) => {
    try {
        const id = req.query.id;

        const [[sale]] = await db.pool.query(`
            SELECT s.*, c.name as client_name
            FROM sales s
            LEFT JOIN customers c ON s.customer_id = c.id
            WHERE s.id = ?
        `, [id]);

        const [items] = await db.pool.query(`
            SELECT si.*, p.name
            FROM sale_items si
            JOIN products p ON si.product_id = p.id
            WHERE si.sale_id = ?
        `, [id]);

        res.render('vendaVeure', { sale, items });

    } catch (error) {
        console.error(error);
        res.send("Error viendo venta");
    }
});


module.exports = router;