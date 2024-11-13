// Selecciona el formulario, el botón de inicio de sesión y el dialog para mostrar mensajes
const loginForm = document.querySelector('form');
const loginPopup = document.getElementById('loginPopup');
const loginPopupMessage = document.getElementById('loginPopupMessage');
const loginPopupCloseButton = document.getElementById('loginPopupCloseButton');

// Función para mostrar el popup con un mensaje específico
function showLoginPopup(message) {
    loginPopupMessage.textContent = message;
    loginPopup.showModal();
}

// Cierra el popup al hacer clic en el botón de cerrar
loginPopupCloseButton.addEventListener('click', () => {
    loginPopup.close();
});

// Maneja el evento de envío del formulario de inicio de sesión
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();  // Evita el envío del formulario

    // Captura los datos ingresados en el formulario
    const email = loginForm.elements['email'].value;
    const password = loginForm.elements['password'].value;

    // Obtiene la lista de usuarios desde el localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Busca un usuario que coincida con el email y la contraseña ingresados
    const usuario = usuarios.find(user => user.email === email && user.password === password);

    if (usuario) {
        // Si el usuario existe y la contraseña es correcta, muestra mensaje de éxito
        showLoginPopup('Inicio de sesión exitoso');
        loginPopupCloseButton.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    } else {
        // Si el usuario no existe o la contraseña es incorrecta, muestra mensaje de error
        showLoginPopup('Los datos ingresados son inválidos. Por favor, verifica e intenta de nuevo.');
    }
});


// Selecciona el enlace de eliminar cuenta y el input de email del formulario de inicio de sesión
const eliminarCuentaLink = document.getElementById('eliminarCuenta');

// Función para eliminar el usuario por email
function eliminarCuenta(email) {
    // Obtiene la lista de usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si existe un usuario con el email ingresado
    const indexUsuario = usuarios.findIndex(user => user.email === email);

    if (indexUsuario !== -1) {
        // Elimina el usuario si existe en el array
        usuarios.splice(indexUsuario, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));  // Actualiza el localStorage
        showLoginPopup(`La cuenta con el email ${email} ha sido eliminada exitosamente.`);
    } else {
        // Muestra un mensaje si no se encontró el email ingresado
        showLoginPopup(`No se encontró ninguna cuenta con el email ${email}.`);
    }
}

// Evento de clic en el enlace para eliminar cuenta
eliminarCuentaLink.addEventListener('click', function (event) {
    event.preventDefault();  // Evita el comportamiento por defecto del enlace

    // Captura el email ingresado en el formulario
    const email = loginForm.elements['email'].value;

    if (email) {
        // Llama a la función para eliminar la cuenta con el email ingresado
        eliminarCuenta(email);
    } else {
        // Muestra un mensaje si no se ha ingresado un email
        showLoginPopup('Por favor, ingresa un email en el campo correspondiente para eliminar la cuenta.');
    }
});