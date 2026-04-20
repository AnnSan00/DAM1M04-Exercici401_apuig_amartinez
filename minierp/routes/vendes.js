const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('vendes', {
        cerca: '',
        vendes: [
            { id: 101, sale_date: '2026-04-16', customer_name: 'Anna Puig', payment_method: 'Targeta', total: 45.99 },
            { id: 102, sale_date: '2026-04-15', customer_name: 'Marc Martínez', payment_method: 'Efectiu', total: 12.50 }
        ],
        showPrev: false,
        showNext: true,
        currentPage: 1,
        prevPage: 1,
        nextPage: 2
    });
});

module.exports = router;