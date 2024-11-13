document.addEventListener("DOMContentLoaded", function () {
    const agregarPersonaBtn = document.querySelector("#boton-agregar-persona"); // Ajusta el selector según tu HTML
    const contenedorGeneral = document.querySelector("#contenedor-general"); // Ajusta el selector al contenedor principal
    const precioElemento = document.querySelector(".precio"); // Ajusta el selector según tu HTML

    let precioBasePorPersona = 100; // Precio base por persona (ajústalo según tus necesidades)
    let cantidadPersonas = 0;

    // Función para actualizar el precio total
    function actualizarPrecio() {
        const precioTotal = precioBasePorPersona * cantidadPersonas;
        precioElemento.textContent = `$${precioTotal}`;
    }

    // Función para agregar un nuevo div de persona
    function agregarPersona() {
        cantidadPersonas++;

        // Crear el nuevo div contenedor de persona
        const nuevoDiv = document.createElement("div");
        nuevoDiv.classList.add("contenedor-personas");

        // Añadir contenido al div (por ejemplo, un botón de eliminar)
        nuevoDiv.innerHTML = `
        <p>Persona ${cantidadPersonas}</p>
        <button class="boton-eliminar">
          <img src="Cursoparaempresa.jpg" alt="Eliminar persona">
        </button>
      `;

        // Añadir evento de eliminar al botón
        nuevoDiv.querySelector(".boton-eliminar").addEventListener("click", function () {
            eliminarPersona(nuevoDiv);
        });

        // Agregar el nuevo div al contenedor general
        contenedorGeneral.appendChild(nuevoDiv);
        actualizarPrecio();
    }

    // Función para eliminar un div de persona
    function eliminarPersona(divPersona) {
        contenedorGeneral.removeChild(divPersona);
        cantidadPersonas--;
        actualizarPrecio();
    }

    // Agregar evento de click al botón de agregar persona
    agregarPersonaBtn.addEventListener("click", agregarPersona);
});
