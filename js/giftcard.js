document.addEventListener("DOMContentLoaded", function () {
    const vistaDestinatario = document.querySelector(".vista__nombre--destinatario");
    const vistaMonto = document.querySelector(".vista__precio");
    const vistaFondo = document.querySelector(".vista");

    const inputNombreDestinatario = document.getElementById("nombreDestinatario");
    const inputColorFuente = document.querySelectorAll("input[name='colorFuente']");
    const inputTamanioFuente = document.querySelectorAll("input[name='tamanioFuente']");
    const inputMontoTarjeta = document.getElementById("montoTarjeta");
    const inputFondoTarjeta = document.querySelectorAll("input[name='fondoTarjeta']");
    const inputUbicacion = document.querySelectorAll("input[name='ubicacion']");

    inputNombreDestinatario.addEventListener("input", function () {
        vistaDestinatario.textContent = inputNombreDestinatario.value || "Destinatario";
    });

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

    inputTamanioFuente.forEach(sizeRadio => {
        sizeRadio.addEventListener("change", function () {
            if (sizeRadio.checked) {
                vistaDestinatario.style.fontSize = sizeRadio.id;
            }
        });
    });

    inputMontoTarjeta.addEventListener("input", function () {
        const monto = parseInt(inputMontoTarjeta.value, 10);
        vistaMonto.querySelector(".vista__precio--texto").textContent =
            isNaN(monto) || monto < 10000 ? "$10.000" : `$${monto.toLocaleString()}`;
    });

    inputFondoTarjeta.forEach(fondoRadio => {
        fondoRadio.addEventListener("change", function () {
            if (fondoRadio.checked) {
                const selectedFondo = document.querySelector(`.formulario__fondo--${fondoRadio.id}`).src;
                vistaFondo.style.backgroundImage = `url(${selectedFondo})`;
            }
        });
    });

    inputUbicacion.forEach(ubicacionRadio => {
        ubicacionRadio.addEventListener("change", function () {
            if (ubicacionRadio.checked) {
                vistaMonto.style.position = "absolute";
                vistaMonto.style.top = "auto";
                vistaMonto.style.bottom = "auto";
                vistaMonto.style.left = "auto";
                vistaMonto.style.right = "auto";

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
                    case "ubicacion4":
                        vistaMonto.style.top = "5px";
                        vistaMonto.style.right = "5px";
                        break;
                }
            }
        });
    });
});