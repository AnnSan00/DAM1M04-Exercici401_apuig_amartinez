const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Listado de productos con Filtros y Paginación
router.get('/productes', async (req, res) => {
    let pagina = parseInt(req.query.pagina) || 0;
    let cerca = req.query.cerca || '';
    let offset = pagina * 10;

    try {
        // Query dinámica con buscador
        const [rows] = await db.query(
            "SELECT * FROM products WHERE name LIKE ? OR category LIKE ? LIMIT 10 OFFSET ?",
            [`%${cerca}%`, `%${cerca}%`, offset]
        );
        
        // Aquí enviarías los datos a la vista HBS (Persona B)
        res.render('productos', { products: rows, pagina, cerca });
    } catch (err) {
        res.status(500).send("Error en la base de datos");
    }
});

// CRUD Genérico: Create [cite: 8]
router.post('/create', async (req, res) => {
    const { taula, ...datos } = req.body; // 'taula' indica si es 'products' o 'customers'
    
    try {
        const query = `INSERT INTO ${taula} SET ?`;
        await db.query(query, datos);
        res.redirect(`/${taula === 'products' ? 'productes' : 'clients'}`);
    } catch (err) {
        res.status(500).send("Error al crear registro");
    }
});