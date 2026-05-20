// Importamos mysql2 en versión con promesas
const mysql = require('mysql2/promise');

// --- DETECCIÓN AUTOMÁTICA DE ENTORNO ---
const isProxmox = !!process.env.PM2_HOME;
// ----------------------------------------

// ==========================================
// CONFIGURACIÓN DE LA CONEXIÓN DINÁMICA
// ==========================================

const pool = mysql.createPool({
    host: '127.0.0.1',        
    
    // EN PROXMOX: Usa el usuario 'super'. EN TU PC LOCAL: Usa 'root' (como tenías antes)
    user: isProxmox ? 'super' : 'root', 
    
    // EN PROXMOX: Fuerza el puerto 3306. EN LOCAL: Usa el puerto por defecto de tu PC (3306)
    port: isProxmox ? 3306 : 3306, 
    
    password: '1234',         
    database: 'minierp',      

    waitForConnections: true, 
    connectionLimit: 10,      
    queueLimit: 0             
});


// ==========================================
// FUNCIÓN PARA PROBAR LA CONEXIÓN
// ==========================================

async function provarConnexio() {
    try {
        const conn = await pool.getConnection();

        if (isProxmox) {
            console.log("✔ [PROXMOX] Connexió a MySQL correcta (Usuari: super)");
        } else {
            console.log("✔ [LOCAL] Connexió a MySQL correcta (Usuari: root)");
        }

        conn.release(); 
    } catch (error) {
        console.error("❌ Error en la connexió a la BD:");
        console.error(error.message);
    }
}

provarConnexio();


// ==========================================
// FUNCIONES EXTRA (OPCIONAL PERO ÚTIL)
// ==========================================

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