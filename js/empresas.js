document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(location.href);
    const id = parseInt(url.searchParams.get('cursoId'));

    if (isNaN(id)) {
        console.error("ID del curso no encontrado en la URL.");
        return;
    }

    const cursosDisponibles = JSON.parse(localStorage.getItem("cursos"));
    const curso = cursosDisponibles.cursos.find(c => c.cursoId === id);
    const precioCurso = curso ? curso.precio : 0;
    let cantidadPersonas = 1;

    const botonAgregarPersona = document.querySelector(".botonDentro");
    const contenedorPersonas = document.querySelector(".formulario");
    const precioTotalElement = document.querySelector(".precio p");
    const plantillaPersona = document.querySelector(".contenedor-personas");
    const botonCarrito = document.querySelector(".precio button");

    // Crear el modal
    const modal = document.createElement("dialog");
    modal.classList.add("modal-confirmacion");
    document.body.appendChild(modal);

    function actualizarPrecioTotal() {
        const precioTotal = precioCurso * cantidadPersonas;
        precioTotalElement.textContent = `$${precioTotal}`;
    }

    function validarCampos() {
        const filas = contenedorPersonas.querySelectorAll(".contenedor-personas");
        for (const fila of filas) {
            const inputs = fila.querySelectorAll("input");
            for (const input of inputs) {
                if (input.value.trim() === "") {
                    return false; // Si algún campo está vacío, retorna falso
                }
            }
        }
        return true; // Si todos los campos están llenos, retorna verdadero
    }

    function actualizarEstadoBotonCarrito() {
        if (validarCampos()) {
            botonCarrito.disabled = false;
        } else {
            botonCarrito.disabled = true;
        }
    }

    function eliminarPersona(event, fila) {
        event.preventDefault(); // Prevenir recarga de página

        if (contenedorPersonas.querySelectorAll(".contenedor-personas").length > 1) {
            // Si hay más de una fila, eliminar la fila completa
            fila.remove();
            cantidadPersonas--;
        } else {
            // Si solo hay una fila, limpiar los inputs de la primera fila
            const inputs = fila.querySelectorAll("input");
            inputs.forEach(input => (input.value = ""));
        }

        actualizarPrecioTotal();
        actualizarEstadoBotonCarrito();
    }

    // Agregar persona
    botonAgregarPersona.addEventListener("click", function (event) {
        event.preventDefault();
        const nuevaPersona = plantillaPersona.cloneNode(true);

        // Limpiar los inputs de la nueva fila
        nuevaPersona.querySelector("input[name^='nombre']").value = "";
        nuevaPersona.querySelector("input[name^='apellido']").value = "";
        nuevaPersona.querySelector("input[name^='dni']").value = "";
        nuevaPersona.querySelector("input[name^='email']").value = ""; // Nuevo campo
        nuevaPersona.querySelector("input[name^='phone']").value = ""; // Nuevo campo

        // Asegurarse de que el botón esté visible y tenga el evento de eliminar configurado
        const botonEliminar = nuevaPersona.querySelector(".imagen .boton");
        botonEliminar.style.display = "inline-block";
        botonEliminar.addEventListener("click", function (event) {
            eliminarPersona(event, nuevaPersona);
        });

        // Escuchar cambios en los inputs de la nueva fila para validar los campos
        nuevaPersona.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", actualizarEstadoBotonCarrito);
        });

        contenedorPersonas.insertBefore(nuevaPersona, botonAgregarPersona.closest(".imagen2"));
        cantidadPersonas++;
        actualizarPrecioTotal();
        actualizarEstadoBotonCarrito();
    });

    // Asignar el comportamiento de eliminar al botón de la primera fila
    const botonEliminarPrimeraFila = plantillaPersona.querySelector(".imagen .boton");
    if (botonEliminarPrimeraFila) {
        botonEliminarPrimeraFila.addEventListener("click", function (event) {
            eliminarPersona(event, plantillaPersona);
        });
    }

    // Validar campos al cargar la página
    plantillaPersona.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", actualizarEstadoBotonCarrito);
    });

    // Añadir al carrito y mostrar el modal
    botonCarrito.addEventListener("click", function () {
        if (!validarCampos()) {
            alert("Por favor, complete todos los campos antes de continuar.");
            return;
        }

        const precioTotal = precioCurso * cantidadPersonas;
        const modalidad = curso ? curso.modalidad : "Sin modalidad";

        // Obtener nombres, apellidos, emails y teléfonos de personas inscritas
        let inscritos = [];
        contenedorPersonas.querySelectorAll(".contenedor-personas").forEach(persona => {
            const nombre = persona.querySelector("input[name^='nombre']").value;
            const apellido = persona.querySelector("input[name^='apellido']").value;
            const email = persona.querySelector("input[name^='email']").value;
            const phone = persona.querySelector("input[name^='phone']").value;

            if (nombre && apellido && email && phone) {
                inscritos.push({ nombre, apellido, email, phone });
            }
        });

        // Recuperar el carrito actual de sessionStorage o crear un nuevo array si no existe
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

        // Crear el nuevo curso a agregar al carrito
        const nuevoCurso = {
            cursoNombre: curso.cursoNombre,
            precioTotal: precioTotal,
            cantidadPersonas: cantidadPersonas,
            modalidad: modalidad,
            inscritos: inscritos
        };

        // Verifica si el curso ya está en el carrito
        const cursoExistente = carrito.find(item => item.cursoNombre === nuevoCurso.cursoNombre && item.modalidad === nuevoCurso.modalidad);

        if (cursoExistente) {
            // Si el curso ya está en el carrito, actualizar su información
            cursoExistente.precioTotal += nuevoCurso.precioTotal;
            cursoExistente.cantidadPersonas += nuevoCurso.cantidadPersonas;
            cursoExistente.inscritos = [...cursoExistente.inscritos, ...nuevoCurso.inscritos];
        } else {
            // Si el curso no está en el carrito, agregar como nuevo elemento
            carrito.push(nuevoCurso);
        }

        // Guardar el carrito actualizado en sessionStorage
        sessionStorage.setItem('carrito', JSON.stringify(carrito));

        // Crear contenido del modal
        modal.innerHTML = `
            <h2>Confirmación de Inscripción</h2>
            <ul>
                ${inscritos.map(persona => `
                    <li>
                        ${persona.nombre} ${persona.apellido} - ${persona.email} - ${persona.phone}
                    </li>`).join("")}
            </ul>
            <button id="confirmarCompra">Confirmar compra</button>
        `;

        modal.showModal();

        // Confirmar compra y redirigir al index
        document.getElementById("confirmarCompra").addEventListener("click", function () {
            modal.close();
            window.location.href = "../index.html";
        });
    });

    // Inhabilitar el botón al cargar la página
    botonCarrito.disabled = true;
    actualizarPrecioTotal();
});