document.addEventListener('DOMContentLoaded', () => {
    const listaDocentes = document.getElementById('listaDocentes');

    listaDocentes.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
            actualizarAsistencia(event.target);
        }
    });

    function actualizarAsistencia(input) {
        const nombreDocente = input.name.split('_')[1];
        const estadoAsistencia = input.value;
        console.log(`Docente: ${nombreDocente}, Asistencia: ${estadoAsistencia}`);
        // Aquí se podría guardar la asistencia en una base de datos o en otro sistema.
    }
});
