// ==========================================
// MINI ERP - JS GLOBAL (main.js)
// ==========================================


// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    carregarTema();
    carregarToggles();
    console.log("✔ JS cargado correctamente");
});


// ==========================================
// SISTEMA DE TEMAS
// ==========================================

function carregarTema() {
    const tema = localStorage.getItem("tema") || "clar";
    document.body.className = tema;
}

function canviarTema(tema) {
    document.body.className = tema;
    localStorage.setItem("tema", tema);
}


// ==========================================
// TOGGLES (dashboard + stock)
// ==========================================

function carregarToggles() {
    // Toggle dashboard compacto
    const toggleCompacte = document.getElementById("toggleCompacte");
    if (toggleCompacte) {
        const estat = localStorage.getItem("compacte") === "true";
        toggleCompacte.checked = estat;
        document.body.classList.toggle("dashboard-compacte", estat);

        toggleCompacte.addEventListener("change", () => {
            document.body.classList.toggle("dashboard-compacte");
            localStorage.setItem("compacte", toggleCompacte.checked);
        });
    }

    // Toggle colores stock
    const toggleColors = document.getElementById("toggleColors");
    if (toggleColors) {
        const estat = localStorage.getItem("colors") === "true";
        toggleColors.checked = estat;
        document.body.classList.toggle("no-colors", estat);

        toggleColors.addEventListener("change", () => {
            document.body.classList.toggle("no-colors");
            localStorage.setItem("colors", toggleColors.checked);
        });
    }
}


// ==========================================
// CONFIRMACIONES
// ==========================================

function confirmarEliminar() {
    return confirm("¿Seguro que quieres eliminar este elemento?");
}


// ==========================================
// MEJORAS UX (detalle pro)
// ==========================================

// Scroll arriba automático en cambio de página
function scrollTopAuto() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Aplicar a links de paginación si quieres
document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        scrollTopAuto();
    }
});


// ==========================================
// DEBUG (para desarrollo)
// ==========================================

function debug(msg) {
    console.log("DEBUG:", msg);
}