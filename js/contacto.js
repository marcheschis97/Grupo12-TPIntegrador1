document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const mensajeNyM = document.getElementById('mensajeNyM');
    const mensajeEmail = document.getElementById('mensajeEmail');
    const mensajeTelefono = document.getElementById('mensajeTelefono');


    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearMessages();

        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            showPopup("Consulta enviada");
        }
    });

    function clearMessages() {
        mensajeNyM.textContent = '';
        mensajeEmail.textContent = '';
        mensajeTelefono.textContent = '';
    }

    function validateName(name) {
        if (name.trim() === '') {
            mensajeNyM.textContent = 'El campo Nombre y Apellido no puede estar vacío.';
            return false;
        }
        return true;
    }

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            mensajeEmail.textContent = 'El correo electrónico no es válido.';
            return false;
        }
        return true;
    }

    function validatePhone(phone) {
        if (phone && !/^\d{4}-?\d{4}$/.test(phone)) {
            mensajeTelefono.textContent = `El teléfono debe tener 8 dígitos y 
                                            un guion opcional en el medio.`;
            return false;
        }
        return true;
    }

    const mensajeConsulta = document.createElement('p');
    mensajeConsulta.id = 'mensajeConsulta';
    messageInput.parentElement.appendChild(mensajeConsulta);

    function validateMessage(message) {
        if (message.trim() === '') {
            mensajeConsulta.textContent = 'Debe escribir alguna consulta.';
            return false;
        }
        if (message.length > 1000) {
            mensajeConsulta.textContent = 'La consulta no puede exceder los 1000 caracteres.';
            return false;
        }
        mensajeConsulta.textContent = '';
        return true;
    }

    messageInput.addEventListener('input', function () {
        const remainingChars = 1000 - messageInput.value.length;

        if (mensajeConsulta.textContent === 'Debe escribir alguna consulta.') {
            mensajeConsulta.textContent = '';
        }

        let counterDisplay = document.getElementById('message-counter');
        if (!counterDisplay) {
            counterDisplay = document.createElement('p');
            counterDisplay.id = 'message-counter';
            messageInput.parentElement.appendChild(counterDisplay);
        }
        counterDisplay.textContent = `Caracteres restantes: ${remainingChars}`;
    });

    function showPopup(message) {
        const dialog = document.getElementById('modalContacto');

        dialog.innerHTML = `
            <p>${message}</p>
            <button id="popup-ok">Aceptar</button>
        `;

        dialog.showModal();

        document.getElementById('popup-ok').addEventListener('click', function () {
            dialog.close();
            window.location.href = '../index.html';
        });
    }
});