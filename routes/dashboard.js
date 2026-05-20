// ==========================================
// RUTAS DASHBOARD
// ==========================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


// ==========================================
// DASHBOARD PRINCIPAL
// ==========================================

router.get('/', async (req, res) => {
    try {

        // ==========================
        // KPIs
        // ==========================

        // Ventas hoy
        const [[vendesAvui]] = await db.pool.query(`
            SELECT SUM(total) as total 
            FROM sales 
            WHERE DATE(sale_date) = CURDATE()
        `);

        // Ventas mes
        const [[vendesMes]] = await db.pool.query(`
            SELECT SUM(total) as total 
            FROM sales 
            WHERE MONTH(sale_date) = MONTH(CURDATE())
        `);

        // Pedidos hoy
        const [[comandesAvui]] = await db.pool.query(`
            SELECT COUNT(*) as total 
            FROM sales 
            WHERE DATE(sale_date) = CURDATE()
        `);

        // Pedidos mes
        const [[comandesMes]] = await db.pool.query(`
            SELECT COUNT(*) as total 
            FROM sales 
            WHERE MONTH(sale_date) = MONTH(CURDATE())
        `);

        // Productos con stock bajo (<5)
        const [stockBaix] = await db.pool.query(`
            SELECT * FROM products 
            WHERE stock < 5
        `);


        // ==========================
        // LISTADOS
        // ==========================

        // Últimas 5 ventas
        const [ultimesVendes] = await db.pool.query(`
            SELECT s.*, c.name as client_name
            FROM sales s
            LEFT JOIN customers c ON s.customer_id = c.id
            ORDER BY s.sale_date DESC
            LIMIT 5
        `);

        // Top 5 productos más vendidos
        const [topProductes] = await db.pool.query(`
            SELECT p.name, SUM(si.qty) as total_venuts
            FROM sale_items si
            JOIN products p ON si.product_id = p.id
            GROUP BY si.product_id
            ORDER BY total_venuts DESC
            LIMIT 5
        `);


        // ==========================
        // RENDER
        // ==========================

        res.render('dashboard', {
            kpis: {
                vendesAvui: vendesAvui.total || 0,
                vendesMes: vendesMes.total || 0,
                comandesAvui: comandesAvui.total || 0,
                comandesMes: comandesMes.total || 0,
                stockBaix: stockBaix.length
            },
            stockBaix,
            ultimesVendes,
            topProductes
        });

    } catch (error) {
        console.error("Error dashboard:", error);
        res.send("Error carregant dashboard");
    }
});


module.exports = router;