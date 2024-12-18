document.addEventListener("DOMContentLoaded", function () {
    const carritoContainer = document.querySelector(".Carrito");
    const cantidadPersonasP = carritoContainer.querySelector("p");
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    document.body.appendChild(sidebar);

    sidebar.style.position = "fixed";
    sidebar.style.right = "-300px";
    sidebar.style.top = "0";
    sidebar.style.width = "300px";
    sidebar.style.height = "100%";
    sidebar.style.backgroundColor = "#fff";
    sidebar.style.boxShadow = "-2px 0 5px rgba(0,0,0,0.5)";
    sidebar.style.overflowY = "auto";
    sidebar.style.transition = "right 0.3s ease";
    sidebar.style.zIndex = "12";

    carritoContainer.addEventListener("click", function (event) {
        event.stopPropagation();
        sidebar.style.right = sidebar.style.right === "0px" ? "-300px" : "0px";
        mostrarCursosEnSidebar();
        actualizarCantidadPersonas();
    });

    function mostrarCursosEnSidebar() {
        const carritoData = JSON.parse(sessionStorage.getItem("carrito"));
        sidebar.innerHTML = "<h2>Carrito de Cursos</h2>";

        let totalCarrito = 0;

        if (!carritoData || carritoData.length === 0) {
            sidebar.innerHTML += "<p>Todavía no se obtuvieron cursos</p>";
        } else {
            carritoData.forEach((curso, index) => {
                const cursoElemento = document.createElement("div");
                cursoElemento.innerHTML = `
                    <div class="curso">
                        <h3>${curso.cursoNombre}</h3>
                        <p>Precio: $${curso.precioTotal}</p>
                        <p>Cantidad: ${curso.cantidadPersonas}</p>
                        <p>Modalidad: ${curso.modalidad}</p>
                        <button data-index="${index}" class="eliminar-curso">Eliminar</button>
                    </div>
                    <hr>
                `;
                sidebar.appendChild(cursoElemento);

                totalCarrito += curso.precioTotal;
            });

            sessionStorage.setItem("totalCarrito", totalCarrito);

            const totalElemento = document.createElement("div");
            totalElemento.innerHTML = `
                <h3>Total del Carrito: $${totalCarrito}</h3>
            `;
            sidebar.appendChild(totalElemento);

            const botonPagar = document.createElement("button");
            botonPagar.textContent = "Ir a pagar";
            botonPagar.classList.add("boton-pagar");
            sidebar.appendChild(botonPagar);

            botonPagar.addEventListener("click", function () {
                window.location.href = "../pages/pagoDeCurso.html";
            });
        }

        document.querySelectorAll(".eliminar-curso").forEach(boton => {
            boton.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                carritoData.splice(index, 1);
                sessionStorage.setItem("carrito", JSON.stringify(carritoData));
                mostrarCursosEnSidebar();
                actualizarCantidadPersonas();
            });
        });
    }

    function actualizarCantidadPersonas() {
        const carritoData = JSON.parse(sessionStorage.getItem("carrito"));
        let totalPersonas = 0;

        if (carritoData && carritoData.length > 0) {
            carritoData.forEach(curso => {
                totalPersonas += curso.cantidadPersonas;
            });
        }

        sessionStorage.setItem("totalPersonas", totalPersonas);

        cantidadPersonasP.textContent = `${totalPersonas}`;
    }

    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !carritoContainer.contains(event.target)) {
            sidebar.style.right = "-300px";
        }
    });

    actualizarCantidadPersonas();
});