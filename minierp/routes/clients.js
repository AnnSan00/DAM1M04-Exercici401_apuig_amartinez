const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('clients', { 
        clients: [
            { id: 1, name: 'Anna Puig', email: 'anna@test.com', phone: '123', num_compres: 0 }
        ] 
    });
});

module.exports = router; // <-- IMPRESCINDIBLE