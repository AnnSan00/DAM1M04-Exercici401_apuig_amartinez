// ==========================================
// RUTAS PRODUCTES
// ==========================================

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


// ==========================================
// LISTADO + PAGINACIÓN + BUSCADOR
// ==========================================
router.get('/', async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 0;
        const cerca = req.query.cerca || "";
        const limit = 10;
        const offset = pagina * limit;

        const sql = `
            SELECT * 
            FROM products 
            WHERE name LIKE ? OR category LIKE ?
            LIMIT ? OFFSET ?
        `;

        const params = [`%${cerca}%`, `%${cerca}%`, limit, offset];

        // db.query() retorna directament rows
        const productes = await db.query(sql, params);

        res.render('productes', {
            title: "Productes",
            productes,
            pagina,
            cerca
        });

    } catch (error) {
        console.error("Error carregant productes:", error);
        res.send("Error carregant productes");
    }
});


// ==========================================
// FORMULARIO AÑADIR
// ==========================================
router.get('/afegir', (req, res) => {
    res.render('producteAfegir');
});


// ==========================================
// CREATE
// ==========================================
router.post('/create', async (req, res) => {
    try {
        const { nom, categoria, preu, stock } = req.body;

        await db.pool.query(
            `INSERT INTO products (name, category, price, stock, active) 
             VALUES (?, ?, ?, ?, 1)`,
            [nom, categoria, preu, stock]
        );

        res.redirect('/productes');

    } catch (error) {
        console.error("Error creant producte:", error);
        res.send("Error al crear producte");
    }
});


// ==========================================
// FORMULARIO EDITAR
// ==========================================
router.get('/editar', async (req, res) => {
    try {
        const id = req.query.id;

        const [rows] = await db.pool.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        const product = rows[0];

        res.render('producteEditar', { product });

    } catch (error) {
        console.error("Error carregant producte:", error);
        res.send("Error en editar producte");
    }
});


// ==========================================
// UPDATE
// ==========================================
router.post('/update', async (req, res) => {
    try {
        const { id, nom, categoria, preu, stock, active } = req.body;

        await db.pool.query(
            `UPDATE products 
             SET name=?, category=?, price=?, stock=?, active=? 
             WHERE id=?`,
            [nom, categoria, preu, stock, Number(active), id]
        );

        res.redirect('/productes');

    } catch (error) {
        console.error("Error actualitzant producte:", error);
        res.send("Error al actualitzar producte");
    }
});



// ==========================================
// DELETE
// ==========================================
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        await db.pool.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        res.redirect('/productes');

    } catch (error) {
        console.error("Error eliminant producte:", error);
        res.send("Error al eliminar producte");
    }
});


module.exports = router;
