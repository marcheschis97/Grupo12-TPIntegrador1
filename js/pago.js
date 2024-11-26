document.addEventListener("DOMContentLoaded", function () {
    const botonConfirmarPago = document.querySelector("button[type='button']:first-of-type"); // Selecciona el botón Confirmar Pago
    const formularioPago = document.querySelector(".formulario-pago"); // Selecciona el formulario de pago

    botonConfirmarPago.addEventListener("click", function () {
        // Verificar si todos los campos requeridos están completos
        if (formularioPago.checkValidity()) {
            // Mostrar modal de felicitaciones si todo está correcto
            mostrarModalFelicitaciones();

            // Borrar datos del sessionStorage
            sessionStorage.removeItem("carrito");
            sessionStorage.removeItem("totalPersonas");
            sessionStorage.removeItem("totalCarrito");
        } else {
            // Resaltar los campos faltantes y mostrar un mensaje de error
            formularioPago.reportValidity();
        }
    });

    function mostrarModalFelicitaciones() {
        // Crear el modal
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";

        // Contenido del modal
        const modalContent = document.createElement("div");
        modalContent.style.backgroundColor = "#fff";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "10px";
        modalContent.style.textAlign = "center";
        modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

        const mensaje = document.createElement("h2");
        mensaje.textContent = "¡Felicitaciones por completar su compra!";
        modalContent.appendChild(mensaje);

        const botonCerrar = document.createElement("button");
        botonCerrar.textContent = "Cerrar";
        botonCerrar.style.marginTop = "20px";
        botonCerrar.style.padding = "10px 20px";
        botonCerrar.style.backgroundColor = "rgb(240, 240, 52)";
        botonCerrar.style.color = "black";
        botonCerrar.style.border = "1px solid black";
        botonCerrar.style.borderRadius = "5px";
        botonCerrar.style.cursor = "pointer";

        botonCerrar.addEventListener("click", function () {
            modal.remove();
            // Redirigir a la página principal
            window.location.href = "../index.html";
        });

        modalContent.appendChild(botonCerrar);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }
});