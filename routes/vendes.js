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