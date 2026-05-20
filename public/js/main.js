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

    // ==========================
    // TOGGLE KPI (compacte)
    // ==========================
    const toggleCompact = document.getElementById("toggleCompact");
    const kpiGrid = document.getElementById("kpi-grid");

    if (toggleCompact && kpiGrid) {
        const estat = localStorage.getItem("compacte") === "true";
        toggleCompact.checked = estat;
        kpiGrid.classList.toggle("compact", estat);

        toggleCompact.addEventListener("change", () => {
            kpiGrid.classList.toggle("compact");
            localStorage.setItem("compacte", toggleCompact.checked);
        });
    }

// ==========================
// TOGGLE COLORS STOCK (global)
// ==========================
const toggleColors = document.getElementById("toggleColors");
const stockTables = document.querySelectorAll(".stock-table");

if (toggleColors && stockTables.length > 0) {
    const estat = localStorage.getItem("colors") === "true";
    toggleColors.checked = estat;

    // Aplica estat inicial
    stockTables.forEach(t => t.classList.toggle("stock-colors", estat));

    // Canvi de toggle
    toggleColors.addEventListener("change", () => {
        const activat = toggleColors.checked;
        localStorage.setItem("colors", activat);

        stockTables.forEach(t => t.classList.toggle("stock-colors", activat));
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
// MEJORAS UX
// ==========================================

function scrollTopAuto() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        scrollTopAuto();
    }
});


// ==========================================
// DEBUG
// ==========================================

function debug(msg) {
    console.log("DEBUG:", msg);
}
