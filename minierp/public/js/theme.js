document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('theme-selector');
    const body = document.body;

    // 1. Cargar el tema guardado al entrar
    const savedTheme = localStorage.getItem('erp-theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeSelector.value = savedTheme;

    // 2. Escuchar cambios en el selector
    themeSelector.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        body.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('erp-theme', selectedTheme);
    });
});