// selectorMes.js

document.addEventListener('DOMContentLoaded', () => {
    const selectorMesContainer = document.getElementById('selector-mes-container');

    // Crear el elemento label para el selector de mes
    const labelMes = document.createElement('label');
    labelMes.setAttribute('for', 'selectorMes');
    labelMes.classList.add('form-label', 'fw-bold');
    labelMes.textContent = 'Selecciona el Mes:';

    // Crear el input de tipo month
    const inputMes = document.createElement('input');
    inputMes.type = 'month';
    inputMes.id = 'selectorMes';
    inputMes.classList.add('form-control');
    inputMes.required = true;

    // Establecer el mes actual como valor por defecto
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    inputMes.value = `${year}-${month}`;

    // Añadir el label y el input al contenedor
    selectorMesContainer.appendChild(labelMes);
    selectorMesContainer.appendChild(inputMes);

    // Función para obtener el mes seleccionado en formato 'YYYY-MM'
    function obtenerMesSeleccionado() {
        return inputMes.value;
    }

    // Exponer la función para que el script principal pueda acceder a ella
    window.obtenerMesSeleccionado = obtenerMesSeleccionado;

    // Opcional: Escuchar cambios en el selector de mes para actualizar la planilla en tiempo real
    inputMes.addEventListener('change', () => {
        // Disparar un evento personalizado para que el script principal pueda reaccionar
        const eventoMesCambiado = new Event('mesCambiado');
        window.dispatchEvent(eventoMesCambiado);
    });
});
