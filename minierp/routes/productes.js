const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('productes', { 
        productes: [
            { id: 1, name: 'Producte de prova', category: 'General', price: 10, stock: 5, stockLevel: 'low', active: true }
        ] 
    });
});

module.exports = router; // <-- ESTO ES LO MÁS IMPORTANTE