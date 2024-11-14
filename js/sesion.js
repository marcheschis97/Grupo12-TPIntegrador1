const loginForm = document.querySelector('form');
const loginPopup = document.getElementById('loginPopup');
const loginPopupMessage = document.getElementById('loginPopupMessage');
const loginPopupCloseButton = document.getElementById('loginPopupCloseButton');

function showLoginPopup(message) {
    loginPopupMessage.textContent = message;
    loginPopup.showModal();
}

loginPopupCloseButton.addEventListener('click', () => {
    loginPopup.close();
});

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(user => user.email === email && user.password === password);

    if (usuario) {
        showLoginPopup('Inicio de sesión exitoso');
        loginPopupCloseButton.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    } else {
        showLoginPopup('Los datos ingresados son inválidos. Por favor, verifica e intenta de nuevo.');
    }
});

const eliminarCuentaLink = document.getElementById('eliminarCuenta');

function eliminarCuenta(email) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const indexUsuario = usuarios.findIndex(user => user.email === email);

    if (indexUsuario !== -1) {
        usuarios.splice(indexUsuario, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        showLoginPopup(`La cuenta con el email ${email} ha sido eliminada exitosamente.`);
    } else {
        showLoginPopup(`No se encontró ninguna cuenta con el email ${email}.`);
    }
}

eliminarCuentaLink.addEventListener('click', function (event) {
    event.preventDefault();

    const email = loginForm.elements['email'].value;

    if (email) {
        eliminarCuenta(email);
    } else {
        showLoginPopup('Por favor, ingresa un email en el campo correspondiente para eliminar la cuenta.');
    }
});