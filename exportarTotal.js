// exportarTotal.js

document.addEventListener('DOMContentLoaded', () => {
    const exportarTotalButton = document.getElementById('exportarTotal');
    
    exportarTotalButton.addEventListener('click', exportarTotal);

    function exportarTotal() {
        console.log('Exportando todos los datos a Excel');

        // Verificar si los datos están disponibles
        if (!window.horarioPorCurso || !window.faltas) {
            alert('No hay datos disponibles para exportar.');
            return;
        }

        const wb = XLSX.utils.book_new();

        // Crear una hoja única que incluya todos los cursos
        const dataTodosCursos = [];
        const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
        window.cursosSeleccionados.forEach(curso => {
            dataTodosCursos.push({ "Curso": curso }); // Encabezado de Curso
            dias.forEach(dia => {
                const materias = window.horarioPorCurso[curso][dia] || [];
                materias.forEach(materiaObj => {
                    dataTodosCursos.push({
                        "Día": dia,
                        "Materia": materiaObj.materia,
                        "Profesor": materiaObj.profesor
                    });
                });
            });
            dataTodosCursos.push({}); // Fila en blanco para separar cursos
        });
        const wsTodosCursos = XLSX.utils.json_to_sheet(dataTodosCursos, { skipHeader: true });
        XLSX.utils.book_append_sheet(wb, wsTodosCursos, 'Planilla Todos los Cursos');

        // Hoja de Faltas Detalladas
        const faltasData = [];
        for (const docente in window.faltas) {
            for (const mes in window.faltas[docente]) {
                for (const dia in window.faltas[docente][mes]) {
                    for (const motivo in window.faltas[docente][mes][dia]) {
                        for (const curso in window.faltas[docente][mes][dia][motivo]) {
                            const cantidad = window.faltas[docente][mes][dia][motivo][curso];
                            faltasData.push({
                                "Docente": docente,
                                "Curso": curso,
                                "Mes": mes,
                                "Día": dia,
                                "Motivo": motivo,
                                "Cantidad de Faltas": cantidad
                            });
                        }
                    }
                }
            }
        }
        const wsFaltas = XLSX.utils.json_to_sheet(faltasData);
        XLSX.utils.book_append_sheet(wb, wsFaltas, 'Faltas Detalladas');

        // Hoja de Contador de Faltas Total por Docente
        const contadorTotalData = [];
        const profesoresUnicos = window.obtenerListaProfesores();
    
        profesoresUnicos.forEach(profesor => {
            let totalFaltas = 0;
            if (window.faltas[profesor]) {
                for (const mes in window.faltas[profesor]) {
                    for (const dia in window.faltas[profesor][mes]) {
                        for (const motivo in window.faltas[profesor][mes][dia]) {
                            for (const cursoFaltas in window.faltas[profesor][mes][dia][motivo]) {
                                totalFaltas += window.faltas[profesor][mes][dia][motivo][cursoFaltas];
                            }
                        }
                    }
                }
            }
            contadorTotalData.push({
                "Docente": profesor,
                "Total Faltas": totalFaltas
            });
        });
        const wsContadorTotal = XLSX.utils.json_to_sheet(contadorTotalData);
        XLSX.utils.book_append_sheet(wb, wsContadorTotal, 'Contador Faltas Total');

        // Hoja de Metadatos (Incluyendo Mes Seleccionado)
        const metadatosData = [{ "Mes Seleccionado": window.obtenerMesSeleccionado() }];
        const wsMetadatos = XLSX.utils.json_to_sheet(metadatosData);
        XLSX.utils.book_append_sheet(wb, wsMetadatos, 'Metadatos');

        // Exportar el libro a un archivo Excel
        XLSX.writeFile(wb, `planilla_total_${window.obtenerMesSeleccionado()}.xlsx`);
    }
});
