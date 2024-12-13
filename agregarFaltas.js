document.addEventListener('DOMContentLoaded', () => {
    const formAgregarFalta = document.getElementById('form-agregar-falta');
    
    // Crear el selector de curso dinámicamente
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

    // Contenedor para checkboxes de profesores
    const checkboxProfesorFalta = document.createElement('div');
    checkboxProfesorFalta.id = 'checkboxProfesorFalta';
    checkboxProfesorFalta.classList.add('row', 'mb-3');
    formAgregarFalta.insertBefore(checkboxProfesorFalta, formAgregarFalta.children[3]);

    const selectorMateriaFalta = document.getElementById('selectorMateriaFalta');
    const selectorDiaFalta = document.getElementById('selectorDiaFalta');
    const selectorMesFalta = document.getElementById('selectorMesFalta');
    const selectorTipoFalta = document.getElementById('selectorTipoFalta');

    // Poblar selector de cursos
    function poblarSelectorCursos() {
        selectorCursoFalta.innerHTML = '<option value="" disabled selected>Selecciona un curso</option>';
        const todosLosCursos = Object.keys(window.horarioPorCurso);

        todosLosCursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso;
            option.textContent = curso.toUpperCase();
            selectorCursoFalta.appendChild(option);
        });
    }

    function poblarCheckboxProfesores(curso) {
        checkboxProfesorFalta.innerHTML = '';
        if (!window.horarioPorCurso[curso]) {
            console.error(`El curso "${curso}" no existe.`);
            return;
        }

        const profesoresSet = new Set();
        Object.values(window.horarioPorCurso[curso]).forEach(materiasCurso => {
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

    function obtenerProfesoresSeleccionados() {
        const checkboxes = checkboxProfesorFalta.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    function poblarSelectorMaterias(curso, profesoresSeleccionados) {
        selectorMateriaFalta.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';
        
        if (!window.horarioPorCurso[curso]) {
            console.error(`El curso "${curso}" no existe.`);
            selectorMateriaFalta.disabled = true;
            return;
        }

        const materiasSet = new Set();
        Object.values(window.horarioPorCurso[curso]).forEach(materiasCurso => {
            materiasCurso.forEach(materiaObj => {
                const nombreProfesor = materiaObj.profesor.split(' (')[0].trim();
                if (profesoresSeleccionados.includes(nombreProfesor)) {
                    materiasSet.add(materiaObj.materia);
                }
            });
        });

        const materias = Array.from(materiasSet).sort();
        if (materias.length === 0) {
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "No hay materias para los profesores seleccionados";
            selectorMateriaFalta.appendChild(option);
            selectorMateriaFalta.disabled = true;
        } else {
            materias.forEach(materia => {
                const option = document.createElement('option');
                option.value = materia;
                option.textContent = materia;
                selectorMateriaFalta.appendChild(option);
            });
            selectorMateriaFalta.disabled = false;
        }
    }

    // Eventos
    selectorCursoFalta.addEventListener('change', (e) => {
        const cursoSeleccionado = e.target.value;
        poblarCheckboxProfesores(cursoSeleccionado);
        selectorMateriaFalta.innerHTML = '<option value="" disabled selected>Selecciona una materia</option>';
        selectorMateriaFalta.disabled = true;
    });

    // Al cambiar selección de profesores, actualizar materias
    checkboxProfesorFalta.addEventListener('change', () => {
        const curso = selectorCursoFalta.value;
        const profesoresSeleccionados = obtenerProfesoresSeleccionados();
        poblarSelectorMaterias(curso, profesoresSeleccionados);
    });

    poblarSelectorCursos();

    formAgregarFalta.addEventListener('submit', (e) => {
        e.preventDefault();
        const curso = selectorCursoFalta.value;
        const profesoresSeleccionados = obtenerProfesoresSeleccionados();
        const materia = selectorMateriaFalta.value;
        const dia = selectorDiaFalta.value;
        const mes = selectorMesFalta.value;
        const tipo = selectorTipoFalta.value;

        if (!curso || profesoresSeleccionados.length === 0 || !materia || !dia || !mes || !tipo) {
            alert('Por favor, completa todos los campos y selecciona al menos un profesor.');
            return;
        }

        // Registrar la falta (cantidad=1 por defecto)
        profesoresSeleccionados.forEach(profesor => {
            // Pasamos el curso para registrar la ausencia solo en ese curso
            window.registrarAusencia(profesor, mes, dia, tipo, 1, curso);
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
