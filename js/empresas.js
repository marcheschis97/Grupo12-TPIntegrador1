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
                    return false;
                }
            }
        }
        return true;
    }

    function actualizarEstadoBotonCarrito() {
        if (validarCampos()) {
            botonCarrito.disabled = false;
        } else {
            botonCarrito.disabled = true;
        }
    }

    function eliminarPersona(event, fila) {
        event.preventDefault();

        if (contenedorPersonas.querySelectorAll(".contenedor-personas").length > 1) {
            fila.remove();
            cantidadPersonas--;
        } else {
            const inputs = fila.querySelectorAll("input");
            inputs.forEach(input => (input.value = ""));
        }

        actualizarPrecioTotal();
        actualizarEstadoBotonCarrito();
    }

    botonAgregarPersona.addEventListener("click", function (event) {
        event.preventDefault();
        const nuevaPersona = plantillaPersona.cloneNode(true);

        nuevaPersona.querySelector("input[name^='nombre']").value = "";
        nuevaPersona.querySelector("input[name^='apellido']").value = "";
        nuevaPersona.querySelector("input[name^='dni']").value = "";
        nuevaPersona.querySelector("input[name^='email']").value = "";
        nuevaPersona.querySelector("input[name^='phone']").value = "";

        const botonEliminar = nuevaPersona.querySelector(".imagen .boton");
        botonEliminar.style.display = "inline-block";
        botonEliminar.addEventListener("click", function (event) {
            eliminarPersona(event, nuevaPersona);
        });

        nuevaPersona.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", actualizarEstadoBotonCarrito);
        });

        contenedorPersonas.insertBefore(nuevaPersona, botonAgregarPersona.closest(".imagen2"));
        cantidadPersonas++;
        actualizarPrecioTotal();
        actualizarEstadoBotonCarrito();
    });

    const botonEliminarPrimeraFila = plantillaPersona.querySelector(".imagen .boton");
    if (botonEliminarPrimeraFila) {
        botonEliminarPrimeraFila.addEventListener("click", function (event) {
            eliminarPersona(event, plantillaPersona);
        });
    }

    plantillaPersona.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", actualizarEstadoBotonCarrito);
    });

    botonCarrito.addEventListener("click", function () {
        if (!validarCampos()) {
            alert("Por favor, complete todos los campos antes de continuar.");
            return;
        }

        const precioTotal = precioCurso * cantidadPersonas;
        const modalidad = curso ? curso.modalidad : "Sin modalidad";

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

        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

        const nuevoCurso = {
            cursoNombre: curso.cursoNombre,
            precioTotal: precioTotal,
            cantidadPersonas: cantidadPersonas,
            modalidad: modalidad,
            inscritos: inscritos
        };

        const cursoExistente = carrito.find(item => item.cursoNombre === nuevoCurso.cursoNombre && item.modalidad === nuevoCurso.modalidad);

        if (cursoExistente) {
            cursoExistente.precioTotal += nuevoCurso.precioTotal;
            cursoExistente.cantidadPersonas += nuevoCurso.cantidadPersonas;
            cursoExistente.inscritos = [...cursoExistente.inscritos, ...nuevoCurso.inscritos];
        } else {
            carrito.push(nuevoCurso);
        }

        sessionStorage.setItem('carrito', JSON.stringify(carrito));

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

        document.getElementById("confirmarCompra").addEventListener("click", function () {
            modal.close();
            window.location.href = "../index.html";
        });
    });

    botonCarrito.disabled = true;
    actualizarPrecioTotal();
});