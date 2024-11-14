document.addEventListener('DOMContentLoaded', () => {
    const agregarDocenteButton = document.getElementById('agregarDocente');
    const nombreDocenteInput = document.getElementById('nombreDocente');
    const listaDocentes = document.getElementById('listaDocentes');

    agregarDocenteButton.addEventListener('click', () => {
        const nombreDocente = nombreDocenteInput.value.trim();
        if (nombreDocente) {
            agregarDocente(nombreDocente);
            nombreDocenteInput.value = '';
        } else {
            alert('Por favor, ingrese un nombre válido para el docente.');
        }
    });

    function agregarDocente(nombre) {
        const fila = document.createElement('tr');

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = nombre;
        fila.appendChild(celdaNombre);

        const celdaPresente = document.createElement('td');
        const inputPresente = document.createElement('input');
        inputPresente.type = 'radio';
        inputPresente.name = `asistencia_${nombre}`;
        inputPresente.value = 'Presente';
        celdaPresente.appendChild(inputPresente);
        fila.appendChild(celdaPresente);

        const celdaAusente = document.createElement('td');
        const inputAusente = document.createElement('input');
        inputAusente.type = 'radio';
        inputAusente.name = `asistencia_${nombre}`;
        inputAusente.value = 'Ausente';
        celdaAusente.appendChild(inputAusente);
        fila.appendChild(celdaAusente);

        listaDocentes.appendChild(fila);
    }
});
