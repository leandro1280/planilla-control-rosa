// script.js

document.addEventListener('DOMContentLoaded', () => { 
    const cursoContainer = document.getElementById('curso-container');
    const planillaContainer = document.getElementById('planilla-container');
    const exportarCompletaButton = document.getElementById('exportarCompleta');
    const exportarExcelButton = document.getElementById('exportarExcel');
    const porcentajesContainer = document.getElementById('porcentajes-container');
    const formFaltas = document.getElementById('form-faltas');
    const selectProfesor = document.getElementById('selectProfesor');
    const cantidadFaltas = document.getElementById('cantidadFaltas');
    const fechaFalta = document.getElementById('fechaFalta');
    const listaFaltas = document.getElementById('listaFaltas');

    // Definir el horario directamente en el script
    const horarioPorCurso = {
        "1° 1°": {
            "LUNES": [
                { "materia": "CNT", "profesor": "Pasalacua (T)" },
                { "materia": "PLG", "profesor": "Barbosa (T)" },
                { "materia": "EF", "profesor": "Miguel (S)" },
                { "materia": "CCD", "profesor": "Daglio (T)" }
            ],
            "MARTES": [
                { "materia": "CSC", "profesor": "Alvarez Daniel (T)" },
                { "materia": "MTM", "profesor": "Crivaro (T)" }
            ],
            "MIERCOLES": [
                { "materia": "CNT", "profesor": "Pasalacua (T)" },
                { "materia": "MTM", "profesor": "Crivaro (T)" },
                { "materia": "EFC", "profesor": "Miguel (S)" }
            ],
            "JUEVES": [
                { "materia": "IGS", "profesor": "Cernada (P)" },
                { "materia": "PLG", "profesor": "Barbosa (T)" }
            ],
            "VIERNES": [
                { "materia": "AMC", "profesor": "Mascazinni (T)/Lirussi (S)" },
                { "materia": "CSC", "profesor": "Alvarez Daniel (T)" }
            ]
        },
        // Continúa agregando todos los cursos según tu Excel original
    };

    // Lista de suplentes disponibles por materia
    const suplentesPorMateria = {
        'CNT': [
            { nombre: 'Suplente A', tipo: '(S)' },
            { nombre: 'Suplente B', tipo: '(S)' }
        ],
        'PLG': [
            { nombre: 'Suplente C', tipo: '(S)' }
        ],
        'EF': [
            { nombre: 'Suplente D', tipo: '(S)' }
        ],
        'CCD': [
            { nombre: 'Suplente E', tipo: '(S)' }
        ],
        'CSC': [
            { nombre: 'Suplente F', tipo: '(S)' }
        ],
        'MTM': [
            { nombre: 'Suplente G', tipo: '(S)' }
        ],
        'IGS': [
            { nombre: 'Suplente H', tipo: '(S)' }
        ],
        'AMC': [
            { nombre: 'Suplente I', tipo: '(S)' }
        ],
        // Añade más materias y suplentes según sea necesario
    };

    // Obtener la lista de cursos disponibles
    const cursosDisponibles = Object.keys(horarioPorCurso);

    // Seleccionar el curso por defecto (el primero de la lista)
    let cursoSeleccionado = cursosDisponibles.length > 0 ? cursosDisponibles[0] : '';

    // Almacenar ausencias: { "docente": { "YYYY-MM-DD": cantidad } }
    let faltas = {};

    // Cargar faltas desde localStorage si existen
    if (localStorage.getItem('faltas')) {
        faltas = JSON.parse(localStorage.getItem('faltas'));
    }

    // Función para mostrar la selección de cursos
    function displayCursoSelection() {
        cursoContainer.innerHTML = '';
        const label = document.createElement('label');
        label.textContent = 'Selecciona el curso:';
        label.classList.add('form-label', 'fw-bold');

        const select = document.createElement('select');
        select.classList.add('form-select');

        if (cursosDisponibles.length === 0) {
            select.innerHTML = '<option value="">No hay cursos disponibles</option>';
            select.disabled = true;
        } else {
            select.innerHTML = cursosDisponibles.map(curso => `<option value="${curso}">${curso.toUpperCase()}</option>`).join('');
            select.disabled = false;
        }

        cursoContainer.appendChild(label);
        cursoContainer.appendChild(select);

        select.addEventListener('change', () => {
            cursoSeleccionado = select.value;
            displayPlanilla();
            populateSelectProfesor();
        });

        // Seleccionar el curso por defecto
        if (cursosDisponibles.length > 0) {
            select.value = cursoSeleccionado;
            select.dispatchEvent(new Event('change'));
        }
    }

    // Función para mostrar la planilla de asistencia
    function displayPlanilla() {
        planillaContainer.innerHTML = '';
        porcentajesContainer.innerHTML = '';

        const planilla = document.createElement('div');
        planilla.classList.add('planilla');

        const titulo = document.createElement('h3');
        titulo.textContent = `Planilla de Asistencia - ${cursoSeleccionado.toUpperCase()}`;
        titulo.classList.add('mb-3');
        planilla.appendChild(titulo);

        const tabla = document.createElement('table');
        tabla.classList.add('table', 'table-bordered', 'table-planilla');

        const thead = document.createElement('thead');
        thead.classList.add('table-dark');
        const encabezadoFila = document.createElement('tr');

        const columnas = ['Día', 'Materia', 'Profesor', 'Presente', 'Ausente'];

        columnas.forEach(columna => {
            const th = document.createElement('th');
            th.textContent = columna;
            th.classList.add('text-center');
            encabezadoFila.appendChild(th);
        });

        thead.appendChild(encabezadoFila);
        tabla.appendChild(thead);

        const tbody = document.createElement('tbody');

        const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
        dias.forEach(dia => {
            const materias = horarioPorCurso[cursoSeleccionado][dia] || [];

            materias.forEach((materiaObj, index) => {
                const fila = document.createElement('tr');

                // Celda para el día (solo en la primera materia del día)
                if (index === 0) {
                    const celdaDia = document.createElement('td');
                    celdaDia.textContent = dia;
                    celdaDia.classList.add('celda-dia');
                    celdaDia.setAttribute('rowspan', materias.length);
                    fila.appendChild(celdaDia);
                }

                // Celda para la materia
                const celdaMateria = document.createElement('td');
                celdaMateria.textContent = materiaObj.materia;
                celdaMateria.classList.add('celda-materia');
                fila.appendChild(celdaMateria);

                // Celda para el profesor
                const celdaProfesor = document.createElement('td');
                celdaProfesor.textContent = materiaObj.profesor;
                celdaProfesor.classList.add('celda-profesor');
                fila.appendChild(celdaProfesor);

                // Celda para "Presente" con checkbox
                const celdaPresente = document.createElement('td');
                celdaPresente.classList.add('celda-presente');
                const checkboxPresente = document.createElement('input');
                checkboxPresente.type = 'checkbox';
                checkboxPresente.checked = true; // Presente por defecto
                checkboxPresente.classList.add('form-check-input');
                celdaPresente.appendChild(checkboxPresente);
                fila.appendChild(celdaPresente);

                // Celda para "Ausente" con checkbox
                const celdaAusente = document.createElement('td');
                celdaAusente.classList.add('celda-ausente');
                const checkboxAusente = document.createElement('input');
                checkboxAusente.type = 'checkbox';
                checkboxAusente.classList.add('form-check-input');
                celdaAusente.appendChild(checkboxAusente);
                fila.appendChild(celdaAusente);

                // Evento para manejar la asistencia
                checkboxPresente.addEventListener('change', () => {
                    if (checkboxPresente.checked) {
                        checkboxAusente.checked = false;
                        celdaProfesor.textContent = materiaObj.profesor; // Restaurar el profesor original
                        removeAusencia(materiaObj.profesor, obtenerMesSeleccionado(), dia);
                        fila.classList.remove('fila-ausente');
                        actualizarPorcentajes();
                        actualizarResumenFaltas(materiaObj.profesor, dia, 'presente');
                    }
                });

                checkboxAusente.addEventListener('change', () => {
                    if (checkboxAusente.checked) {
                        checkboxPresente.checked = false;
                        asignarSustituto(materiaObj, dia, obtenerMesSeleccionado(), celdaProfesor, fila);
                        actualizarPorcentajes();
                        actualizarResumenFaltas(materiaObj.profesor, dia, 'ausente');
                    } else {
                        // Restaurar el profesor original si se desmarca la ausencia
                        celdaProfesor.textContent = materiaObj.profesor;
                        removeAusencia(materiaObj.profesor, obtenerMesSeleccionado(), dia);
                        fila.classList.remove('fila-ausente');
                        actualizarPorcentajes();
                        actualizarResumenFaltas(materiaObj.profesor, dia, 'presente');
                    }
                });

                // Verificar si hay ausencia registrada para este docente y día
                const mesActual = obtenerMesSeleccionado();
                const diaActual = dia;
                if (faltas[materiaObj.profesor] && faltas[materiaObj.profesor][mesActual] && faltas[materiaObj.profesor][mesActual][diaActual]) {
                    checkboxAusente.checked = true;
                    checkboxPresente.checked = false;
                    fila.classList.add('fila-ausente');
                    celdaProfesor.textContent = getSustitutoNombre(materiaObj.materia, materiaObj.profesor, mesActual, diaActual);
                }

                tbody.appendChild(fila);
            });
        });

        tabla.appendChild(tbody);
        planilla.appendChild(tabla);
        planillaContainer.appendChild(planilla);

        mostrarResumenAusencias();
        actualizarPorcentajes();
    }

    // Función para obtener el mes seleccionado en formato 'YYYY-MM'
    function obtenerMesSeleccionado() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    }

    // Función para asignar suplentes automáticamente
    function asignarSustituto(materiaObj, dia, mes, celdaProfesor, fila) {
        const suplentes = obtenerSuplentes(materiaObj.materia);

        if (suplentes.length === 0) {
            alert(`No hay suplentes disponibles para la materia ${materiaObj.materia}.`);
            return;
        }

        // Seleccionar un suplente rotativo
        const sustituto = obtenerSustitutoRotativo(materiaObj.materia);

        if (!sustituto) {
            alert(`No hay suplentes disponibles para la materia ${materiaObj.materia}.`);
            return;
        }

        // Actualizar la celda del profesor con el suplente
        celdaProfesor.textContent = `${sustituto.nombre} ${sustituto.tipo}`;

        // Registrar la ausencia
        registrarAusencia(sustituto.nombre, mes, dia);

        // Resaltar la fila
        fila.classList.add('fila-ausente');
    }

    // Función para obtener un suplente rotativo
    function obtenerSustitutoRotativo(materia) {
        if (!suplentesPorMateria[materia] || suplentesPorMateria[materia].length === 0) {
            return null;
        }

        // Obtener el último suplente asignado desde localStorage
        const ultimoAsignado = localStorage.getItem(`ultimoSuplente_${materia}`);
        let siguienteSuplente;

        if (ultimoAsignado) {
            const index = suplentesPorMateria[materia].findIndex(s => s.nombre === ultimoAsignado);
            siguienteSuplente = suplentesPorMateria[materia][(index + 1) % suplentesPorMateria[materia].length];
        } else {
            siguienteSuplente = suplentesPorMateria[materia][0];
        }

        // Guardar el suplente asignado para la próxima vez
        localStorage.setItem(`ultimoSuplente_${materia}`, siguienteSuplente.nombre);

        return siguienteSuplente;
    }

    // Función para obtener el nombre del suplente para mostrar en la celda
    function getSustitutoNombre(materia, profesorOriginal, mes, dia) {
        const suplente = obtenerSustitutoRotativo(materia);
        if (suplente) {
            return `${suplente.nombre} ${suplente.tipo}`;
        }
        return profesorOriginal;
    }

    // Función para registrar una ausencia
    function registrarAusencia(docente, mes, dia) {
        if (!faltas[docente]) {
            faltas[docente] = {};
        }
        if (!faltas[docente][mes]) {
            faltas[docente][mes] = {};
        }
        if (!faltas[docente][mes][dia]) {
            faltas[docente][mes][dia] = 0;
        }
        faltas[docente][mes][dia] += 1;
        guardarFaltas();
        mostrarResumenFaltasList();
    }

    // Función para eliminar una ausencia
    function removeAusencia(docente, mes, dia) {
        if (faltas[docente] && faltas[docente][mes] && faltas[docente][mes][dia]) {
            faltas[docente][mes][dia] -= 1;
            if (faltas[docente][mes][dia] <= 0) {
                delete faltas[docente][mes][dia];
            }
            if (Object.keys(faltas[docente][mes]).length === 0) {
                delete faltas[docente][mes];
            }
            if (Object.keys(faltas[docente]).length === 0) {
                delete faltas[docente];
            }
            guardarFaltas();
            mostrarResumenFaltasList();
        }
    }

    // Función para guardar faltas en localStorage
    function guardarFaltas() {
        localStorage.setItem('faltas', JSON.stringify(faltas));
    }

    // Función para obtener suplentes por materia
    function obtenerSuplentes(materia) {
        return suplentesPorMateria[materia] || [];
    }

    // Función para mostrar el resumen de ausencias por docente
    function mostrarResumenAusencias() {
        // Eliminar el resumen anterior si existe
        const resumenPrevio = document.getElementById('resumen-ausencias');
        if (resumenPrevio) {
            resumenPrevio.remove();
        }

        const resumenContainer = document.createElement('div');
        resumenContainer.id = 'resumen-ausencias';
        resumenContainer.classList.add('mt-4');

        const titulo = document.createElement('h4');
        titulo.textContent = 'Resumen de Ausencias por Docente';
        resumenContainer.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.classList.add('list-group');

        for (const docente in faltas) {
            let totalAusencias = 0;
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    totalAusencias += faltas[docente][mes][dia];
                }
            }
            const item = document.createElement('li');
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = docente;
            const badge = document.createElement('span');
            badge.classList.add('badge', 'bg-danger', 'rounded-pill');
            badge.textContent = totalAusencias;
            item.appendChild(badge);
            lista.appendChild(item);
        }

        resumenContainer.appendChild(lista);
        planillaContainer.appendChild(resumenContainer);
    }

    // Función para mostrar el resumen de faltas en la lista lateral
    function mostrarResumenFaltasList() {
        listaFaltas.innerHTML = '';

        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    const cantidad = faltas[docente][mes][dia];
                    const item = document.createElement('li');
                    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                    item.textContent = `${docente} - ${mes}-${dia}`;
                    const badge = document.createElement('span');
                    badge.classList.add('badge', 'bg-danger', 'rounded-pill');
                    badge.textContent = cantidad;
                    const eliminarIcono = document.createElement('i');
                    eliminarIcono.classList.add('fas', 'fa-trash-alt', 'remove-falta');
                    eliminarIcono.title = 'Eliminar Falta';
                    eliminarIcono.addEventListener('click', () => {
                        removeFalta(docente, mes, dia);
                    });
                    const container = document.createElement('div');
                    container.appendChild(badge);
                    container.appendChild(eliminarIcono);
                    item.appendChild(container);
                    listaFaltas.appendChild(item);
                }
            }
        }
    }

    // Función para actualizar el resumen de faltas al agregar o eliminar
    function actualizarResumenFaltas(docente, dia, accion) {
        // Actualizar la lista lateral
        mostrarResumenFaltasList();
        // Actualizar el resumen principal
        mostrarResumenAusencias();
    }

    // Función para manejar la eliminación de faltas desde la lista lateral
    function removeFalta(docente, mes, dia) {
        removeAusencia(docente, mes, dia);
        // Actualizar la planilla para reflejar cambios
        displayPlanilla();
    }

    // Manejar el envío del formulario de faltas
    formFaltas.addEventListener('submit', (e) => {
        e.preventDefault();
        const docente = selectProfesor.value;
        const cantidad = parseInt(cantidadFaltas.value);
        const fecha = fechaFalta.value; // Formato 'YYYY-MM-DD'

        if (!docente || !cantidad || !fecha) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const [year, month, day] = fecha.split('-');
        const fechaFormateada = `${year}-${month}-${day}`;

        for (let i = 0; i < cantidad; i++) {
            registrarAusencia(docente, `${year}-${month}`, day);
        }

        // Actualizar la planilla y los resúmenes
        displayPlanilla();

        // Limpiar el formulario
        formFaltas.reset();
    });

    // Función para guardar y actualizar faltas
    function registrarAusencia(docente, mes, dia) {
        if (!faltas[docente]) {
            faltas[docente] = {};
        }
        if (!faltas[docente][mes]) {
            faltas[docente][mes] = {};
        }
        if (!faltas[docente][mes][dia]) {
            faltas[docente][mes][dia] = 0;
        }
        faltas[docente][mes][dia] += 1;
        guardarFaltas();
        mostrarResumenFaltasList();
        mostrarResumenAusencias();
    }

    // Función para eliminar una ausencia (reducir la cantidad)
    function removeAusencia(docente, mes, dia) {
        if (faltas[docente] && faltas[docente][mes] && faltas[docente][mes][dia]) {
            faltas[docente][mes][dia] -= 1;
            if (faltas[docente][mes][dia] <= 0) {
                delete faltas[docente][mes][dia];
            }
            if (Object.keys(faltas[docente][mes]).length === 0) {
                delete faltas[docente][mes];
            }
            if (Object.keys(faltas[docente]).length === 0) {
                delete faltas[docente];
            }
            guardarFaltas();
            mostrarResumenFaltasList();
            mostrarResumenAusencias();
        }
    }

    // Función para guardar faltas en localStorage
    function guardarFaltas() {
        localStorage.setItem('faltas', JSON.stringify(faltas));
    }

    // Función para obtener suplentes por materia
    function obtenerSuplentes(materia) {
        return suplentesPorMateria[materia] || [];
    }

    // Función para mostrar el resumen de ausencias por docente
    function mostrarResumenAusencias() {
        // Eliminar el resumen anterior si existe
        const resumenPrevio = document.getElementById('resumen-ausencias');
        if (resumenPrevio) {
            resumenPrevio.remove();
        }

        const resumenContainer = document.createElement('div');
        resumenContainer.id = 'resumen-ausencias';
        resumenContainer.classList.add('mt-4');

        const titulo = document.createElement('h4');
        titulo.textContent = 'Resumen de Ausencias por Docente';
        resumenContainer.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.classList.add('list-group');

        for (const docente in faltas) {
            let totalAusencias = 0;
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    totalAusencias += faltas[docente][mes][dia];
                }
            }
            const item = document.createElement('li');
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = docente;
            const badge = document.createElement('span');
            badge.classList.add('badge', 'bg-danger', 'rounded-pill');
            badge.textContent = totalAusencias;
            item.appendChild(badge);
            lista.appendChild(item);
        }

        resumenContainer.appendChild(lista);
        planillaContainer.appendChild(resumenContainer);
    }

    // Función para mostrar el resumen de faltas en la lista lateral
    function mostrarResumenFaltasList() {
        listaFaltas.innerHTML = '';

        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    const cantidad = faltas[docente][mes][dia];
                    const item = document.createElement('li');
                    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                    item.textContent = `${docente} - ${mes}-${dia}`;
                    const badge = document.createElement('span');
                    badge.classList.add('badge', 'bg-danger', 'rounded-pill');
                    badge.textContent = cantidad;
                    const eliminarIcono = document.createElement('i');
                    eliminarIcono.classList.add('fas', 'fa-trash-alt', 'remove-falta');
                    eliminarIcono.title = 'Eliminar Falta';
                    eliminarIcono.style.marginLeft = '10px';
                    eliminarIcono.addEventListener('click', () => {
                        removeFalta(docente, mes, dia);
                    });
                    const container = document.createElement('div');
                    container.appendChild(badge);
                    container.appendChild(eliminarIcono);
                    item.appendChild(container);
                    listaFaltas.appendChild(item);
                }
            }
        }
    }

    // Función para actualizar el resumen de faltas al agregar o eliminar
    function actualizarResumenFaltas(docente, dia, accion) {
        // Actualizar la lista lateral
        mostrarResumenFaltasList();
        // Actualizar el resumen principal
        mostrarResumenAusencias();
    }

    // Función para manejar la eliminación de faltas desde la lista lateral
    function removeFalta(docente, mes, dia) {
        removeAusencia(docente, mes, dia);
        // Actualizar la planilla para reflejar cambios
        displayPlanilla();
    }

    // Función para exportar a Excel
    function exportToExcel() {
        console.log('Exportando a Excel para el curso:', cursoSeleccionado);

        if (!horarioPorCurso[cursoSeleccionado]) {
            alert('No hay materias definidas para este curso.');
            return;
        }

        const wb = XLSX.utils.book_new();

        // Hoja de Asistencia
        const tablaOriginal = planillaContainer.querySelector('table');
        const ws = XLSX.utils.table_to_sheet(tablaOriginal);
        ws['!cols'] = [
            { wpx: 100 }, // Día
            { wpx: 150 }, // Materia
            { wpx: 200 }, // Profesor
            { wpx: 80 },  // Presente
            { wpx: 80 }   // Ausente
        ];
        XLSX.utils.book_append_sheet(wb, ws, 'Planilla');

        // Hoja de Faltas
        const wsFaltas = XLSX.utils.json_to_sheet(transformarFaltasParaExcel());
        XLSX.utils.book_append_sheet(wb, wsFaltas, 'Faltas');

        // Hoja de Resumen de Faltas
        const resumen = transformarResumenFaltasParaExcel();
        const wsResumen = XLSX.utils.json_to_sheet(resumen);
        XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen Faltas');

        // Exportar el libro a un archivo Excel
        XLSX.writeFile(wb, `planilla_${cursoSeleccionado.replace('°', '').replace(' ', '_')}.xlsx`);
    }

    // Función para transformar las faltas en un formato adecuado para Excel
    function transformarFaltasParaExcel() {
        const data = [];
        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    const cantidad = faltas[docente][mes][dia];
                    data.push({
                        "Docente": docente,
                        "Mes": mes,
                        "Día": dia,
                        "Cantidad de Faltas": cantidad
                    });
                }
            }
        }
        return data;
    }

    // Función para transformar el resumen de faltas para Excel
    function transformarResumenFaltasParaExcel() {
        const resumen = [];
        for (const docente in faltas) {
            let totalAusencias = 0;
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    totalAusencias += faltas[docente][mes][dia];
                }
            }
            resumen.push({
                "Docente": docente,
                "Total Faltas": totalAusencias
            });
        }
        return resumen;
    }

    // Función para exportar a PDF
    function exportToPDF(tipoExportacion) {
        console.log(`Exportando a PDF (${tipoExportacion}) para el curso:`, cursoSeleccionado);

        if (!horarioPorCurso[cursoSeleccionado]) {
            alert('No hay materias definidas para este curso.');
            return;
        }

        const planillaClonada = planillaContainer.cloneNode(true);

        // Crear un contenedor temporal para renderizar
        const contenedorTemporal = document.createElement('div');
        contenedorTemporal.style.position = 'absolute';
        contenedorTemporal.style.left = '-9999px'; // Mover fuera de la pantalla
        contenedorTemporal.style.top = '0';
        contenedorTemporal.style.backgroundColor = 'white';
        contenedorTemporal.appendChild(planillaClonada);
        document.body.appendChild(contenedorTemporal);

        // Usar html2canvas para capturar la planilla
        html2canvas(contenedorTemporal, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
            pdf.save(`planilla_${cursoSeleccionado.replace('°', '').replace(' ', '_')}.pdf`);

            // Eliminar el contenedor temporal
            document.body.removeChild(contenedorTemporal);
        }).catch(error => {
            console.error('Error al generar el PDF:', error);
            alert('Hubo un error al generar el PDF.');
            document.body.removeChild(contenedorTemporal);
        });
    }

    // Función para poblar el select de profesores en el panel lateral
    function populateSelectProfesor() {
        selectProfesor.innerHTML = '';
        const profesores = obtenerListaProfesores();
        profesores.forEach(profesor => {
            const option = document.createElement('option');
            option.value = profesor;
            option.textContent = profesor;
            selectProfesor.appendChild(option);
        });
    }

    // Función para obtener la lista de profesores del curso seleccionado
    function obtenerListaProfesores() {
        const profesores = new Set();
        const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
        dias.forEach(dia => {
            const materias = horarioPorCurso[cursoSeleccionado][dia] || [];
            materias.forEach(materiaObj => {
                const nombreProfesor = materiaObj.profesor.split(' (')[0].trim();
                profesores.add(nombreProfesor);
            });
        });
        return Array.from(profesores);
    }

    // Función para manejar el resumen de faltas
    function mostrarResumenFaltas() {
        mostrarResumenFaltasList();
        mostrarResumenAusencias();
    }

    // Inicializar la selección de cursos y profesores al cargar la página
    if (cursosDisponibles.length > 0) {
        displayCursoSelection();
        populateSelectProfesor();
        displayPlanilla();
        mostrarResumenFaltasList();
    } else {
        cursoContainer.innerHTML = '<p>No hay cursos disponibles.</p>';
    }

    // Event Listeners para los botones de exportación
    exportarCompletaButton.addEventListener('click', () => exportToPDF('completa'));
    exportarExcelButton.addEventListener('click', exportToExcel);
});
