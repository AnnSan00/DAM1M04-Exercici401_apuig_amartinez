document.addEventListener('DOMContentLoaded', () => {
    // Toggle para el Dashboard (Compacto/Completo)
    const btnCompact = document.getElementById('toggleCompact');
    const kpiGrid = document.getElementById('kpi-grid');
    if (btnCompact && kpiGrid) {
        btnCompact.addEventListener('click', () => {
            kpiGrid.classList.toggle('full');
            kpiGrid.classList.toggle('compact');
        });
    }

    // Toggle para los colores de Stock en las tablas
    const btnColors = document.getElementById('toggleColors');
    const table = document.querySelector('table'); // Coge la primera tabla que encuentre
    if (btnColors && table) {
        btnColors.addEventListener('click', () => {
            table.classList.toggle('stock-colors');
        });
    }
});