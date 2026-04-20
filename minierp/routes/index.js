const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Hem de fer el render del fitxer 'dashboard.hbs'
    res.render('dashboard', {
        vendesAvui: 150.50,
        vendesMes: 4500.00,
        comandesAvui: 5,
        comandesMes: 120,
        productesStockBaix: 3,
        topProductes: [
            { name: 'Teclat Mecànic', stock: 2, total_venut: 50, stockLevel: 'critical' },
            { name: 'Ratolí Gaming', stock: 15, total_venut: 30, stockLevel: 'ok' }
        ],
        ultimesVendes: [
            { data_formatada: '16/04/2026', client_nom: 'Anna Puig', total: 45.99 }
        ]
    });
});

module.exports = router;