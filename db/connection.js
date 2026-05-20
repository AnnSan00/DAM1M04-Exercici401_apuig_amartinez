// Importamos mysql2 en versión con promesas
const mysql = require('mysql2/promise');

// ==========================================
// CONFIGURACIÓN DE LA CONEXIÓN
// ==========================================

const pool = mysql.createPool({
    host: '127.0.0.1',        // Servidor de la BD
    user: 'root',             // Usuario (XAMPP normalmente root)
    password: '1234',     // ⚠️ Cambiar si tienes contraseña
    database: 'minierp',      // Nombre de la base de datos

    waitForConnections: true, // Espera si no hay conexiones libres
    connectionLimit: 10,      // Máximo de conexiones simultáneas
    queueLimit: 0             // Sin límite de cola
});


// ==========================================
// FUNCIÓN PARA PROBAR LA CONEXIÓN
// ==========================================

async function provarConnexio() {
    try {
        const conn = await pool.getConnection();

        console.log("✔ Connexió a MySQL correcta");

        conn.release(); // Liberamos la conexión
    } catch (error) {
        console.error("❌ Error en la connexió a la BD:");
        console.error(error.message);
    }
}

// Ejecutamos la prueba al iniciar
provarConnexio();


// ==========================================
// FUNCIONES EXTRA (OPCIONAL PERO ÚTIL)
// ==========================================

// Ejecutar consultas fácilmente
async function query(sql, params) {
    try {
        const [rows] = await pool.query(sql, params);
        return rows;
    } catch (error) {
        console.error("Error en query:", error.message);
        throw error;
    }
}


// ==========================================
// EXPORTACIÓN
// ==========================================

module.exports = {
    pool,
    query
};