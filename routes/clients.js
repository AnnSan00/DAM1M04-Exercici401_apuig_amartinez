// ==========================================
// RUTAS CLIENTES
// ==========================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


// ==========================================
// LISTADO + PAGINACIÓN + BÚSQUEDA + VIP
// ==========================================

router.get('/', async (req, res) => {
    const pagina = parseInt(req.query.pagina) || 0;
    const cerca = req.query.cerca || "";
    const vip = req.query.vip || false;

    const limit = 10;
    const offset = pagina * limit;

    let query = `
        SELECT c.*, COUNT(s.id) as compres
        FROM customers c
        LEFT JOIN sales s ON c.id = s.customer_id
        WHERE c.active = 1
        AND (c.name LIKE ? OR c.email LIKE ?)
        GROUP BY c.id
    `;


    let params = [`%${cerca}%`, `%${cerca}%`];

    // filtro VIP (más de 5 compras)
    if (vip) {
        query += " HAVING compres >= 5";
    }

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await db.pool.query(query, params);

    res.render('clients', {
        clients: rows,
        pagina,
        cerca,
        vip
    });
});


// ==========================================
// FORMULARIO AÑADIR
// ==========================================

router.get('/afegir', (req, res) => {
    res.render('clientAfegir');
});


// ==========================================
// CREATE
// ==========================================

router.post('/create', async (req, res) => {
    const { nom, email, telefon } = req.body;

    await db.pool.query(
        "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
        [nom, email, telefon]
    );

    res.redirect('/clients');
});


// ==========================================
// FORMULARIO EDITAR
// ==========================================

router.get('/editar', async (req, res) => {
    const id = req.query.id;

    const [[client]] = await db.pool.query(
        "SELECT * FROM customers WHERE id = ?",
        [id]
    );

    res.render('clientEditar', { client });
});


// ==========================================
// UPDATE
// ==========================================

router.post('/update', async (req, res) => {
    const { id, nom, email, telefon } = req.body;

    await db.pool.query(
        "UPDATE customers SET name=?, email=?, phone=? WHERE id=?",
        [nom, email, telefon, id]
    );

    res.redirect('/clients');
});


// ==========================================
// INACTIVAR CLIENT (NO ELIMINAR[Delete])
// ==========================================
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        await db.pool.query(
            "UPDATE customers SET active = 0 WHERE id = ?",
            [id]
        );

        res.redirect('/clients');

    } catch (error) {
        console.error("Error inactivant client:", error);
        res.send("Error inactivant client");
    }
});

// ==========================================
// FITXA CLIENT (DETALLE)
// ==========================================

router.get('/fitxa', async (req, res) => {
    const id = req.query.id;

    // datos cliente
    const [[client]] = await db.pool.query(
        "SELECT * FROM customers WHERE id = ?",
        [id]
    );

    // últimas ventas
    const [vendes] = await db.pool.query(
        `SELECT * FROM sales 
         WHERE customer_id = ? 
         ORDER BY sale_date DESC 
         LIMIT 10`,
        [id]
    );

    // total gastado
    const [[total]] = await db.pool.query(
        "SELECT SUM(total) as total FROM sales WHERE customer_id=?",
        [id]
    );

    res.render('clientFitxa', {
        client,
        vendes,
        total: total.total || 0
    });
});


module.exports = router;