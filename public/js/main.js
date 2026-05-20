// ==========================
// SISTEMA DE TEMES CORRECTE
// ==========================

function carregarTema() {
    const tema = localStorage.getItem("tema") || "clar";

    // Elimina només les classes de tema
    document.body.classList.remove("clar", "nit", "contrast");

    // Afegeix el tema actual
    document.body.classList.add(tema);
}

function canviarTema(tema) {
    document.body.classList.remove("clar", "nit", "contrast");
    document.body.classList.add(tema);
    localStorage.setItem("tema", tema);
}
