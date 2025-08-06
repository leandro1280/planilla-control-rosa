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
    const numeroDiaSeleccionado = document.getElementById('numeroDiaSeleccionado'); // Nuevo campo
    const cursoSeleccionadoModal = document.getElementById('cursoSeleccionadoModal'); // Input hidden para el curso

    // Definir el horario
    const horarioPorCurso = {
        // 1° grado
        "1° 1°": {
          LUNES: [
            { materia: "CNT", profesor: "Pasalacua (T)" },
            { materia: "PLG", profesor: "Barbosa (T)" },
            { materia: "EF",  profesor: "Miguel Pablo (S)" },
            { materia: "CCD", profesor: "Daglio (T)" }
          ],
          MARTES: [
            { materia: "CSC", profesor: "Alvarez Daniel (T)" },
            { materia: "MTM", profesor: "Crivaro (T)" }
          ],
          MIERCOLES: [
            { materia: "CNT", profesor: "Pasalacua (T)" },
            { materia: "MTM", profesor: "Crivaro (T)" },
            { materia: "EFC", profesor: "Miguel Pablo (S)" }
          ],
          JUEVES: [
            { materia: "IGS", profesor: "Cernada (P)" },
            { materia: "PLG", profesor: "Barbosa (T)" }
          ],
          VIERNES: [
            { materia: "AMC", profesor: "Lirussi (S)" },
            { materia: "CSC", profesor: "Alvarez Daniel (T)" }
          ]
        },
      
        "1° 2°": {
          LUNES: [
            { materia: "PLG", profesor: "Barbosa (S)" },
            { materia: "CNT", profesor: "Leon Jimena (P)" },
            { materia: "EFC", profesor: "Alvarez Fernando (T)" }
          ],
          MARTES: [
            { materia: "CSC", profesor: "Peña M Jose (T)" },
            { materia: "PLG", profesor: "Barbosa (P)" }
          ],
          MIERCOLES: [
            { materia: "AMC", profesor: "Garcia Lila (T)" },
            { materia: "IGS", profesor: "Rivero Griselda (T)" }
          ],
          JUEVES: [
            { materia: "CNT", profesor: "Leon Jimena (P)" },
            { materia: "MTM", profesor: "Lopez Karina (TI)" },
            { materia: "CCD", profesor: "Olivera Patricia (T)" }
          ],
          VIERNES: [
            { materia: "CSC", profesor: "Peña M Jose (T)" },
            { materia: "",    profesor: "Torrez Janco (P)" }
          ]
        },
      
        "1° 3°": {
          LUNES: [
            { materia: "CSC", profesor: "Vaio Jorge (T)" },
            { materia: "CNT", profesor: "Da Silva Segovia (TI)" },
            { materia: "CCD", profesor: "Pacheco (T)" }
          ],
          MARTES: [
            { materia: "AMC", profesor: "Silva Florencia (T)" },
            { materia: "CSC", profesor: "Vaio Jorge (T)" }
          ],
          MIERCOLES: [
            { materia: "CNT", profesor: "Da Silva Segovia (TI)" },
            { materia: "IGS", profesor: "Rivero Griselda (T)" }
          ],
          JUEVES: [
            { materia: "MTM", profesor: "Lopez Karina (T)" },
            { materia: "PLG", profesor: "Roldan Camila (TI)/Bonetti" },
            { materia: "EFC", profesor: "Zulberti Jorge (T)" }
          ],
          VIERNES: [
            { materia: "MTM", profesor: "Lopez Karina (T)" },
            { materia: "PLG", profesor: "Roldan Camila (TI)/Bonetti" }
          ]
        },
      
        // 2° grado
        "2° 1°": {
          LUNES: [
            { materia: "PLG", profesor: "Ramirez Lurdes (S)" },
            { materia: "FQA", profesor: "Iacobucci (T)" },
            { materia: "CCD", profesor: "Daglio (T)" }
          ],
          MARTES: [
            { materia: "HTR", profesor: "Lucero Gianetti (T)" },
            { materia: "AMC", profesor: "Artola (T)" },
            { materia: "EFC", profesor: "Alvarez Fernando (T)" }
          ],
          MIERCOLES: [
            { materia: "BLG", profesor: "Gerhardt (T)" },
            { materia: "IGS", profesor: "Rivero Griselda (T)" }
          ],
          JUEVES: [
            { materia: "MTM", profesor: "Motta Jorge (P)" },
            { materia: "PLG", profesor: "Cardillo (S)" }
          ],
          VIERNES: [
            { materia: "MTM", profesor: "Motta Jorge (P)" },
            { materia: "GGF", profesor: "Almada Catalina (TI)" }
          ]
        },
      
        "2° 2°": {
          LUNES: [
            { materia: "HTR", profesor: "Peña M Jose (P)" },
            { materia: "MTM", profesor: "Caracoche Eliana (P)" },
            { materia: "CCD", profesor: "Daglio (T)" },
            { materia: "EFC", profesor: "Cao (T)/Miguel Pablo (S)" }
          ],
          MARTES: [
            { materia: "GGF", profesor: "Ferreyra Maria (P)" },
            { materia: "MTM", profesor: "Caracoche Eliana (P)" }
          ],
          MIERCOLES: [
            { materia: "FQA", profesor: "Iacobucci (T)" },
            { materia: "IGS", profesor: "Yamuni M (P)" },
            { materia: "CCD", profesor: "Daglio (T)" },
            { materia: "EFC", profesor: "Cao (T)/Miguel Pablo (S)" }
          ],
          JUEVES: [
            { materia: "PLG", profesor: "Roldan Camila (T)/Casas" },
            { materia: "BLG", profesor: "Degue Viviana (T)" }
          ],
          VIERNES: [
            { materia: "PLG", profesor: "Roldan Camila (TI)" },
            { materia: "AMC", profesor: "Coccaro Luciano (T)" },
            { materia: "MTM", profesor: "Marquina Venero (P)" }
          ]
        },
      
        "2° 3°": {
          LUNES: [
            { materia: "PLG", profesor: "Barbosa (T)" },
            { materia: "HTR", profesor: "Poblete Daniela (T)" },
            { materia: "CCD", profesor: "Pacheco (T)" }
          ],
          MARTES: [
            { materia: "GGF", profesor: "Suarez Ojeda Agustina (T)" },
            { materia: "BLG", profesor: "Degue Viviana (P)" }
          ],
          MIERCOLES: [
            { materia: "FQA", profesor: "Solle G (T)/Pariachi (S)" },
            { materia: "IGS", profesor: "Etchegaray Maria (P)/Sanchez Carolina" },
            { materia: "EFC", profesor: "Zulberti Jorge (T)" }
          ],
          JUEVES: [
            { materia: "MTM", profesor: "Marquina Venero (P)" },
            { materia: "PGL", profesor: "Barbosa (T)" }
          ],
          VIERNES: [
            { materia: "AMC", profesor: "Tambour Carlo (T)" },
            { materia: "MTM", profesor: "Marquina Venero (P)" }
          ]
        },
      
        // 3° grado
        "3° 1°": {
          LUNES: [
            { materia: "FQA", profesor: "Iacobucci (T)" },
            { materia: "BLG", profesor: "Gerhardt (T)" },
            { materia: "CCD", profesor: "Capecce (P)" }
          ],
          MARTES: [
            { materia: "AMC", profesor: "Pulsen Victor (S)" },
            { materia: "GGF", profesor: "Echeverry (S)" },
            { materia: "EFC", profesor: "Alvarez Fernando (S)" }
          ],
          MIERCOLES: [
            { materia: "PLG", profesor: "Mendivil (T)/Cardillo (S)" },
            { materia: "IGS", profesor: "Sanchez Carolina (P)" },
            { materia: "CCD", profesor: "Capecce" }
          ],
          JUEVES: [
            { materia: "PLG", profesor: "Cardillo (S)" },
            { materia: "MTM", profesor: "Coronel Emilia (P)" }
          ],
          VIERNES: [
            { materia: "HTR", profesor: "Etcheverry (S)" },
            { materia: "MTM", profesor: "Coronel Emilia (P)" },
            { materia: "EFC", profesor: "Alvarez Fernando (S)" }
          ]
        },
      
        "3° 2°": {
          LUNES: [
            { materia: "MTM", profesor: "Pariachi W (P)" },
            { materia: "PGL", profesor: "Roldan Camila (TI)" },
            { materia: "EFC", profesor: "Cao (T)/Miguel Pablo (S)" }
          ],
          MARTES: [
            { materia: "PGL", profesor: "Roldan Camila (TI)" },
            { materia: "GGF", profesor: "Suarez Ojeda Agustina (T)" },
            { materia: "CCD", profesor: "Alvarez Fernando (T)" }
          ],
          MIERCOLES: [
            { materia: "MTM", profesor: "Pariachi W (P)" },
            { materia: "IGS", profesor: "Aceto Analia (P)" },
            { materia: "CCD", profesor: "Alvarez Fernando (T)" },
            { materia: "EFC", profesor: "Cao (T)/Miguel Pablo (S)" }
          ],
          JUEVES: [
            { materia: "BLG", profesor: "Valentini E. (T)" },
            { materia: "FQA", profesor: "Iacobucci (T)" }
          ],
          VIERNES: [
            { materia: "AMC", profesor: "Aberasturi Javier (T)" },
            { materia: "HTR", profesor: "Vaio Jorge (P)" }
          ]
        },
        "3° 3°": {
  LUNES: [
    { materia: "PLG", profesor: "Casas Natalia (P)" },
    { materia: "MTM", profesor: "Sobricio Natasha (P)" }
  ],
  MARTES: [
    { materia: "MTM", profesor: "Sobricio Natasha (P)" },
    { materia: "PLG", profesor: "Casas Natalia (P)" },
    { materia: "EFC", profesor: "Gonzalez David (P)" }
  ],
  MIERCOLES: [
    { materia: "HTR", profesor: "Santillan Andrea (P)" },
    { materia: "IGS", profesor: "Yamuni Magali (P)" },
      ],
  JUEVES: [
    { materia: "GGF", profesor: "Almada Catalina (P)" },
    { materia: "FQA", profesor: "Rapretti Estefania Cecilia (P)" },
    { materia: "CCD", profesor: "Inchaupe Maria de Los Angeles (P)" },
    { materia: "CCD", profesor: "Inchaupe Maria de Los Angeles (P)" }

  ],
  VIERNES: [
    { materia: "APV", profesor: "Di Lucca Maria Belen (P)" },
    { materia: "BLG", profesor: "Karlen Lucia (P)" },
    { materia: "EFC", profesor: "Gonzalez David (P)" }
  ]
},
      
        // 4° grado
        "4° 1°": {
          LUNES: [
            { materia: "SYA", profesor: "Miranda Ag (TI)" },
            { materia: "LIT", profesor: "Cardillo (S)" },
            { materia: "EFC", profesor: "Alvarez Fernando (T)" }
          ],
          MARTES: [
            { materia: "NTI", profesor: "Crivaro (T)" },
            { materia: "IAF", profesor: "Torrez Janco (P)" },
            { materia: "GGF", profesor: "Ferreyra Maria" }
          ],
          MIERCOLES: [
            { materia: "HTR", profesor: "Esquiros (S)" },
            { materia: "PLG", profesor: "Cardillo (S)" },
            { materia: "BLG", profesor: "Karlen Lucia (T)" },
            { materia: "EFC", profesor: "Alvarez Fernando (T)" }
          ],
          JUEVES: [
            { materia: "PSI", profesor: "Cateriano Claudia (T)" },
            { materia: "MCS", profesor: "Motta Jorge (S)" },
            { materia: "MCS", profesor: "Motta Jorge (S)" }
          ],
          VIERNES: [
            { materia: "GGF", profesor: "Ferreyra Maria (P)" },
            { materia: "HTR", profesor: "Esquiros (S)" },
            { materia: "IGS", profesor: "Soleto Daniela (P)" }
          ]
        },
      
        "4° 2°": {
          LUNES: [
            { materia: "SYA", profesor: "Videla Estela (T)" },
            { materia: "HTR", profesor: "Cotovich Leonardo (TI)" },
            { materia: "EFC", profesor: "Miguel Pablo (T)" }
          ],
          MARTES: [
            { materia: "BLG", profesor: "Karlen Lucia (T)" },
            { materia: "IGS", profesor: "Etchegaray Maria (P)/Sanchez Carolina" }
          ],
          MIERCOLES: [
            { materia: "PSI", profesor: "Fajre M E (T)" },
            { materia: "LIT", profesor: "Barbosa (T)" },
            { materia: "EFC", profesor: "Miguel Pablo (T)" }
          ],
          JUEVES: [
            { materia: "IAF", profesor: "Iacobucci (T)" },
            { materia: "GGF", profesor: "Almada Catalina (TI)" }
          ],
          VIERNES: [
            { materia: "NTI", profesor: "Molina M (T)" },
            { materia: "MTM", profesor: "Tiziano M (TI)" }
          ]
        },
      
        // 5° grado
        "5° 1°": {
          LUNES: [
            { materia: "CCS", profesor: "Pacheco Daniela (T)" },
            { materia: "SOC", profesor: "Pereyra Isabel (P)" },
            { materia: "SOC", profesor: "Pereyra Isabel (P)" }
          ],
          MARTES: [
            { materia: "EPO", profesor: "Bianco Walter (T)" },
            { materia: "HTR", profesor: "Alvarez Daniel (T)" },
            { materia: "HTR", profesor: "Alvarez Daniel (T)" }
          ],
          MIERCOLES: [
            { materia: "MCS", profesor: "Gomez Natalia (T)/Somariba (S)" },
            { materia: "MCS", profesor: "Gomez Natalia (T)/Somariba (S)" },
            { materia: "IGS", profesor: "Yzacnik Alejandra (T)" }
          ],
          JUEVES: [
            { materia: "LIT", profesor: "Castro Cecilia (T)/Barbosa (S)" },
            { materia: "IAQ", profesor: "Gimenez Juana (T)" }
          ],
          VIERNES: [
            { materia: "PYC", profesor: "Mendez Maria (T)" },
            { materia: "GGF", profesor: "Almada Catalina (T)" }
          ]
        },
      
        "5° 2°": {
          LUNES: [
            { materia: "CCD", profesor: "Pacheco (T)" },
            { materia: "GGF", profesor: "Gamboa" }
          ],
          MARTES: [
            { materia: "LIT", profesor: "Perez Ramirez A (T)" },
            { materia: "HTR", profesor: "Lucero Gianetti (T)" },
            { materia: "EFC", profesor: "Alvarez Fernando (T)" }
          ],
          MIERCOLES: [
            { materia: "IGS", profesor: "Sanchez Carolina (P)" },
            { materia: "PYC", profesor: "Armendano Benicio (T)" },
            { materia: "EFC", profesor: "Alvarez Fernando (T)" }
          ],
          JUEVES: [
            { materia: "IAQ", profesor: "Pasalacua (TI)" },
            { materia: "MCS", profesor: "Pereyra Manuel" }
          ],
          VIERNES: [
            { materia: "SOC", profesor: "Ferrero Verzulli M (T)" },
            { materia: "SOC", profesor: "Ferrero Verzulli M (T)" },
            { materia: "EPO", profesor: "Gonzalez Antonia (T)" }
          ]
        },
      
        // 6° grado
        "6° 1°": {
          LUNES: [
            { materia: "FIA", profesor: "Diaz Odina (T)/Bastias Francisco (S)" },
            { materia: "RTE", profesor: "Morette Maria (T)" },
            { materia: "EFC", profesor: "Alvares Andrea (T)/Alvarez Fer (S)" }
          ],
          MARTES: [
            { materia: "IGS", profesor: "Rivas Marcela (TI)" },
            { materia: "HTR", profesor: "Baldi N (T)/Cardenas (S)" },
            { materia: "MCM", profesor: "Gomez Natalia (T)/Motta Jorge (S)" }
          ],
          MIERCOLES: [
            { materia: "TYC", profesor: "Payares Gaston (T)" },
            { materia: "HTR", profesor: "Baldi N (T)/Cardenas (S)" },
            { materia: "MCS", profesor: "Gomez Natalia (T)/Motta Jorge (S)" }
          ],
          JUEVES: [
            { materia: "GGF", profesor: "Perez Norma (P)" },
            { materia: "LIT", profesor: "Barbosa (T)" }
          ],
          VIERNES: [
            { materia: "PIC", profesor: "Villar Lidia (T)" },
            { materia: "EFC", profesor: "Alvares Andrea (T)/Alvarez Fer (S)" },
            { materia: "MCS", profesor: "Gomez Natalia (T)/Motta Jorge (S)" }
          ]
        },
      
        "6° 2ª": {
          LUNES: [
            { materia: "GGF", profesor: "Gamboa (T)" },
            { materia: "FIA", profesor: "Calderon (P)" },
            { materia: "FIA", profesor: "Calderon (P)" },
            { materia: "EFC", profesor: "Dumontet Gaston (P)" }
          ],  
          MARTES: [
            { materia: "LIT", profesor: "Gennari Marcos (TI)" },
            { materia: "LIT", profesor: "Gennari Marcos (TI)" },
            { materia: "IGS", profesor: "Rivas Marcela (T)" },
            { materia: "RTE", profesor: "Daglio (P)" }
          ],
          MIERCOLES: [
            { materia: "PIC", profesor: "Calderoni Ana" },
            { materia: "MCS", profesor: "Motta Jorge (P)" },
            { materia: "RTE", profesor: "Daglio (P)" }
          ],
          JUEVES: [
            { materia: "TYC", profesor: "Lucero (T)" },
            { materia: "HTR", profesor: "Lucero (T)" },
            { materia: "IGS", profesor: "Rivas Marcela (T)" },
            { materia: "EFC", profesor: "Dumontet Gaston (P)" }
          ],
          VIERNES: [
            { materia: "PIC", profesor: "Calderoni Ana" },
            { materia: "MCS", profesor: "Jorge (P)" },
            { materia: "MCS", profesor: "Jorge (P)" }
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

    // Función para obtener el número de días de un mes
    function obtenerNumeroDias(mes) {
        const [anio, mesNumero] = mes.split('-').map(Number);
        return new Date(anio, mesNumero, 0).getDate();
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

            const columnas = ['Día', 'Número del Día', 'Materia', 'Profesor'];
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

                    // Día de la Semana
                    const celdaDia = document.createElement('td');
                    celdaDia.textContent = dia;
                    celdaDia.classList.add('celda-dia');
                    fila.appendChild(celdaDia);

                    // Número del Día
                    const celdaNumeroDia = document.createElement('td');
                    celdaNumeroDia.textContent = '—'; // Placeholder, se actualizará si hay faltas
                    celdaNumeroDia.classList.add('celda-numero-dia');
                    fila.appendChild(celdaNumeroDia);

                    // Materia
                    const celdaMateria = document.createElement('td');
                    celdaMateria.textContent = materiaObj.materia;
                    celdaMateria.classList.add('celda-materia');
                    fila.appendChild(celdaMateria);

                    // Profesor
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
                        numeroDiaSeleccionado.value = ''; // Limpiar el número del día
                        motivoSeleccionado.value = '';
                        cantidadSeleccionada.value = '1';
                        cursoSeleccionadoModal.value = curso; // Asignar el curso al input hidden
                        motivoFaltaModal.show();
                    });

                    // Marcar fila si hay faltas
                    if (faltas[materiaObj.profesor] && faltas[materiaObj.profesor][mesActual] && faltas[materiaObj.profesor][mesActual][dia]) {
                        for (const motivo in faltas[materiaObj.profesor][mesActual][dia]) {
                            for (const cursoFalta in faltas[materiaObj.profesor][mesActual][dia][motivo]) {
                                const cantidad = faltas[materiaObj.profesor][mesActual][dia][motivo][cursoFalta];
                                if (cantidad > 0 && cursoFalta === curso) {
                                    fila.classList.add('fila-ausente');
                                    celdaNumeroDia.textContent = numeroDiaSeleccionado.value || '—'; // Mostrar el número del día si está registrado
                                    break; // No es necesario seguir buscando
                                }
                            }
                        }
                    }

                    // Marcar fila si es suplente
                    if (materiaObj.profesor.includes('(S)')) {
                        fila.classList.add('fila-suplente');
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
    function registrarAusencia(docente, mes, dia, numeroDia, motivo, cantidad, curso = null) {
        try {
            if (curso) {
                if (!faltas[docente]) faltas[docente] = {};
                if (!faltas[docente][mes]) faltas[docente][mes] = {};
                if (!faltas[docente][mes][dia]) faltas[docente][mes][dia] = {};
                if (!faltas[docente][mes][dia][numeroDia]) faltas[docente][mes][dia][numeroDia] = {};
                if (!faltas[docente][mes][dia][numeroDia][motivo]) faltas[docente][mes][dia][numeroDia][motivo] = {};
                if (!faltas[docente][mes][dia][numeroDia][motivo][curso]) faltas[docente][mes][dia][numeroDia][motivo][curso] = 0;
                faltas[docente][mes][dia][numeroDia][motivo][curso] += cantidad;
            } else {
                // Para todos los cursos seleccionados
                cursosSeleccionados.forEach(c => {
                    if (!faltas[docente]) faltas[docente] = {};
                    if (!faltas[docente][mes]) faltas[docente][mes] = {};
                    if (!faltas[docente][mes][dia]) faltas[docente][mes][dia] = {};
                    if (!faltas[docente][mes][dia][numeroDia]) faltas[docente][mes][dia][numeroDia] = {};
                    if (!faltas[docente][mes][dia][numeroDia][motivo]) faltas[docente][mes][dia][numeroDia][motivo] = {};
                    if (!faltas[docente][mes][dia][numeroDia][motivo][c]) faltas[docente][mes][dia][numeroDia][motivo][c] = 0;
                    faltas[docente][mes][dia][numeroDia][motivo][c] += cantidad;
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
        if (motivo && curso && dia) {
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
                    for (const numeroDia in faltas[docente][mes][dia]) {
                        for (const motivo in faltas[docente][mes][dia][numeroDia]) {
                            for (const curso in faltas[docente][mes][dia][numeroDia][motivo]) {
                                const cantidad = faltas[docente][mes][dia][numeroDia][motivo][curso];
                                const item = document.createElement('li');
                                item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                                item.textContent = `${docente} - Curso: ${curso} - ${mes}-${dia} (${numeroDia}) - ${motivo}`;

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
                        for (const numeroDia in faltas[profesor][mes][dia]) {
                            for (const motivo in faltas[profesor][mes][dia][numeroDia]) {
                                for (const cursoFalta in faltas[profesor][mes][dia][numeroDia][motivo]) {
                                    totalFaltas += faltas[profesor][mes][dia][numeroDia][motivo][cursoFalta];
                                }
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
                    pdf.text(`Número del Día: —`, 60, yOffset); // Placeholder
                    pdf.text(`Materia: ${materiaObj.materia}`, 100, yOffset);
                    pdf.text(`Profesor: ${materiaObj.profesor}`, 150, yOffset);
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
                        for (const numeroDia in faltas[profesor][mes][dia]) {
                            for (const motivo in faltas[profesor][mes][dia][numeroDia]) {
                                for (const cursoFaltas in faltas[profesor][mes][dia][numeroDia][motivo]) {
                                    totalFaltas += faltas[profesor][mes][dia][numeroDia][motivo][cursoFaltas];
                                }
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
                        "Número del Día": "—", // Placeholder, puedes actualizar si tienes la información
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
                    for (const numeroDia in faltas[docente][mes][dia]) {
                        for (const motivo in faltas[docente][mes][dia][numeroDia]) {
                            for (const curso in faltas[docente][mes][dia][numeroDia][motivo]) {
                                const cantidad = faltas[docente][mes][dia][numeroDia][motivo][curso];
                                faltasData.push({
                                    "Docente": docente,
                                    "Curso": curso,
                                    "Mes": mes,
                                    "Día": dia,
                                    "Número del Día": numeroDia,
                                    "Motivo": motivo,
                                    "Cantidad de Faltas": cantidad
                                });
                            }
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
                        for (const numeroDia in faltas[profesor][mes][dia]) {
                            for (const motivo in faltas[profesor][mes][dia][numeroDia]) {
                                for (const cursoFaltas in faltas[profesor][mes][dia][numeroDia][motivo]) {
                                    totalFaltas += faltas[profesor][mes][dia][numeroDia][motivo][cursoFaltas];
                                }
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
        const numeroDia = parseInt(numeroDiaSeleccionado.value, 10);
        const mes = obtenerMesSeleccionado();
        const motivo = motivoSeleccionado.value.trim();
        const cantidad = parseInt(cantidadSeleccionada.value, 10);
        const curso = cursoSeleccionadoModal.value; // Input hidden para el curso

        const numeroDias = obtenerNumeroDias(mes);
        if (numeroDia > numeroDias) {
            alert(`El mes seleccionado tiene solo ${numeroDias} días. Por favor, ingresa un número de día válido.`);
            return;
        }

        if (!docente || !dia || isNaN(numeroDia) || numeroDia < 1 || numeroDia > numeroDias || !mes || !motivo || isNaN(cantidad) || cantidad <= 0 || !curso) {
            alert('Completa todos los campos antes de registrar la falta y asegúrate de que el número del día sea válido.');
            return;
        }

        // Registrar la ausencia con día y número del día
        registrarAusencia(docente, mes, dia, numeroDia, motivo, cantidad, curso);
        motivoFaltaModal.hide();
    });
});
