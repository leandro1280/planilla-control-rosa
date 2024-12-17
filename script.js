document.addEventListener('DOMContentLoaded', () => { 
    // --------------------- Elementos del DOM ---------------------
    const cursoContainer = document.getElementById('curso-container');
    const planillaContainer = document.getElementById('planilla-container');
    const exportarCompletaButton = document.getElementById('exportarCompleta');
    const exportarExcelButton = document.getElementById('exportarExcel');
    const exportarTotalButton = document.getElementById('exportarTotal');
    const limpiarLocalStorageButton = document.getElementById('limpiarLocalStorage');
    
    // Modal para registrar motivo de falta
    const motivoFaltaModal = new bootstrap.Modal(document.getElementById('motivoFaltaModal'));
    const formMotivoFalta = document.getElementById('form-motivo-falta');
    const motivoSeleccionado = document.getElementById('motivoSeleccionado');
    const cantidadSeleccionada = document.getElementById('cantidadSeleccionada');
    const profesorSeleccionado = document.getElementById('profesorSeleccionado');
    const diaSeleccionado = document.getElementById('diaSeleccionado');
    const cursoSeleccionadoModal = document.getElementById('cursoSeleccionadoModal'); // Asegúrate de tener este input hidden en tu HTML

    // Definir el horario
    const horarioPorCurso = {
        "1° 1°": {
    "LUNES": [
        { "materia": "CNT", "profesor": "Pasalacua (T)" },
        { "materia": "PLG", "profesor": "Barbosa (T)" },
        { "materia": "EF", "profesor": "Miguel Pablo (S)" }, 
        { "materia": "CCD", "profesor": "Daglio (T)" }
    ],
    "MARTES": [
        { "materia": "CSC", "profesor": "Alvarez Daniel (T)" },
        { "materia": "MTM", "profesor": "Crivaro (T)" }
    ],
    "MIERCOLES": [
        { "materia": "CNT", "profesor": "Pasalacua (T)" },
        { "materia": "MTM", "profesor": "Crivaro (T)" },
        { "materia": "EFC", "profesor": "Miguel Pablo (S)" }
    ],
    "JUEVES": [
        { "materia": "IGS", "profesor": "Cernada (P)" },
        { "materia": "PLG", "profesor": "Barbosa (T)" }
    ],
    "VIERNES": [
        { "materia": "AMC", "profesor": "Lirussi (S)" },
        { "materia": "CSC", "profesor": "Alvarez Daniel (T)" }
    ]
},
"2° 1°": {
    "LUNES": [
        { "materia": "PLG", "profesor": "Ramirez Lurdes (S)" },
        { "materia": "FQA", "profesor": "Iacobucci (T)" },
        { "materia": "CCD", "profesor": "Daglio (T)" }
    ],
    "MARTES": [
        { "materia": "HTR", "profesor": "Lucero Gianetti (T)" }, 
        { "materia": "AMC", "profesor": "Artola (T)" },
        { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
    ],
    "MIERCOLES": [
        { "materia": "BLG", "profesor": "Gerhardt (T)" },
        { "materia": "IGS", "profesor": "Rivero Griselda (T)" }
    ],
    "JUEVES": [
        { "materia": "MTM", "profesor": "Motta Jorge (P)" }, 
        { "materia": "PLG", "profesor": "Cardillo (S)" }
    ],
    "VIERNES": [
        { "materia": "MTM", "profesor": "Motta Jorge (P)" },
        { "materia": "GGF", "profesor": "Almada Catalina (TI)" } 
    ]
},
"3° 1°": {
    "LUNES": [
        { "materia": "FQA", "profesor": "Iacobucci (T)" },
        { "materia": "BLG", "profesor": "Gerhardt (T)" },
        { "materia": "CCD", "profesor": "Capecce (P)" }
    ],
    "MARTES": [
        { "materia": "AMC", "profesor": "Pulsen Victor(S)" },
        { "materia": "GGF", "profesor": "Echeverry (S)" },
        { "materia": "EFC", "profesor": "Alvarez Fernando (S)" }
    ],
    "MIERCOLES": [
        { "materia": "PLG", "profesor": "Mendivil (T)/Cardillo (S)" },
        { "materia": "IGS", "profesor": "Sanchez Carolina (P)" },
        { "materia": "CCD", "profesor": "Capecce" }
    ],
    "JUEVES": [
        { "materia": "PLG", "profesor": "Cardillo (S)" },
        { "materia": "MTM", "profesor": "Coronel Emilia (P)" }
    ],
    "VIERNES": [
        { "materia": "HTR", "profesor": "Etcheverry (S)" },
        { "materia": "MTM", "profesor": "Coronel Emilia (P)" },
        { "materia": "EFC", "profesor": "Alvarez Fernando (S)" }
    ]
},
"4° 1°": {
    "LUNES": [
        { "materia": "SYA", "profesor": "Miranda Ag (TI)" },
        { "materia": "LIT", "profesor": "Cardillo (S)" },
        { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
    ],
    "MARTES": [
        { "materia": "NTI", "profesor": "Crivaro (T)" },
        { "materia": "IAF", "profesor": "Torrez Janco (P)" },
        { "materia": "GGF", "profesor": "Ferreyra Maria" } 
    ],
    "MIERCOLES": [
        { "materia": "HTR", "profesor": "Esquiros (S)" },
        { "materia": "PLG", "profesor": "Cardillo (S)" },
        { "materia": "BLG", "profesor": "Karlen Lucia (T)" }, 
        { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
    ],
    "JUEVES": [
        { "materia": "PSI", "profesor": "Cateriano Claudia (T)" },
        { "materia": "MCS", "profesor": "Motta Jorge (S)" },
        { "materia": "MCS", "profesor": "Motta Jorge (S)" }
    ],
    "VIERNES": [
        { "materia": "GGF", "profesor": "Ferreyra Maria (P)" },
        { "materia": "HTR", "profesor": "Esquiroz (P)" },
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
        { "materia": "IGS", "profesor": "Sanchez Carolina (P)" }, 
        { "materia": "PYC", "profesor": "Armendano Benicio (T)" },
        { "materia": "EFC", "profesor": "Alvarez Fernando (T)" }
    ],
    "JUEVES": [
        { "materia": "IAQ", "profesor": "Pasalacua (TI)" }, 
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
        { "materia": "HTR", "profesor": "Vaio Jorge" }, 
        { "materia": "FIA", "profesor": "SEQUI Emilio" },
        { "materia": "EFC", "profesor": "DUMONTET Gaston" }
    ],
    "MARTES": [
        { "materia": "LIT", "profesor": "CARDILLO Paula" },
        { "materia": "RTE", "profesor": "DELLAGIOVANNA Paola" }
    ],
    "MIERCOLES": [
        { "materia": "TYC", "profesor": "Vaio Jorge" },
        { "materia": "MCS", "profesor": "Motta Jorge" },
        { "materia": "GGF", "profesor": "Ferreyra Maria" }
    ],
    "JUEVES": [
        { "materia": "IGS", "profesor": "Rivas Marcela (TI)" },
        { "materia": "PIC", "profesor": "MORAU Nestor" }
    ],
    "VIERNES": [
        { "materia": "PIC", "profesor": "MORAU Nestor" },
        { "materia": "MCS", "profesor": "Motta Jorge" }
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
        { "materia": "", "profesor": "Torrez Janco (P)" } 
    ]
},
"1° 3°": {
    "LUNES": [
        { "materia": "CSC", "profesor": "Vaio Jorge (T)" },
        { "materia": "CNT", "profesor": "Da Silva Segovia (TI)" },
        { "materia": "CCD", "profesor": "Pacheco (T)" }
    ],
    "MARTES": [
        { "materia": "AMC", "profesor": "Silva Florencia (T)" },
        { "materia": "CSC", "profesor": "Vaio Jorge (T)" }
    ],
    "MIERCOLES": [
        { "materia": "CNT", "profesor": "Da Silva Segovia (TI)" },
        { "materia": "IGS", "profesor": "Rivero Griselda (T)" }
    ],
    "JUEVES": [
        { "materia": "MTM", "profesor": "LOPEZ Karina " },
        { "materia": "PLG", "profesor": "Roldan Camila (TI)/BONETTI" },
        { "materia": "EFC", "profesor": "Zulberti Jorge (T)" }
    ],
    "VIERNES": [
        { "materia": "MTM", "profesor": "LOPEZ karina " },
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
        { "materia": "GGF", "profesor": "Ferreyra Maria (P)" }, 
        { "materia": "MTM", "profesor": "Caracoche Eliana (P)" }
    ],
    "MIERCOLES": [
        { "materia": "FQA", "profesor": "Iacobucci (T)" },
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
        { "materia": "AMC", "profesor": "Coccaro Luciano (T)" },
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
        { "materia": "FQA", "profesor": "Iacobucci (T)" }
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
        { "materia": "CCD", "profesor": "Pacheco (T)" }
    ],
    "MARTES": [
        { "materia": "GGF", "profesor": "Suarez Ojeda Agustina (T)" },
        { "materia": "BLG", "profesor": "Degue Viviana (P)" }
    ],
    "MIERCOLES": [
        { "materia": "FQA", "profesor": "Solle G (T)/Pariachi (S)" },
        { "materia": "IGS", "profesor": "Etchegaray Maria (P)/Sanchez Carolina" }, 
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
        { "materia": "IGS", "profesor": "Etchegaray Maria (P)/Sanchez Carolina" }
    ],
    "MIERCOLES": [
        { "materia": "PSI", "profesor": "Fajre M E (T)" },
        { "materia": "LIT", "profesor": "BARBOSA INDIANA(S)" },
        { "materia": "EFC", "profesor": "Miguel Pablo (T)" }
    ],
    "JUEVES": [
        { "materia": "IAF", "profesor": "Iacobucci (T)" },
        { "materia": "GGF", "profesor": "Almada Catalina (TI)" }
    ],
    "VIERNES": [
        { "materia": "NTI", "profesor": "Molina M (T)" },
        { "materia": "MTM", "profesor": "Tiziano M (TI)" }
    ]
},
"5° 1°": {
    "LUNES": [
        { "materia": "CCD", "profesor": "Pacheco (T)" },
        { "materia": "SOC", "profesor": "Orsi Pablo" }
    ],
    "MARTES": [
        { "materia": "EPO", "profesor": "Bianco Walter (T)" },
        { "materia": "IGS", "profesor": "Etchegaray Maria (P)" } 
    ],
    "MIERCOLES": [
        { "materia": "MCS", "profesor": "Gomez Natalia (T)/Sommariva (S)" },
        { "materia": "HTR", "profesor": "Cotovich Leonardo (TI)" },
        { "materia": "EFC", "profesor": "Zulberti Jorge (T)" }
    ],
    "JUEVES": [
        { "materia": "LIT", "profesor": "BARBOSA INDIANA (S)" },
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
        { "materia": "IGS", "profesor": "Rivas Marcela (TI)" },
        { "materia": "HTR", "profesor": "Baldi N (T)/Cardenas (S)" },
        { "materia": "MCM", "profesor": "Gomez Natalia (T)/Motta Jorge (S)" }
    ],
    "MIERCOLES": [
        { "materia": "TYC", "profesor": "Payares Gaston (T)" },
        { "materia": "HTR", "profesor": "Baldi N (T)/Cardenas (S)" },
        { "materia": "MCS", "profesor": "Gomez Natalia (T)/Motta Jorge (S)" }
    ],
    "JUEVES": [
        { "materia": "GGF", "profesor": "Perez Norma (P)" },
        { "materia": "LIT", "profesor": "BARBOSA INDIANA (S)" }
    ],
    "VIERNES": [
        { "materia": "PIC", "profesor": "Villar Lidia (T)" },
        { "materia": "EFC", "profesor": "Alvares Andrea (T)/Alvarez Fer (S)" },
        { "materia": "MCS", "profesor": "Gomez Natalia (T)/Motta Jorge (S)" }
    ]
}

    };
    // Suplentes por materia (opcional, si no tienes, déjalo vacío)
    const suplentesPorMateria = {
        // ... objetos suplentes si los tienes ...
    };
    
    // Lista de cursos disponibles
    const cursosDisponibles = Object.keys(horarioPorCurso);
    
    // Seleccionar todos los cursos por defecto
    let cursosSeleccionados = [...cursosDisponibles]; 
    
    // Almacenar faltas
    let faltas = {};
    if (localStorage.getItem('faltas')) {
        faltas = JSON.parse(localStorage.getItem('faltas'));
    }

    // Exponer variables globalmente si es necesario
    window.horarioPorCurso = horarioPorCurso;
    window.faltas = faltas;
    window.cursosSeleccionados = cursosSeleccionados;

    // --------------------- Reemplazo de Profesores ---------------------
    const selectCursoReemplazo = document.getElementById('selectCursoReemplazo');
    const selectDiaReemplazo = document.getElementById('selectDiaReemplazo');
    const selectMateriaReemplazo = document.getElementById('selectMateriaReemplazo');
    const profesorActualReemplazo = document.getElementById('profesorActualReemplazo');
    const profesorNuevoReemplazo = document.getElementById('profesorNuevoReemplazo');
    const btnAplicarReemplazo = document.getElementById('btnAplicarReemplazo');

    // Poblar el selector de cursos para reemplazo
    function poblarSelectorCursoReemplazoFunc() {
        selectCursoReemplazo.innerHTML = '<option value="" disabled selected>Selecciona un curso</option>';
        cursosDisponibles.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso.toUpperCase();
            selectCursoReemplazo.appendChild(option);
        });
    }

    // Al cambiar de curso, habilitar el selector de día
    selectCursoReemplazo.addEventListener('change', () => {
        const cursoSeleccionado = selectCursoReemplazo.value;
        poblarSelectorDiaReemplazoFunc(cursoSeleccionado);
    });

    // Poblar el selector de día en base al curso
    function poblarSelectorDiaReemplazoFunc(curso) {
        selectDiaReemplazo.innerHTML = '<option value="" disabled selected>Selecciona un día</option>';
        selectDiaReemplazo.disabled = false;

        // Días fijos
        const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
        const horarioCurso = horarioPorCurso[curso];

        dias.forEach(dia => {
            if (horarioCurso[dia] && horarioCurso[dia].length > 0) {
                const option = document.createElement('option');
                option.value = dia;
                option.textContent = dia;
                selectDiaReemplazo.appendChild(option);
            }
        });
    }

    // Al cambiar de día, habilitar el selector de materia
    selectDiaReemplazo.addEventListener('change', () => {
        const cursoSeleccionado = selectCursoReemplazo.value;
        const diaSeleccionado = selectDiaReemplazo.value;
        poblarSelectorMateriaReemplazoFunc(cursoSeleccionado, diaSeleccionado);
    });

    // Poblar el selector de materia en base al curso y día
    function poblarSelectorMateriaReemplazoFunc(curso, dia) {
        selectMateriaReemplazo.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';
        selectMateriaReemplazo.disabled = false;

        const materias = horarioPorCurso[curso][dia] || [];
        materias.forEach(materiaObj => {
            const option = document.createElement('option');
            option.value = materiaObj.materia; 
            option.textContent = materiaObj.materia;
            selectMateriaReemplazo.appendChild(option);
        });
    }

    // Al cambiar de materia, mostrar el profesor actual
    selectMateriaReemplazo.addEventListener('change', () => {
        const cursoSeleccionado = selectCursoReemplazo.value;
        const diaSeleccionado = selectDiaReemplazo.value;
        const materiaSeleccionada = selectMateriaReemplazo.value;

        const materias = horarioPorCurso[cursoSeleccionado][diaSeleccionado];
        const materiaEncontrada = materias.find(m => m.materia === materiaSeleccionada);
        if (materiaEncontrada) {
            profesorActualReemplazo.value = materiaEncontrada.profesor;
        }
    });

    // Función para aplicar el reemplazo
    btnAplicarReemplazo.addEventListener('click', () => {
        const curso = selectCursoReemplazo.value;
        const dia = selectDiaReemplazo.value;
        const materia = selectMateriaReemplazo.value;
        const profesorViejo = profesorActualReemplazo.value;
        const profesorNuevo = profesorNuevoReemplazo.value.trim();

        if (!curso || !dia || !materia || !profesorViejo || !profesorNuevo) {
            alert('Por favor, selecciona todos los campos y escribe el nombre del nuevo profesor.');
            return;
        }

        // Llamamos a una función que reemplace el profesor en la estructura y transfiere faltas
        reemplazarProfesor(horarioPorCurso, curso, dia, materia, profesorViejo, profesorNuevo);
        displayPlanilla(); // Refrescar la vista

        alert(`Profesor reemplazado: "${profesorViejo}" por "${profesorNuevo}" en ${curso}, ${dia}, materia ${materia}.`);
        profesorNuevoReemplazo.value = ''; // Limpiar el campo
    });

    // Función para reemplazar el profesor en una materia específica y transferir faltas
    function reemplazarProfesor(horario, curso, dia, materia, profesorViejo, profesorNuevo) {
        const materias = horario[curso][dia];
        const materiaObj = materias.find(m => m.materia === materia);
        if (materiaObj && materiaObj.profesor === profesorViejo) {
            materiaObj.profesor = profesorNuevo;
        } else {
            alert('El profesor antiguo no coincide con el profesor asignado a la materia.');
            return;
        }

        // Transferir faltas del profesor viejo al nuevo
        if (faltas[profesorViejo]) {
            if (!faltas[profesorNuevo]) {
                faltas[profesorNuevo] = {};
            }
            // Transferir todas las faltas
            for (const mes in faltas[profesorViejo]) {
                if (!faltas[profesorNuevo][mes]) {
                    faltas[profesorNuevo][mes] = {};
                }
                for (const diaFalta in faltas[profesorViejo][mes]) {
                    if (!faltas[profesorNuevo][mes][diaFalta]) {
                        faltas[profesorNuevo][mes][diaFalta] = {};
                    }
                    for (const motivo in faltas[profesorViejo][mes][diaFalta]) {
                        if (!faltas[profesorNuevo][mes][diaFalta][motivo]) {
                            faltas[profesorNuevo][mes][diaFalta][motivo] = {};
                        }
                        for (const cursoFalta in faltas[profesorViejo][mes][diaFalta][motivo]) {
                            if (!faltas[profesorNuevo][mes][diaFalta][motivo][cursoFalta]) {
                                faltas[profesorNuevo][mes][diaFalta][motivo][cursoFalta] = 0;
                            }
                            faltas[profesorNuevo][mes][diaFalta][motivo][cursoFalta] += faltas[profesorViejo][mes][diaFalta][motivo][cursoFalta];
                        }
                    }
                }
            }
            // Eliminar faltas del profesor viejo
            delete faltas[profesorViejo];
            guardarFaltas();
        }
    }

    // --------------------- Funciones Generales ---------------------
    // Función para obtener el mes seleccionado
    function obtenerMesSeleccionado() {
        const selectorMes = document.getElementById('selectorMes');
        return selectorMes ? selectorMes.value : `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    }

    // Mostrar selección de cursos
    function displayCursoSelection() {
        cursoContainer.innerHTML = '';
        const label = document.createElement('label');
        label.textContent = 'Selecciona los cursos:';
        label.classList.add('form-label', 'fw-bold');
    
        const select = document.createElement('select');
        select.classList.add('form-select');
        select.multiple = true; 
        select.size = Math.min(cursosDisponibles.length + 1, 6);
    
        if (cursosDisponibles.length === 0) {
            select.innerHTML = '<option value="">No hay cursos disponibles</option>';
            select.disabled = true;
        } else {
            select.innerHTML = `<option value="all" ${cursosSeleccionados.length === cursosDisponibles.length ? 'selected' : ''}>Todos los Cursos</option>` +
                cursosDisponibles.map(curso => `<option value="${curso}" ${cursosSeleccionados.includes(curso) ? 'selected' : ''}>${curso.toUpperCase()}</option>`).join('');
            select.disabled = false;
        }
    
        cursoContainer.appendChild(label);
        cursoContainer.appendChild(select);
    
        select.addEventListener('change', () => {
            const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
            if (selectedOptions.includes('all')) {
                cursosSeleccionados = [...cursosDisponibles];
                Array.from(select.options).forEach(option => {
                    if (option.value !== 'all') {
                        option.selected = false;
                    }
                });
            } else {
                cursosSeleccionados = selectedOptions;
                const allOption = select.querySelector('option[value="all"]');
                if (allOption) allOption.selected = false;
            }
            displayPlanilla();
            mostrarResumenAusenciasGeneral();
        });
    
        if (cursosDisponibles.length > 0) {
            select.value = 'all';
            select.dispatchEvent(new Event('change'));
        }
    }
    
    // Mostrar planilla
    function displayPlanilla() {
        planillaContainer.innerHTML = '';

        cursosSeleccionados.forEach(curso => {
            const planilla = document.createElement('div');
            planilla.classList.add('planilla', 'curso-recuadro');

            const titulo = document.createElement('h4');
            titulo.textContent = `Planilla de Asistencia - ${curso.toUpperCase()}`;
            titulo.classList.add('mb-3');
            planilla.appendChild(titulo);

            const tabla = document.createElement('table');
            tabla.classList.add('table', 'table-bordered', 'table-planilla');

            const thead = document.createElement('thead');
            thead.classList.add('table-dark');
            const encabezadoFila = document.createElement('tr');

            const columnas = ['Día', 'Materia', 'Profesor'];
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
            const mesActual = obtenerMesSeleccionado();
            
            dias.forEach(dia => {
                const materias = horarioPorCurso[curso][dia] || [];

                materias.forEach((materiaObj) => {
                    const fila = document.createElement('tr');

                    const celdaDia = document.createElement('td');
                    celdaDia.textContent = dia;
                    celdaDia.classList.add('celda-dia');
                    fila.appendChild(celdaDia);

                    const celdaMateria = document.createElement('td');
                    celdaMateria.textContent = materiaObj.materia;
                    celdaMateria.classList.add('celda-materia');
                    fila.appendChild(celdaMateria);

                    const celdaProfesor = document.createElement('td');
                    celdaProfesor.textContent = materiaObj.profesor;
                    celdaProfesor.classList.add('celda-profesor');
                    fila.appendChild(celdaProfesor);

                    // Click en profesor para registrar falta
                    celdaProfesor.style.cursor = 'pointer';
                    celdaProfesor.style.color = '#0d6efd';
                    celdaProfesor.addEventListener('click', () => {
                        const nombreProfesor = materiaObj.profesor.split(' (')[0].trim();
                        profesorSeleccionado.value = nombreProfesor;
                        diaSeleccionado.value = dia;
                        motivoSeleccionado.value = '';
                        cantidadSeleccionada.value = '1';
                        cursoSeleccionadoModal.value = curso; // Asignar el curso al input hidden
                        motivoFaltaModal.show();
                    });

                    // Marcar fila si hay faltas
                    if (faltas[materiaObj.profesor] && faltas[materiaObj.profesor][mesActual] && faltas[materiaObj.profesor][mesActual][dia]) {
                        for (const motivo in faltas[materiaObj.profesor][mesActual][dia]) {
                            for (const cursoF in faltas[materiaObj.profesor][mesActual][dia][motivo]) {
                                const cantidad = faltas[materiaObj.profesor][mesActual][dia][motivo][cursoF];
                                if (cantidad > 0 && cursoF === curso) {
                                    fila.classList.add('fila-ausente');
                                    break; // No es necesario seguir buscando
                                }
                            }
                        }
                    }

                    tbody.appendChild(fila);
                });
            });

            tabla.appendChild(tbody);
            planilla.appendChild(tabla);
            planillaContainer.appendChild(planilla);
        });

        mostrarResumenFaltasList();
        mostrarResumenAusenciasGeneral();
    }
    
    // Registrar ausencia
    function registrarAusencia(docente, mes, dia, motivo, cantidad, curso = null) {
        try {
            if (curso) {
                if (!faltas[docente]) faltas[docente] = {};
                if (!faltas[docente][mes]) faltas[docente][mes] = {};
                if (!faltas[docente][mes][dia]) faltas[docente][mes][dia] = {};
                if (!faltas[docente][mes][dia][motivo]) faltas[docente][mes][dia][motivo] = {};
                if (!faltas[docente][mes][dia][motivo][curso]) faltas[docente][mes][dia][motivo][curso] = 0;
                faltas[docente][mes][dia][motivo][curso] += cantidad;
            } else {
                // Para todos los cursos seleccionados
                cursosSeleccionados.forEach(c => {
                    if (!faltas[docente]) faltas[docente] = {};
                    if (!faltas[docente][mes]) faltas[docente][mes] = {};
                    if (!faltas[docente][mes][dia]) faltas[docente][mes][dia] = {};
                    if (!faltas[docente][mes][dia][motivo]) faltas[docente][mes][dia][motivo] = {};
                    if (!faltas[docente][mes][dia][motivo][c]) faltas[docente][mes][dia][motivo][c] = 0;
                    faltas[docente][mes][dia][motivo][c] += cantidad;
                });
            }

            guardarFaltas();
            mostrarResumenFaltasList();
            mostrarResumenAusenciasGeneral();
            displayPlanilla();
        } catch (error) {
            console.error('Error al registrar la ausencia:', error);
            alert('Ocurrió un error al registrar la ausencia. Por favor, intenta nuevamente.');
        }
    }

    // Eliminar ausencia
    function removeAusencia(docente, mes, dia, motivo, curso) {
        if (motivo && curso) {
            if (faltas[docente] && faltas[docente][mes] && faltas[docente][mes][dia] && faltas[docente][mes][dia][motivo] && faltas[docente][mes][dia][motivo][curso]) {
                faltas[docente][mes][dia][motivo][curso] -= 1;
                if (faltas[docente][mes][dia][motivo][curso] <= 0) {
                    delete faltas[docente][mes][dia][motivo][curso];
                }
                if (Object.keys(faltas[docente][mes][dia][motivo]).length === 0) {
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
                mostrarResumenAusenciasGeneral();
                displayPlanilla();
            }
        }
    }

    // Guardar faltas en localStorage
    function guardarFaltas() {
        localStorage.setItem('faltas', JSON.stringify(faltas));
    }

    // Mostrar resumen de faltas detalladas
    function mostrarResumenFaltasList() {
        const resumenFaltasContainer = document.getElementById('resumen-faltas-container');
        resumenFaltasContainer.innerHTML = '';

        const titulo = document.createElement('h4');
        titulo.textContent = 'Faltas Detalladas';
        titulo.classList.add('mb-3');
        resumenFaltasContainer.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.classList.add('list-group');

        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    for (const motivo in faltas[docente][mes][dia]) {
                        for (const curso in faltas[docente][mes][dia][motivo]) {
                            const cantidad = faltas[docente][mes][dia][motivo][curso];
                            const item = document.createElement('li');
                            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                            item.textContent = `${docente} - Curso: ${curso} - ${mes}-${dia} - ${motivo}`;

                            const badge = document.createElement('span');
                            badge.classList.add('badge', 'bg-danger', 'rounded-pill');
                            badge.textContent = cantidad;

                            const eliminarIcono = document.createElement('i');
                            eliminarIcono.classList.add('fas', 'fa-trash-alt', 'remove-falta');
                            eliminarIcono.title = 'Eliminar Falta';
                            eliminarIcono.style.cursor = 'pointer';
                            eliminarIcono.style.marginLeft = '10px';
                            eliminarIcono.addEventListener('click', () => {
                                removeAusencia(docente, mes, dia, motivo, curso);
                            });

                            const container = document.createElement('div');
                            container.appendChild(badge);
                            container.appendChild(eliminarIcono);
                            item.appendChild(container);
                            lista.appendChild(item);
                        }
                    }
                }
            }
        }

        resumenFaltasContainer.appendChild(lista);
    }

    // Mostrar resumen general de ausencias por docente
    function mostrarResumenAusenciasGeneral() {
        const resumenGeneralPrevio = document.getElementById('resumen-ausencias-general');
        if (resumenGeneralPrevio) resumenGeneralPrevio.remove();

        const resumenGeneralContainer = document.createElement('div');
        resumenGeneralContainer.id = 'resumen-ausencias-general';
        resumenGeneralContainer.classList.add('mt-4');

        const titulo = document.createElement('h4');
        titulo.textContent = 'Resumen General de Ausencias por Docente';
        resumenGeneralContainer.appendChild(titulo);

        const lista = document.createElement('ul');
        lista.classList.add('list-group');

        const profesoresUnicos = obtenerListaProfesores();
        profesoresUnicos.forEach(profesor => {
            let totalFaltas = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            for (const cursoFaltas in faltas[profesor][mes][dia][motivo]) {
                                totalFaltas += faltas[profesor][mes][dia][motivo][cursoFaltas];
                            }
                        }
                    }
                }
            }

            const item = document.createElement('li');
            item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            item.textContent = profesor;

            const badge = document.createElement('span');
            badge.classList.add('badge', 'bg-danger', 'rounded-pill');
            badge.textContent = totalFaltas;

            item.appendChild(badge);
            lista.appendChild(item);
        });

        resumenGeneralContainer.appendChild(lista);
        planillaContainer.appendChild(resumenGeneralContainer);
    }

    // --------------------- Exportaciones ---------------------
    // Exportar a PDF
    function exportToPDF() {
        if (cursosSeleccionados.length === 0) {
            alert('No hay cursos seleccionados para exportar.');
            return;
        }

        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            alert('La librería jsPDF no está cargada correctamente.');
            return;
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        let yOffset = 10;

        cursosSeleccionados.forEach(curso => {
            pdf.setFontSize(16);
            pdf.text(`Planilla de Asistencia - ${curso.toUpperCase()}`, 10, yOffset);
            yOffset += 10;

            const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
            dias.forEach(dia => {
                const materias = horarioPorCurso[curso][dia] || [];
                materias.forEach(materiaObj => {
                    pdf.setFontSize(12);
                    pdf.text(`Día: ${dia}`, 10, yOffset);
                    pdf.text(`Materia: ${materiaObj.materia}`, 60, yOffset);
                    pdf.text(`Profesor: ${materiaObj.profesor}`, 120, yOffset);
                    yOffset += 7;
                    if (yOffset > 270) {
                        pdf.addPage();
                        yOffset = 10;
                    }
                });
            });

            yOffset += 10;
            if (yOffset > 270) {
                pdf.addPage();
                yOffset = 10;
            }
        });

        // Resumen General
        pdf.setFontSize(16);
        pdf.text('Resumen General de Ausencias por Docente', 10, yOffset);
        yOffset += 10;

        const profesoresUnicos = obtenerListaProfesores();
        profesoresUnicos.forEach(profesor => {
            let totalFaltas = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            for (const cursoFaltas in faltas[profesor][mes][dia][motivo]) {
                                totalFaltas += faltas[profesor][mes][dia][motivo][cursoFaltas];
                            }
                        }
                    }
                }
            }
            pdf.setFontSize(12);
            pdf.text(`${profesor}: ${totalFaltas} faltas`, 10, yOffset);
            yOffset += 7;
            if (yOffset > 270) {
                pdf.addPage();
                yOffset = 10;
            }
        });

        pdf.save(`planilla_completa_${obtenerMesSeleccionado()}.pdf`);
    }

    // Exportar a Excel
    function exportarExcel() {
        if (cursosSeleccionados.length === 0) {
            alert('No hay cursos seleccionados para exportar.');
            return;
        }

        const wb = XLSX.utils.book_new();
        const dataTodosCursos = [];
        const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];

        cursosSeleccionados.forEach(curso => {
            dataTodosCursos.push({ "Curso": curso });
            dias.forEach(dia => {
                const materias = horarioPorCurso[curso][dia] || [];
                materias.forEach(materiaObj => {
                    dataTodosCursos.push({
                        "Día": dia,
                        "Materia": materiaObj.materia,
                        "Profesor": materiaObj.profesor
                    });
                });
            });
            dataTodosCursos.push({});
        });

        const wsTodosCursos = XLSX.utils.json_to_sheet(dataTodosCursos, { skipHeader: true });
        XLSX.utils.book_append_sheet(wb, wsTodosCursos, 'Planilla Todos los Cursos');

        const faltasData = [];
        for (const docente in faltas) {
            for (const mes in faltas[docente]) {
                for (const dia in faltas[docente][mes]) {
                    for (const motivo in faltas[docente][mes][dia]) {
                        for (const curso in faltas[docente][mes][dia][motivo]) {
                            const cantidad = faltas[docente][mes][dia][motivo][curso];
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

        const contadorTotalData = [];
        const profesoresUnicos = obtenerListaProfesores();
        profesoresUnicos.forEach(profesor => {
            let totalFaltas = 0;
            if (faltas[profesor]) {
                for (const mes in faltas[profesor]) {
                    for (const dia in faltas[profesor][mes]) {
                        for (const motivo in faltas[profesor][mes][dia]) {
                            for (const cursoFaltas in faltas[profesor][mes][dia][motivo]) {
                                totalFaltas += faltas[profesor][mes][dia][motivo][cursoFaltas];
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

        const metadatosData = [{ "Mes Seleccionado": obtenerMesSeleccionado() }];
        const wsMetadatos = XLSX.utils.json_to_sheet(metadatosData);
        XLSX.utils.book_append_sheet(wb, wsMetadatos, 'Metadatos');

        XLSX.writeFile(wb, `planilla_excel_${obtenerMesSeleccionado()}.xlsx`);
    }

    // Exportar Total (igual que exportarExcel)
    function exportarTotal() {
        exportarExcel();
    }

    // --------------------- Funciones Auxiliares ---------------------
    // Obtener lista de profesores únicos
    function obtenerListaProfesores() {
        return Array.from(new Set(Object.values(horarioPorCurso).flatMap(curso => 
            Object.values(curso).flatMap(materias => 
                materias.map(materiaObj => materiaObj.profesor.split(' (')[0].trim())
            )
        ))).sort();
    }

    // Limpiar datos de localStorage
    limpiarLocalStorageButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas limpiar todos los datos de faltas?')) {
            localStorage.removeItem('faltas');
            faltas = {};
            displayPlanilla();
            mostrarResumenAusenciasGeneral();
            mostrarResumenFaltasList();
        }
    });

    // Eventos de exportación
    exportarCompletaButton.addEventListener('click', exportToPDF);
    exportarExcelButton.addEventListener('click', exportarExcel);
    exportarTotalButton.addEventListener('click', exportarTotal);

    // --------------------- Inicialización ---------------------
    poblarSelectorCursoReemplazoFunc();
    displayCursoSelection();
    displayPlanilla();
    mostrarResumenFaltasList();
    mostrarResumenAusenciasGeneral();

    // --------------------- Manejo del Formulario de Registrar Faltas ---------------------
    formMotivoFalta.addEventListener('submit', (e) => {
        e.preventDefault();
        const docente = profesorSeleccionado.value;
        const dia = diaSeleccionado.value;
        const mes = obtenerMesSeleccionado();
        const motivo = motivoSeleccionado.value.trim();
        const cantidad = parseInt(cantidadSeleccionada.value, 10);
        const curso = cursoSeleccionadoModal.value; // Input hidden para el curso

        if (!docente || !dia || !mes || !motivo || isNaN(cantidad) || cantidad <= 0 || !curso) {
            alert('Completa todos los campos antes de registrar la falta.');
            return;
        }

        // Registrar la ausencia sólo para el curso específico
        registrarAusencia(docente, mes, dia, motivo, cantidad, curso);
        motivoFaltaModal.hide();
    });

    // --------------------- Manejo del Formulario para Agregar Faltas desde Otro Modal ---------------------
    const formAgregarFalta = document.getElementById('form-agregar-falta');
    
    // Crear selector de curso en el modal Agregar Falta
    const selectorCursoFalta = document.createElement('select');
    selectorCursoFalta.id = 'selectorCursoFalta';
    selectorCursoFalta.classList.add('form-select', 'mb-3');
    selectorCursoFalta.required = true;

    const labelCurso = document.createElement('label');
    labelCurso.setAttribute('for', 'selectorCursoFalta');
    labelCurso.classList.add('form-label');
    labelCurso.textContent = 'Curso';
    formAgregarFalta.insertBefore(labelCurso, formAgregarFalta.children[0]);
    formAgregarFalta.insertBefore(selectorCursoFalta, formAgregarFalta.children[1]);

    const checkboxProfesorFalta = document.createElement('div');
    checkboxProfesorFalta.id = 'checkboxProfesorFalta';
    checkboxProfesorFalta.classList.add('row', 'mb-3');
    formAgregarFalta.insertBefore(checkboxProfesorFalta, formAgregarFalta.children[3]);

    const selectorMateriaFalta = document.getElementById('selectorMateriaFalta');
    const selectorDiaFalta = document.getElementById('selectorDiaFalta');
    const selectorMesFalta = document.getElementById('selectorMesFalta');
    const selectorTipoFalta = document.getElementById('selectorTipoFalta');

    // Poblar el selector de cursos para Agregar Falta
    function poblarSelectorCursosFunc() {
        selectorCursoFalta.innerHTML = '<option value="" disabled selected>Selecciona un curso</option>';
        cursosDisponibles.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso.toUpperCase();
            selectorCursoFalta.appendChild(option);
        });
    }

    // Al cambiar de curso, habilitar el selector de día y poblar checkbox de profesores
    selectorCursoFalta.addEventListener('change', (e) => {
        const cursoSeleccionado = e.target.value;
        poblarCheckboxProfesoresFunc(cursoSeleccionado);
        selectorMateriaFalta.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';
        selectorMateriaFalta.disabled = true;
    });

    // Poblar checkbox de profesores basado en el curso seleccionado
    function poblarCheckboxProfesoresFunc(curso) {
        checkboxProfesorFalta.innerHTML = '';
        if (!horarioPorCurso[curso]) {
            console.error(`El curso "${curso}" no existe.`);
            return;
        }

        const profesoresSet = new Set();
        Object.values(horarioPorCurso[curso]).forEach(materiasCurso => {
            materiasCurso.forEach(materiaObj => {
                const nombreProfesor = materiaObj.profesor.split(' (')[0].trim();
                profesoresSet.add(nombreProfesor);
            });
        });

        const profesores = Array.from(profesoresSet).sort();

        profesores.forEach(profesor => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4');

            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('form-check');

            const checkbox = document.createElement('input');
            checkbox.classList.add('form-check-input');
            checkbox.type = 'checkbox';
            checkbox.value = profesor;
            checkbox.id = `profesor-${profesor}`;

            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.htmlFor = `profesor-${profesor}`;
            label.textContent = profesor;

            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);
            colDiv.appendChild(checkboxDiv);
            checkboxProfesorFalta.appendChild(colDiv);
        });
    }

    // Obtener profesores seleccionados
    function obtenerProfesoresSeleccionadosFunc() {
        const checkboxes = checkboxProfesorFalta.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    // Al cambiar checkbox de profesores, poblar selector de materias
    checkboxProfesorFalta.addEventListener('change', () => {
        const curso = selectorCursoFalta.value;
        const profesoresSeleccionados = obtenerProfesoresSeleccionadosFunc();
        poblarSelectorMateriasAgregarFaltaFunc(curso, profesoresSeleccionados);
    });

    // Poblar selector de materias basado en los profesores seleccionados
    function poblarSelectorMateriasAgregarFaltaFunc(curso, profesoresSeleccionados) {
        selectorMateriaFalta.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';
        selectorMateriaFalta.disabled = false;

        const materias = horarioPorCurso[curso][dia] || [];
        const dia = selectorDiaFalta.value;

        const materiasFiltradas = horarioPorCurso[curso][dia].filter(materiaObj => {
            const nombreProfesor = materiaObj.profesor.split(' (')[0].trim();
            return profesoresSeleccionados.includes(nombreProfesor);
        });

        materiasFiltradas.forEach(materiaObj => {
            const option = document.createElement('option');
            option.value = materiaObj.materia; 
            option.textContent = materiaObj.materia;
            selectorMateriaFalta.appendChild(option);
        });

        if (materiasFiltradas.length === 0) {
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "No hay materias para los profesores seleccionados";
            selectorMateriaFalta.appendChild(option);
            selectorMateriaFalta.disabled = true;
        }
    }

    // Manejo del formulario para Agregar Falta desde otro modal
    formAgregarFalta.addEventListener('submit', (e) => {
        e.preventDefault();
        const curso = selectorCursoFalta.value;
        const profesoresSeleccionados = obtenerProfesoresSeleccionadosFunc();
        const materia = selectorMateriaFalta.value;
        const dia = selectorDiaFalta.value;
        const mes = selectorMesFalta.value;
        const tipo = selectorTipoFalta.value;

        if (!curso || profesoresSeleccionados.length === 0 || !materia || !dia || !mes || !tipo) {
            alert('Por favor, completa todos los campos y selecciona al menos un profesor.');
            return;
        }

        // Registrar la falta en el curso seleccionado
        profesoresSeleccionados.forEach(profesor => {
            registrarAusencia(profesor, mes, dia, tipo, 1, curso);
        });

        const agregarFaltaModal = bootstrap.Modal.getInstance(document.getElementById('agregarFaltaModal'));
        if (agregarFaltaModal) {
            agregarFaltaModal.hide();
        }

        formAgregarFalta.reset();
        checkboxProfesorFalta.innerHTML = '';
        selectorMateriaFalta.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';
        selectorMateriaFalta.disabled = true;
    });
});

