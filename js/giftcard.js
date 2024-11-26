document.addEventListener("DOMContentLoaded", function () {
    // Selección de elementos de la previsualización
    const vistaDestinatario = document.querySelector(".vista__nombre--destinatario");
    const vistaMonto = document.querySelector(".vista__precio");
    const vistaFondo = document.querySelector(".vista");

    // Selección de elementos del formulario
    const inputNombreDestinatario = document.getElementById("nombreDestinatario");
    const inputColorFuente = document.querySelectorAll("input[name='colorFuente']");
    const inputTamanioFuente = document.querySelectorAll("input[name='tamanioFuente']");
    const inputMontoTarjeta = document.getElementById("montoTarjeta");
    const inputFondoTarjeta = document.querySelectorAll("input[name='fondoTarjeta']");
    const inputUbicacion = document.querySelectorAll("input[name='ubicacion']");

    // Actualizar nombre del destinatario
    inputNombreDestinatario.addEventListener("input", function () {
        vistaDestinatario.textContent = inputNombreDestinatario.value || "Destinatario";
    });

    // Actualizar color de fuente del destinatario
    inputColorFuente.forEach(colorRadio => {
        colorRadio.addEventListener("change", function () {
            if (colorRadio.checked) {
                const selectedColor = getComputedStyle(
                    document.querySelector(`.formulario__colores--${colorRadio.id}`)
                ).backgroundColor;
                vistaDestinatario.style.color = selectedColor;
            }
        });
    });

    // Actualizar tamaño de fuente del destinatario
    inputTamanioFuente.forEach(sizeRadio => {
        sizeRadio.addEventListener("change", function () {
            if (sizeRadio.checked) {
                vistaDestinatario.style.fontSize = sizeRadio.id;
            }
        });
    });

    // Actualizar monto en la previsualización
    inputMontoTarjeta.addEventListener("input", function () {
        const monto = parseInt(inputMontoTarjeta.value, 10);
        vistaMonto.querySelector(".vista__precio--texto").textContent =
            isNaN(monto) || monto < 10000 ? "$10.000" : `$${monto.toLocaleString()}`;
    });

    // Actualizar fondo de la Gift Card
    inputFondoTarjeta.forEach(fondoRadio => {
        fondoRadio.addEventListener("change", function () {
            if (fondoRadio.checked) {
                const selectedFondo = document.querySelector(`.formulario__fondo--${fondoRadio.id}`).src;
                vistaFondo.style.backgroundImage = `url(${selectedFondo})`;
            }
        });
    });

    // Actualizar ubicación del precio
    inputUbicacion.forEach(ubicacionRadio => {
        ubicacionRadio.addEventListener("change", function () {
            if (ubicacionRadio.checked) {
                // Resetear las posiciones antes de aplicar una nueva
                vistaMonto.style.position = "absolute";
                vistaMonto.style.top = "auto";
                vistaMonto.style.bottom = "auto";
                vistaMonto.style.left = "auto";
                vistaMonto.style.right = "auto";

                // Aplicar la posición según la selección
                switch (ubicacionRadio.id) {
                    case "ubicacion1":
                        vistaMonto.style.bottom = "5px";
                        vistaMonto.style.right = "5px";
                        break;
                    case "ubicacion2":
                        vistaMonto.style.top = "5px";
                        vistaMonto.style.left = "5px";
                        break;
                    case "ubicacion3":
                        vistaMonto.style.bottom = "5px";
                        vistaMonto.style.left = "5px";
                        break;
                }
            }
        });
    });
});