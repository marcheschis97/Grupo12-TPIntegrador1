document.addEventListener("DOMContentLoaded", function () {
    const curso = JSON.parse(localStorage.getItem("cursoSeleccionado"));
    const precioCurso = curso ? curso.precio : 0;
    let cantidadPersonas = 1;

    const botonAgregarPersona = document.querySelector(".imagen2 .botonDentro");
    const contenedorPersonas = document.querySelector(".formulario");
    const precioTotalElement = document.querySelector(".precio p");
    const plantillaPersona = document.querySelector(".contenedor-personas");
    const botonCarrito = document.querySelector(".precio button");

    const modal = document.createElement("dialog");
    modal.classList.add("modal-confirmacion");
    document.body.appendChild(modal);

    const primerBotonEliminar = plantillaPersona.querySelector(".imagen .boton");
    primerBotonEliminar.addEventListener("click", function (event) {
        event.preventDefault();
        plantillaPersona.querySelector("input[name^='nombre']").value = "";
        plantillaPersona.querySelector("input[name^='apellido']").value = "";
        plantillaPersona.querySelector("input[name^='dni']").value = "";
    });

    function actualizarPrecioTotal() {
        const precioTotal = precioCurso * cantidadPersonas;
        precioTotalElement.textContent = `$${precioTotal}`;
    }

    botonAgregarPersona.addEventListener("click", function (event) {
        event.preventDefault();
        const nuevaPersona = plantillaPersona.cloneNode(true);
        nuevaPersona.querySelector("input[name^='nombre']").value = "";
        nuevaPersona.querySelector("input[name^='apellido']").value = "";
        nuevaPersona.querySelector("input[name^='dni']").value = "";

        const botonEliminar = nuevaPersona.querySelector(".imagen .boton");
        botonEliminar.style.display = "inline-block";
        botonEliminar.addEventListener("click", function (event) {
            event.preventDefault();
            nuevaPersona.remove();
            cantidadPersonas--;
            actualizarPrecioTotal();
        });

        contenedorPersonas.insertBefore(nuevaPersona, botonAgregarPersona.closest(".imagen2"));
        cantidadPersonas++;
        actualizarPrecioTotal();
    });

    botonCarrito.addEventListener("click", function () {
        const precioTotal = precioCurso * cantidadPersonas;
        const modalidad = curso ? curso.modalidad : "Sin modalidad";

        let inscritos = [];
        contenedorPersonas.querySelectorAll(".contenedor-personas").forEach(persona => {
            const nombre = persona.querySelector("input[name^='nombre']").value;
            const apellido = persona.querySelector("input[name^='apellido']").value;
            if (nombre && apellido) {
                inscritos.push({ nombre, apellido });
            }
        });

        const carritoData = {
            carrito: [
                {
                    cursoNombre: curso.cursoNombre,
                    precioTotal: precioTotal,
                    cantidadPersonas: cantidadPersonas,
                    modalidad: modalidad
                },
            ],
        };
        sessionStorage.setItem("carrito", JSON.stringify(carritoData));

        modal.innerHTML = `
            <h2>Confirmación de Inscripción</h2>
            <ul>
                ${inscritos.map(persona => `<li>${persona.nombre} ${persona.apellido}</li>`).join("")}
            </ul>
            <button id="confirmarCompra">Confirmar compra</button>
        `;

        modal.showModal();

        document.getElementById("confirmarCompra").addEventListener("click", function () {
            modal.close();
            window.location.href = "../index.html";
        });
    });

    actualizarPrecioTotal();
});