document.addEventListener("DOMContentLoaded", () => {
    const botonConfirmar = document.querySelector("button[type='button']");
    const formularioPago = document.querySelector(".formulario-pago");

    botonConfirmar.addEventListener("click", function () {
        if (formularioPago.checkValidity()) {
            mostrarModalFelicitaciones();
        } else {
            formularioPago.reportValidity();
        }
    });
});

function mostrarModalFelicitaciones() {
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
        window.location.href = "../index.html";
    });

    modalContent.appendChild(botonCerrar);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}