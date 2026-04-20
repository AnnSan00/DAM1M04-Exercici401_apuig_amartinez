const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars'); // Necessari per a HBS
require('dotenv').config();

const app = express();

// 1. Configuración del motor de plantillas (Handlebars)
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout'), // El teu directori és singular
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 3. Importar i fer servir les rutes
const indexRouter = require('./routes/index');
const productesRouter = require('./routes/productes');
const clientsRouter = require('./routes/clients');
const vendesRouter = require('./routes/vendes');

app.use('/', indexRouter);
app.use('/productes', productesRouter);
app.use('/clients', clientsRouter);
app.use('/vendes', vendesRouter);

// 4. Iniciar el servidor (Corregit: no duplicar el cost de PORT)
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Permet accés des de la xarxa (Proxmox)

app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor MiniERP corrent a http://localhost:${PORT}`);
    console.log(`📡 Accesible a la xarxa: http://192.168.20.193:${PORT}`);
});