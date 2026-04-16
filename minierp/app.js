const express = require('express');
const path = require('path');
const app = express();

// 1. Configuración para leer datos de formularios (POST)
// Esto es VITAL para que el CRUD que hicimos antes funcione
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Configuración de archivos estáticos
// Aquí es donde la Persona B meterá su CSS y JS
app.use(express.static(path.join(__dirname, 'public')));

// 3. Importar tus rutas (Persona A)
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 4. Iniciar el servidor
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor MiniERP corriendo en http://192.168.20.193:${PORT}`);
});