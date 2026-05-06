document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTIÓ DE TEMES
    const themeSelector = document.getElementById('themeSelector');
    
    const applyTheme = (theme) => {
        document.body.className = `theme-${theme}`; // Canvia la classe del body
        localStorage.setItem('selectedTheme', theme); // Guarda la tria
    };

    themeSelector.addEventListener('change', (e) => applyTheme(e.target.value));

    // Carregar tema guardat
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    applyTheme(savedTheme);
    themeSelector.value = savedTheme;

    // 2. TOGGLE COMPACTE/COMPLET (Dashboard)
    const btnCompact = document.getElementById('toggleCompact');
    const kpiGrid = document.getElementById('kpi-grid');
    if (btnCompact && kpiGrid) {
        btnCompact.addEventListener('click', () => kpiGrid.classList.toggle('compact'));
    }

    // 3. TOGGLE COLORS STOCK (Taules)
    const btnColors = document.getElementById('toggleColors');
    const table = document.querySelector('table');
    if (btnColors && table) {
        btnColors.addEventListener('click', () => table.classList.toggle('stock-colors'));
    }
});