const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// --- 1. DASHBOARD (Página Principal) ---
router.get('/', async (req, res) => {
    try {
        // Ventas de hoy 
        const [vendesAvui] = await db.query("SELECT SUM(total) as total FROM sales WHERE DATE(sale_date) = CURDATE()");
        // Ventas del mes 
        const [vendesMes] = await db.query("SELECT SUM(total) as total FROM sales WHERE MONTH(sale_date) = MONTH(CURDATE())");
        // Productos con stock bajo (ej: < 5) 
        const [stockBaix] = await db.query("SELECT * FROM products WHERE stock < 5");
        // Top 5 productos más vendidos 
        const [topProductes] = await db.query(`
            SELECT p.name, SUM(si.qty) as total_venut 
            FROM sale_items si 
            JOIN products p ON si.product_id = p.id 
            GROUP BY p.id ORDER BY total_venut DESC LIMIT 5`);

        res.render('dashboard', { 
            kpi: {
                vendesAvui: vendesAvui[0].total || 0,
                vendesMes: vendesMes[0].total || 0,
                stockBaixCount: stockBaix.length
            },
            stockBaix,
            topProductes
        });
    } catch (err) {
        res.status(500).send("Error al cargar el dashboard");
    }
});

// --- 2. LISTADO PRODUCTOS (Con Paginación y Filtro) [cite: 7] ---
router.get('/productes', async (req, res) => {
    let pagina = parseInt(req.query.pagina) || 0;
    let cerca = req.query.cerca || '';
    const limit = 10;
    const offset = pagina * limit;

    try {
        const querySQL = `SELECT * FROM products WHERE name LIKE ? OR category LIKE ? LIMIT ? OFFSET ?`;
        const [rows] = await db.query(querySQL, [`%${cerca}%`, `%${cerca}%`, limit, offset]);

        res.render('productos', { 
            products: rows, 
            pagina, 
            cerca,
            proximaPagina: pagina + 1,
            paginaAnterior: pagina > 0 ? pagina - 1 : 0
        });
    } catch (err) {
        res.status(500).send("Error al obtener productos");
    }
});

// --- 3. CRUD: CREATE [cite: 6] ---
router.post('/create', async (req, res) => {
    const { taula, ...datos } = req.body;
    try {
        await db.query(`INSERT INTO ${taula} SET ?`, [datos]);
        res.redirect(taula === 'products' ? '/productes' : '/clients');
    } catch (err) {
        res.status(500).send("Error al crear");
    }
});

module.exports = router;