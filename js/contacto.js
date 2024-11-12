document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // 1. Validaciones del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            showPopup("Consulta enviada");
        }
    });

    // Validación del campo de nombre y apellido (no puede estar vacío)
    function validateName(name) {
        if (name.trim() === '') {
            alert('El campo Nombre y Apellido no puede estar vacío.');
            return false;
        }
        return true;
    }

    // Validación del correo electrónico con expresión regular
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert('El correo electrónico no es válido.');
            return false;
        }
        return true;
    }

    // Validación del teléfono (8 dígitos y guion opcional)
    function validatePhone(phone) {
        if (phone && !/^\d{4}-?\d{4}$/.test(phone)) {
            alert('El teléfono debe tener 8 dígitos y un guion opcional en el medio.');
            return false;
        }
        return true;
    }

    // Validación de mensaje (máximo 1000 caracteres) y conteo en tiempo real
    function validateMessage(message) {
        if (message.length > 1000) {
            alert('La consulta no puede exceder los 1000 caracteres.');
            return false;
        }
        return true;
    }

    // Conteo de caracteres restantes en tiempo real
    messageInput.addEventListener('input', function () {
        const remainingChars = 1000 - messageInput.value.length;
        let counterDisplay = document.getElementById('message-counter');
        if (!counterDisplay) {
            counterDisplay = document.createElement('p');
            counterDisplay.id = 'message-counter';
            messageInput.parentElement.appendChild(counterDisplay);
        }
        counterDisplay.textContent = `Caracteres restantes: ${remainingChars}`;
    });

    // 2. Mostrar el popup al enviar usando <dialog>
    function showPopup(message) {
        let dialog = document.getElementById('popup-dialog');
        if (!dialog) {
            dialog = document.createElement('dialog');
            dialog.id = 'popup-dialog';
            dialog.innerHTML = `
                <p>${message}</p>
                <button id="popup-ok">Aceptar</button>
            `;
            document.body.appendChild(dialog);

            // Botón para cerrar el dialog y redirigir
            document.getElementById('popup-ok').addEventListener('click', function () {
                dialog.close();
                window.location.href = '../index.html';  // Redirige a la página principal
            });
        }
        dialog.showModal();  // Muestra el dialog
    }
});