// ==========================================
// MINI ERP - APP PRINCIPAL (EXPRESS-HANDLEBARS)
// ==========================================
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

// --- DETECCIÓN DE ENTORNO (PROXMOX / LOCAL) ---
// Ponemos el puerto en las variables de entorno ANTES de cargar la conexión
const isProxmox = !!process.env.PM2_HOME;
process.env.DB_PORT = isProxmox ? '3306' : '3307';
// ----------------------------------------------

const app = express();
const PORT = 3000;


// ==========================================
// MOTOR DE VISTAS (EXPRESS-HANDLEBARS)
// ==========================================
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// ==========================================
// MIDDLEWARE
// ==========================================

// Leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));


// ==========================================
// HELPERS (PAGINACIÓN)
// ==========================================
const hbs = require('handlebars');

hbs.registerHelper('inc', value => parseInt(value) + 1);
hbs.registerHelper('dec', value => parseInt(value) - 1);


// ==========================================
// RUTAS
// ==========================================
const dashboardRoutes = require('./routes/dashboard');
const productesRoutes = require('./routes/productes');
const clientsRoutes = require('./routes/clients');
const vendesRoutes = require('./routes/vendes');

// Dashboard (home)
app.use('/', dashboardRoutes);

// Resto módulos
app.use('/productes', productesRoutes);
app.use('/clients', clientsRoutes);
app.use('/vendes', vendesRoutes);


// ==========================================
// SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
    console.log(`Modo detectado: ${isProxmox ? 'Proxmox (Puerto 3306)' : 'Local (Puerto 3307)'}`);
});