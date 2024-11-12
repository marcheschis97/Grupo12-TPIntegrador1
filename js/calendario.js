const cursosDisponibles = JSON.parse(localStorage.getItem("cursos"));
const buttons = document.querySelectorAll('.boton-calendario');
const modal = document.querySelector('#modal');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const cursoId = parseInt(event.currentTarget.id);
        console.log("ID del curso:", cursoId);
        const selectedCourse = cursosDisponibles.cursos.find(curso => curso.cursoId === cursoId);

        if (selectedCourse) {
            modal.innerHTML = `
                <div class="curso-relacionado">
                    <div class="sql-imagen">
                        <img src="${selectedCourse.imagen}" alt="${selectedCourse.cursoNombre} logo" class="modal-image">
                    </div>
                    <p>Nombre: ${selectedCourse.cursoNombre}</p>
                    <p>Duración: ${selectedCourse.duracion}</p>
                    <p>Precio: $${selectedCourse.precio}</p>
                    <a href="${selectedCourse.url}">
                        <button>Detalle del curso</button>
                    </a>
                    <button id="close-modal" class="btn waves-effect waves-light red lighten-2">Cerrar</button>
                </div>
            `;

            modal.showModal();

            const closeModalButton = document.querySelector('#close-modal');
            closeModalButton.addEventListener('click', () => {
                modal.close();
            });
        }
    });
});