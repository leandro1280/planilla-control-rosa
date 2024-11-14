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
    const limpiarLocalStorageButton = document.getElementById('limpiarLocalStorage');

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
        "2° 1°": {
            "LUNES": [
                { "materia": "PLG", "profesor": "Mendivil (T)/Ramirez Lurdes (S)" },
                { "materia": "FQA", "profesor": "Iacobucci (T)" },
                { "materia": "CCD", "profesor": "Daglio (T)" }
            ],
            "MARTES": [
                { "materia": "HTR", "profesor": "Lucero (T)" },
                { "materia": "AMC", "profesor": "Artola (T)" },
                { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
            ],
            "MIERCOLES": [
                { "materia": "BLG", "profesor": "Gerhardt (T)" },
                { "materia": "IGS", "profesor": "Rivero (T)" }
            ],
            "JUEVES": [
                { "materia": "MTM", "profesor": "Motta (P)" },
                { "materia": "PLG", "profesor": "Mendivil (T)/Cardillo (S)" }
            ],
            "VIERNES": [
                { "materia": "MTM", "profesor": "Motta (P)" },
                { "materia": "GGF", "profesor": "Almada (TI)" }
            ]
        },
        "3° 1°": {
            "LUNES": [
                { "materia": "FQA", "profesor": "Iacobucci (T)" },
                { "materia": "BLG", "profesor": "Gerhardt (T)" },
                { "materia": "CCD", "profesor": "Capecce (P)" }
            ],
            "MARTES": [
                { "materia": "AMC", "profesor": "Artola (T)/Pulsen Victor" },
                { "materia": "GGF", "profesor": "Gamboa (T)/Echeverry (S)" },
                { "materia": "EFC", "profesor": "Cao (T)/Alvarez Fernando (S)" }
            ],
            "MIERCOLES": [
                { "materia": "PLG", "profesor": "Mendivil (T)/Cardillo (S)" },
                { "materia": "IGS", "profesor": "Sanchez Carolina (P)" },
                { "materia": "CCD", "profesor": "Capecce" }
            ],
            "JUEVES": [
                { "materia": "PLG", "profesor": "Mendivil (T)/Cardillo (S)" },
                { "materia": "MTM", "profesor": "Coronel Emilia (P)" }
            ],
            "VIERNES": [
                { "materia": "HTR", "profesor": "Soruco (T)/Etcheverry (S)" },
                { "materia": "MTM", "profesor": "Coronel Emilia (P)" },
                { "materia": "EFC", "profesor": "Cao (T)/Alvarez Fernando (S)" }
            ]
        },
        "4° 1°": {
            "LUNES": [
                { "materia": "SYA", "profesor": "Miranda Ag (TI)" },
                { "materia": "LIT", "profesor": "Mendivil (T)/Cardillo (S)" },
                { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
            ],
            "MARTES": [
                { "materia": "NTI", "profesor": "Crivaro (T)" },
                { "materia": "IAF", "profesor": "Torrez Janco (P)" },
                { "materia": "GGF", "profesor": "Ferreyra M" }
            ],
            "MIERCOLES": [
                { "materia": "HTR", "profesor": "Soruco (T)/Esquiros (S)" },
                { "materia": "PLG", "profesor": "Mendivil/Cardillo (S)" },
                { "materia": "BLG", "profesor": "Karlen Lusia (T)" },
                { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
            ],
            "JUEVES": [
                { "materia": "PSI", "profesor": "Cateriano Claudia (T)" },
                { "materia": "MCS", "profesor": "Gomez Nat (T)/Motta J (S)" },
                { "materia": "MCS", "profesor": "Gomez Nat (T)/Motta J (S)" }
            ],
            "VIERNES": [
                { "materia": "GGF", "profesor": "Ferreyra M (P)" },
                { "materia": "HTR", "profesor": "Soruco (T)/Esquiroz (P)" },
                { "materia": "IGS", "profesor": "Soleto Daniela (P)" }
            ]
        },
        "5° 2°": {
            "LUNES": [
                { "materia": "CCD", "profesor": "Pacheco (T)" },
                { "materia": "GGF", "profesor": "Gamboa" }
            ],
            "MARTES": [
                { "materia": "LIT", "profesor": "Perez Ramirez A (T)" },
                { "materia": "HTR", "profesor": "Lucero Gianetti (T)" },
                { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
            ],
            "MIERCOLES": [
                { "materia": "IGS", "profesor": "Sanchez (P)" },
                { "materia": "PYC", "profesor": "Armendano Benicio (T)" },
                { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
            ],
            "JUEVES": [
                { "materia": "IAQ", "profesor": "Pasalagua (TI)" },
                { "materia": "MCS", "profesor": "Pereyra Manuel" }
            ],
            "VIERNES": [
                { "materia": "SOC", "profesor": "Ferrero Verzulli M (T)" },
                { "materia": "SOC", "profesor": "Ferrero Verzulli M (T)" },
                { "materia": "EPO", "profesor": "Gonzalez Antonia (T)" }
            ]
        },
        "6° 2°": {
            "LUNES": [
                { "materia": "HTR", "profesor": "VAIO Jorge" },
                { "materia": "FIA", "profesor": "SEQUI Emilio" },
                { "materia": "EFC", "profesor": "DUMONTET Gaston" }
            ],
            "MARTES": [
                { "materia": "LIT", "profesor": "CARDILLO Paula" },
                { "materia": "RTE", "profesor": "DELLAGIOVANNA Paola" }
            ],
            "MIERCOLES": [
                { "materia": "TYC", "profesor": "VAIO Jorge" },
                { "materia": "MCS", "profesor": "MOTTA Jorge" },
                { "materia": "GGF", "profesor": "FERREYRA Maria" }
            ],
            "JUEVES": [
                { "materia": "IGS", "profesor": "RIVAS Marcela" },
                { "materia": "PIC", "profesor": "MORAU Nestor" }
            ],
            "VIERNES": [
                { "materia": "PIC", "profesor": "MORAU Nestor" },
                { "materia": "MCS", "profesor": "MOTTA Jorge" }
            ]
        },
        "1° 2°": {
            "LUNES": [
                { "materia": "PLG", "profesor": "Barbosa (S)" },
                { "materia": "CNT", "profesor": "Leon Jimena (P)" },
                { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
            ],
            "MARTES": [
                { "materia": "CSC", "profesor": "Peña M Jose (T)" },
                { "materia": "PLG", "profesor": "Barbosa (P)" }
            ],
            "MIERCOLES": [
                { "materia": "AMC", "profesor": "Garcia Lila (T)" },
                { "materia": "IGS", "profesor": "Rivero Griselda (T)" }
            ],
            "JUEVES": [
                { "materia": "CNT", "profesor": "Leon Jimena (P)" },
                { "materia": "MTM", "profesor": "LOPEZ Karina (TI)" },
                { "materia": "CCD", "profesor": "Olivera Patricia (T)" }
            ],
            "VIERNES": [
                { "materia": "CSC", "profesor": "Peña M Jose (T)" },
                { "materia": "", "profesor": "Torrez Janco R (P)" } // Materia no especificada
            ]
        },
        "1° 3°": {
            "LUNES": [
                { "materia": "CSC", "profesor": "Vio Jorge (T)" },
                { "materia": "CNT", "profesor": "Da Silva Segovia (TI)" },
                { "materia": "CCD", "profesor": "Pacheco (T)" }
            ],
            "MARTES": [
                { "materia": "AMC", "profesor": "Silva Florencia (T)" },
                { "materia": "CSC", "profesor": "Vaio Jorge (T)" }
            ],
            "MIERCOLES": [
                { "materia": "CNT", "profesor": "Da Silva Segovia (TI)" },
                { "materia": "IGS", "profesor": "Rivero (T)" }
            ],
            "JUEVES": [
                { "materia": "MTM", "profesor": "LOPEZ Karina (TI)" },
                { "materia": "PLG", "profesor": "Roldan Camila (TI)/BONETTI" },
                { "materia": "EFC", "profesor": "Zulberti Jorge (T)" }
            ],
            "VIERNES": [
                { "materia": "MTM", "profesor": "Torrez Janco (P)" },
                { "materia": "PLG", "profesor": "Roldan Camila (TI)/BONETTI" }
            ]
        },
        "2° 2°": {
            "LUNES": [
                { "materia": "HTR", "profesor": "Peña M Jose (P)" },
                { "materia": "MTM", "profesor": "Caracoche Eliana (P)" },
                { "materia": "CCD", "profesor": "Daglio (T)" },
                { "materia": "EFC", "profesor": "Cao (T)/Miguel Pablo (S)" }
            ],
            "MARTES": [
                { "materia": "GGF", "profesor": "Ferreyra M (P)" },
                { "materia": "MTM", "profesor": "Cracoche Eliana (P)" }
            ],
            "MIERCOLES": [
                { "materia": "FQA", "profesor": "Iacobucci D (T)" },
                { "materia": "IGS", "profesor": "Yamuni M (P)" },
                { "materia": "CCD", "profesor": "Daglio (T)" },
                { "materia": "EFC", "profesor": "Cao (T)/Miguel Pablo (S)" }
            ],
            "JUEVES": [
                { "materia": "PLG", "profesor": "Roldan Camila (T)/CASAS" },
                { "materia": "BLG", "profesor": "Degue Viviana (T)" }
            ],
            "VIERNES": [
                { "materia": "PLG", "profesor": "Roldan Camila (TI)" },
                { "materia": "AMC", "profesor": "Tambour Carlo (T)" },
                { "materia": "MTM", "profesor": "Marquina Venero (P)" }
            ]
        },
        "3° 2°": {
            "LUNES": [
                { "materia": "MTM", "profesor": "Pariachi W (P)" },
                { "materia": "PGL", "profesor": "Roldan Camila (TI)" },
                { "materia": "EFC", "profesor": "Cao (T)/Miguel Pablo (S)" }
            ],
            "MARTES": [
                { "materia": "PGL", "profesor": "Roldan Camila (TI)" },
                { "materia": "GGF", "profesor": "Suarez Ojeda Agustina (T)" },
                { "materia": "CCD", "profesor": "Alvarez Fernando (T)" }
            ],
            "MIERCOLES": [
                { "materia": "MTM", "profesor": "Pariachi W (P)" },
                { "materia": "IGS", "profesor": "Aceto Analia (P)" },
                { "materia": "CCD", "profesor": "Alvarez Fernando (T)" },
                { "materia": "EFC", "profesor": "Cao (T)/Miguel Pablo (S)" }
            ],
            "JUEVES": [
                { "materia": "BLG", "profesor": "Valentini E. (T)" },
                { "materia": "FQA", "profesor": "Iacobucci D (T)" }
            ],
            "VIERNES": [
                { "materia": "AMC", "profesor": "Aberasturi Javier (T)" },
                { "materia": "HTR", "profesor": "Vaio Jorge (P)" }
            ]
        },
        "2° 3°": {
            "LUNES": [
                { "materia": "PLG", "profesor": "Barbosa (T)" },
                { "materia": "HTR", "profesor": "Poblete Daniela (T)" },
                { "materia": "CCD", "profesor": "Pacheco D (T)" }
            ],
            "MARTES": [
                { "materia": "GGF", "profesor": "Suarez Ojeda (T)" },
                { "materia": "BLG", "profesor": "Degue Graciela (P)" }
            ],
            "MIERCOLES": [
                { "materia": "FQA", "profesor": "Solle G (T)/Pariachi (S)" },
                { "materia": "IGS", "profesor": "Etchegaray (P)/Sanchez Carolina" },
                { "materia": "EFC", "profesor": "Zulberti Jorge (T)" }
            ],
            "JUEVES": [
                { "materia": "MTM", "profesor": "Marquina Venero (P)" },
                { "materia": "PGL", "profesor": "Barbosa (T)" }
            ],
            "VIERNES": [
                { "materia": "AMC", "profesor": "Tambour Carlo (T)" },
                { "materia": "MTM", "profesor": "Marquina Venero (P)" }
            ]
        },
        "4° 2°": {
            "LUNES": [
                { "materia": "SYA", "profesor": "Videla Estela (T)" },
                { "materia": "HTR", "profesor": "Cotovich Leonardo (TI)" },
                { "materia": "EFC", "profesor": "Miguel Pablo (T)" }
            ],
            "MARTES": [
                { "materia": "BLG", "profesor": "Karlen Lucia (T)" },
                { "materia": "IGS", "profesor": "Etchegaray M (P)/Sanchez Carolina" }
            ],
            "MIERCOLES": [
                { "materia": "PSI", "profesor": "Fajre M E (T)" },
                { "materia": "LIT", "profesor": "Castro Ce (T)/Zamora Romina" },
                { "materia": "EFC", "profesor": "Miguel Pablo (T)" }
            ],
            "JUEVES": [
                { "materia": "IAF", "profesor": "Iacobucci D (T)" },
                { "materia": "GGF", "profesor": "Almada Catalina (TI)" }
            ],
            "VIERNES": [
                { "materia": "NTI", "profesor": "Molina M (T)" },
                { "materia": "MTM", "profesor": "Tiziano M (TI)" }
            ]
        },
        "5° 1°": {
            "LUNES": [
                { "materia": "CCD", "profesor": "Pacheco D (T)" },
                { "materia": "SOC", "profesor": "Orsi Pablo" }
            ],
            "MARTES": [
                { "materia": "EPO", "profesor": "Bianco Walter (T)" },
                { "materia": "IGS", "profesor": "Echegaray Maria (P)" }
            ],
            "MIERCOLES": [
                { "materia": "MCS", "profesor": "Gomez Natalia (T)/Sommariva (S)" },
                { "materia": "HTR", "profesor": "Cotovich Leonardo (TI)" },
                { "materia": "EFC", "profesor": "Zulberti Jorge (T)" }
            ],
            "JUEVES": [
                { "materia": "LIT", "profesor": "Castro Ce (T)/Zamora Romina" },
                { "materia": "IAQ", "profesor": "Gimenez Juana (T)" }
            ],
            "VIERNES": [
                { "materia": "PYC", "profesor": "Mendez Mariano (T)" },
                { "materia": "GGF", "profesor": "Almada Catalina (TI)" }
            ]
        },
        "6° 1°": {
            "LUNES": [
                { "materia": "FIA", "profesor": "Diaz Odina (T)/Bastias Francisco (S)" },
                { "materia": "RTE", "profesor": "Morette Maria (T)" },
                { "materia": "EFC", "profesor": "Alvares Andrea (T)/Alvarez Fer (S)" }
            ],
            "MARTES": [
                { "materia": "IGS", "profesor": "RIVAS MA (TI)" }, // Profesor incompleto
                { "materia": "HTR", "profesor": "Baldi N (T)/Cardenas (S)" },
                { "materia": "MCM", "profesor": "Gomez Nat (T)/Motta J (S)" }
            ],
            "MIERCOLES": [
                { "materia": "TYC", "profesor": "Payares Gaston (T)" },
                { "materia": "HTR", "profesor": "Baldi N (T)/Cardenas (S)" },
                { "materia": "MCS", "profesor": "Gomez Nat (T)/Motta (S)" }
            ],
            "JUEVES": [
                { "materia": "GGF", "profesor": "Perez Norma (P)" },
                { "materia": "LIT", "profesor": "Castro Ce (T)/Zamora Romina" }
            ],
            "VIERNES": [
                { "materia": "PIC", "profesor": "Villar Lidia (T)" },
                { "materia": "EFC", "profesor": "Alvares Andrea (T)/Alvarez Fer (S)" },
                { "materia": "MCS", "profesor": "Gomez Nat. (T)/Motta (S)" }
            ]
        }
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

    // Almacenar ausencias: { "docente": { "YYYY-MM": { "DIA": { "motivo": cantidad } } } }
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
                        removeAusencia(materiaObj.profesor, obtenerMesSeleccionado(), dia, null);
                        fila.classList.remove('fila-ausente');
                        contarFaltas();
                        calcularPorcentajes();
                        actualizarResumenFaltas(materiaObj.profesor, dia, null, 'presente');
                    }
                });

                checkboxAusente.addEventListener('change', () => {
                    if (checkboxAusente.checked) {
                        checkboxPresente.checked = false;
                        // Mostrar un prompt o modal para seleccionar el motivo de la falta
                        // Sin embargo, ya hemos agregado el motivo en el formulario, así que asumir que al marcar "Ausente", ya se ha registrado el motivo
                        // Por simplicidad, aquí no añadimos motivo directamente desde los checkboxes
                        alert('Para registrar una falta con motivo, utiliza el formulario de "Agregar Faltas".');
                        // Opcional: podrías automatizar la selección del motivo aquí si lo deseas
                        // Asumiremos que el motivo ya está registrado desde el formulario
                        // Necesitarías vincular el motivo seleccionado al registro de la falta
                        // Esto puede requerir una lógica adicional
                    } else {
                        // Restaurar el profesor original si se desmarca la ausencia
                        celdaProfesor.textContent = materiaObj.profesor;
                        removeAusencia(materiaObj.profesor, obtenerMesSeleccionado(), dia, null);
                        fila.classList.remove('fila-ausente');
                        contarFaltas();
                        calcularPorcentajes();
                        actualizarResumenFaltas(materiaObj.profesor, dia, null, 'presente');
                    }
                });

                // Verificar si hay ausencia registrada para este docente y día
                const mesActual = obtenerMesSeleccionado();
                const diaActual = dia;
                if (faltas[materiaObj.profesor] && faltas[materiaObj.profesor][mesActual] && faltas[materiaObj.profesor][mesActual][diaActual]) {
                    // Mostrar todas las faltas registradas para este día
                    let totalAusencias = 0;
                    for (const motivo in faltas[materiaObj.profesor][mesActual][diaActual]) {
                        totalAusencias += faltas[materiaObj.profesor][mesActual][diaActual][motivo];
                    }
                    if (totalAusencias > 0) {
                        checkboxAusente.checked = true;
                        checkboxPresente.checked = false;
                        fila.classList.add('fila-ausente');
                        // Podrías añadir la lógica para mostrar el motivo aquí si lo deseas
                        // Por simplicidad, no lo hacemos aquí
                    }
                }

                tbody.appendChild(fila);
            });
        });

        tabla.appendChild(tbody);
        planilla.appendChild(tabla);
        planillaContainer.appendChild(planilla);

        mostrarResumenAusencias();
        mostrarResumenFaltasList();
        contarFaltas();
        calcularPorcentajes();
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

        // Registrar la ausencia del suplente
        // Aquí podrías solicitar el motivo si lo deseas
        // Por simplicidad, asignamos un motivo predeterminado
        registrarAusencia(sustituto.nombre, mes, dia, 'Suplencia');

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
    function registrarAusencia(docente, mes, dia, motivo) {
        if (!faltas[docente]) {
            faltas[docente] = {};
        }
        if (!faltas[docente][mes]) {
            faltas[docente][mes] = {};
        }
        if (!faltas[docente][mes][dia]) {
            faltas[docente][mes][dia] = {};
        }
        if (!faltas[docente][mes][dia][motivo]) {
            faltas[docente][mes][dia][motivo] = 0;
        }
        faltas[docente][mes][dia][motivo] += 1;
        guardarFaltas();
        mostrarResumenFaltasList();
        mostrarResumenAusencias();
        contarFaltas();
        calcularPorcentajes();
    }

    // Función para eliminar una ausencia
    function removeAusencia(docente, mes, dia, motivo) {
        if (motivo) {
            // Si se especifica un motivo, eliminar solo esa categoría
            if (faltas[docente] && faltas[docente][mes] && faltas[docente][mes][dia] && faltas[docente][mes][dia][motivo]) {
                faltas[docente][mes][dia][motivo] -= 1;
                if (faltas[docente][mes][dia][motivo] <= 0) {
                    delete faltas[docente][mes][dia][motivo];
                }
                if (Object.keys(faltas[docente][mes][dia]).length === 0) {
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
                contarFaltas();
                calcularPorcentajes();
            }
        } else {
            // Si no se especifica un motivo, eliminar todas las faltas de ese día
            if (faltas[docente] && faltas[docente][mes] && faltas[docente][mes][dia]) {
                delete faltas[docente][mes][dia];
                if (Object.keys(faltas[docente][mes]).length === 0) {
                    delete faltas[docente][mes];
                }
                if (Object.keys(faltas[docente]).length === 0) {
                    delete faltas[docente];
                }
                guardarFaltas();
                mostrarResumenFaltasList();
                mostrarResumenAusencias();
                contarFaltas();
                calcularPorcentajes();
            }
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
                    for (const motivo in faltas[docente][mes][dia]) {
                        totalAusencias += faltas[docente][mes][dia][motivo];
                    }
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

    // Función para contar y mostrar las faltas por docente
    function contarFaltas() {
        const profesores = obtenerListaProfesores();
        
        // Limpiar el contenedor de contadores
        // Vamos a utilizar 'porcentajesContainer' para mostrar tanto contadores como porcentajes
        porcentajesContainer.innerHTML = '';

        // Crear una sección para el contador de faltas
        const contadorSection = document.createElement('div');
        contadorSection.id = 'contador-faltas';
        contadorSection.classList.add('mt-4');

        const tituloContador = document.createElement('h4');
        tituloContador.textContent = 'Contador de Faltas por Docente';
        tituloContador.classList.add('mb-3');
        contadorSection.appendChild(tituloContador);

        const listaContador = document.createElement('ul');
        listaContador.classList.add('list-group');

        profesores.forEach(profesor => {
            let totalAusencias = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            totalAusencias += faltas[profesor][mes][dia][motivo];
                        }
                    }
                }
            }
            const item = document.createElement('li');
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = profesor;
            
            const badge = document.createElement('span');
            badge.classList.add('badge', 'bg-danger', 'rounded-pill');
            badge.textContent = totalAusencias;
            
            item.appendChild(badge);
            listaContador.appendChild(item);
        });

        contadorSection.appendChild(listaContador);
        porcentajesContainer.appendChild(contadorSection);
    }

    // Función para calcular y mostrar los porcentajes de faltas por docente
    function calcularPorcentajes() {
        const profesores = obtenerListaProfesores();
        const totalClases = calcularTotalClases();

        // Crear una sección separada para porcentajes
        const porcentajesSection = document.createElement('div');
        porcentajesSection.id = 'porcentajes-totales';
        porcentajesSection.classList.add('mt-4');

        const titulo = document.createElement('h4');
        titulo.textContent = 'Porcentajes Totales de Faltas por Docente';
        titulo.classList.add('mb-3');
        porcentajesSection.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.classList.add('list-group');

        profesores.forEach(profesor => {
            let totalAusencias = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            totalAusencias += faltas[profesor][mes][dia][motivo];
                        }
                    }
                }
            }
            const porcentajeFaltas = totalClases > 0 ? ((totalAusencias / totalClases) * 100).toFixed(2) : '0.00';
            const item = document.createElement('li');
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = profesor;
            
            const badge = document.createElement('span');
            badge.classList.add('badge', 'bg-warning', 'rounded-pill');
            badge.textContent = `${porcentajeFaltas}%`;
            
            item.appendChild(badge);
            lista.appendChild(item);
        });

        porcentajesSection.appendChild(lista);
        porcentajesContainer.appendChild(porcentajesSection);
    }

    // Función para calcular el total de clases posibles para los docentes
    function calcularTotalClases() {
        let totalClases = 0;
        const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
        dias.forEach(dia => {
            const materias = horarioPorCurso[cursoSeleccionado][dia] || [];
            totalClases += materias.length;
        });
        return totalClases;
    }

    // Función para mostrar el resumen de faltas en la lista lateral
    function mostrarResumenFaltasList() {
        listaFaltas.innerHTML = '';

        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    for (const motivo in faltas[docente][mes][dia]) {
                        const cantidad = faltas[docente][mes][dia][motivo];
                        const item = document.createElement('li');
                        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                        item.textContent = `${docente} - ${mes}-${dia} - ${motivo}`;
                        
                        const badge = document.createElement('span');
                        badge.classList.add('badge', 'bg-danger', 'rounded-pill');
                        badge.textContent = cantidad;

                        const eliminarIcono = document.createElement('i');
                        eliminarIcono.classList.add('fas', 'fa-trash-alt', 'remove-falta');
                        eliminarIcono.title = 'Eliminar Falta';
                        eliminarIcono.style.marginLeft = '10px';
                        eliminarIcono.style.cursor = 'pointer';
                        eliminarIcono.addEventListener('click', () => {
                            removeFalta(docente, mes, dia, motivo);
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
    }

    // Función para actualizar el resumen de faltas al agregar o eliminar
    function actualizarResumenFaltas(docente, dia, motivo, accion) {
        // Actualizar la lista lateral
        mostrarResumenFaltasList();
        // Actualizar el resumen principal
        mostrarResumenAusencias();
        // Actualizar el contador de faltas
        contarFaltas();
        // Actualizar los porcentajes
        calcularPorcentajes();
    }

    // Función para manejar la eliminación de faltas desde la lista lateral
    function removeFalta(docente, mes, dia, motivo) {
        removeAusencia(docente, mes, dia, motivo);
        // Actualizar la planilla para reflejar cambios
        displayPlanilla();
    }

    // Manejar el envío del formulario de faltas
    formFaltas.addEventListener('submit', (e) => {
        e.preventDefault();
        const docente = selectProfesor.value;
        const cantidad = parseInt(cantidadFaltas.value);
        const fecha = fechaFalta.value; // Formato 'YYYY-MM-DD'
        const motivo = document.getElementById('motivoFalta').value;

        if (!docente || !cantidad || !fecha || !motivo) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const [year, month, day] = fecha.split('-');
        const mesFormateado = `${year}-${month}`;

        for (let i = 0; i < cantidad; i++) {
            registrarAusencia(docente, mesFormateado, day, motivo);
        }

        // Actualizar la planilla y los resúmenes
        displayPlanilla();

        // Limpiar el formulario
        formFaltas.reset();
    });

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

        // Hoja de Faltas Detalladas
        const wsFaltas = XLSX.utils.json_to_sheet(transformarFaltasParaExcel());
        XLSX.utils.book_append_sheet(wb, wsFaltas, 'Faltas Detalladas');

        // Hoja de Contador de Faltas
        const wsContador = XLSX.utils.json_to_sheet(transformarContadorFaltasParaExcel());
        XLSX.utils.book_append_sheet(wb, wsContador, 'Contador Faltas');

        // Hoja de Porcentajes Totales
        const wsPorcentajes = XLSX.utils.json_to_sheet(transformarPorcentajesParaExcel());
        XLSX.utils.book_append_sheet(wb, wsPorcentajes, 'Porcentajes Totales');

        // Exportar el libro a un archivo Excel
        XLSX.writeFile(wb, `planilla_${cursoSeleccionado.replace('°', '').replace(' ', '_')}.xlsx`);
    }

    // Función para transformar las faltas en un formato adecuado para Excel
    function transformarFaltasParaExcel() {
        const data = [];
        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    for (const motivo in faltas[docente][mes][dia]) {
                        const cantidad = faltas[docente][mes][dia][motivo];
                        data.push({
                            "Docente": docente,
                            "Mes": mes,
                            "Día": dia,
                            "Motivo": motivo,
                            "Cantidad de Faltas": cantidad
                        });
                    }
                }
            }
        }
        return data;
    }

    // Función para transformar el contador de faltas para Excel
    function transformarContadorFaltasParaExcel() {
        const data = [];
        const profesores = obtenerListaProfesores();

        profesores.forEach(profesor => {
            let totalAusencias = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            totalAusencias += faltas[profesor][mes][dia][motivo];
                        }
                    }
                }
            }
            data.push({
                "Docente": profesor,
                "Total Faltas": totalAusencias
            });
        });

        return data;
    }

    // Función para transformar los porcentajes de faltas para Excel
    function transformarPorcentajesParaExcel() {
        const data = [];
        const profesores = obtenerListaProfesores();
        const totalClases = calcularTotalClases();

        profesores.forEach(profesor => {
            let totalAusencias = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            totalAusencias += faltas[profesor][mes][dia][motivo];
                        }
                    }
                }
            }
            const porcentajeFaltas = totalClases > 0 ? ((totalAusencias / totalClases) * 100).toFixed(2) : '0.00';
            data.push({
                "Docente": profesor,
                "Total Faltas": totalAusencias,
                "Porcentaje de Faltas": `${porcentajeFaltas}%`
            });
        });

        return data;
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
        contarFaltas();
        calcularPorcentajes();
    }

    // Inicializar la selección de cursos y profesores al cargar la página
    if (cursosDisponibles.length > 0) {
        displayCursoSelection();
        populateSelectProfesor();
        displayPlanilla();
        mostrarResumenFaltasList();
        contarFaltas();
        calcularPorcentajes();
    } else {
        cursoContainer.innerHTML = '<p>No hay cursos disponibles.</p>';
    }

    // Event Listeners para los botones de exportación
    exportarCompletaButton.addEventListener('click', () => exportToPDF('completa'));
    exportarExcelButton.addEventListener('click', exportToExcel);
    limpiarLocalStorageButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.clear();
            location.reload();
        }
    });
});
