// ==========================================
// VALIDACIÓN PRODUCTOS
// ==========================================

function validarForm() {
    let valid = true;

    // Obtener inputs
    const nom = document.getElementById("nom");
    const categoria = document.getElementById("categoria");
    const preu = document.getElementById("preu");
    const stock = document.getElementById("stock");

    // Limpiar errores anteriores
    netejarErrors();

    // -------- NOM --------
    if (!nom.value || nom.value.trim().length < 3) {
        mostrarError(nom, "El nom ha de tenir mínim 3 caràcters");
        valid = false;
    }

    // -------- CATEGORIA --------
    if (!categoria.value || categoria.value.trim().length < 2) {
        mostrarError(categoria, "Categoria obligatòria");
        valid = false;
    }

    // -------- PREU --------
    if (preu.value <= 0 || isNaN(preu.value)) {
        mostrarError(preu, "El preu ha de ser major que 0");
        valid = false;
    }

    // -------- STOCK --------
    if (stock.value < 0 || !Number.isInteger(Number(stock.value))) {
        mostrarError(stock, "Stock ha de ser un enter ≥ 0");
        valid = false;
    }

    return valid;
}


// ==========================================
// VALIDACIÓN CLIENTES
// ==========================================

function validarClient() {
    let valid = true;

    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const telefon = document.getElementById("telefon");

    netejarErrors();

    // -------- NOM --------
    if (!nom.value || nom.value.trim().length < 3) {
        mostrarError(nom, "Nom obligatori (mínim 3 caràcters)");
        valid = false;
    }

    // -------- EMAIL --------
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        mostrarError(email, "Email no vàlid");
        valid = false;
    }

    // -------- TELÈFON --------
    if (!telefon.value || telefon.value.length < 9) {
        mostrarError(telefon, "Telèfon mínim 9 dígits");
        valid = false;
    }

    return valid;
}


// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

// Mostrar error debajo del input
function mostrarError(input, missatge) {
    input.style.border = "2px solid red";

    const error = document.createElement("div");
    error.className = "error-msg";
    error.innerText = missatge;

    input.parentNode.appendChild(error);
}


// Limpiar todos los errores
function netejarErrors() {
    // eliminar mensajes
    const errors = document.querySelectorAll(".error-msg");
    errors.forEach(e => e.remove());

    // quitar borde rojo
    const inputs = document.querySelectorAll("input");
    inputs.forEach(i => i.style.border = "");
}