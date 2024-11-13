// Selecciona el formulario, el botón de registro y el dialog para mostrar mensajes
const form = document.querySelector('.form');
const registrarmeBtn = document.querySelector('.boton-registrarme');
const popupDialog = document.getElementById('popupDialog');
const popupMessage = document.getElementById('popupMessage');
const popupCloseButton = document.getElementById('popupCloseButton');

// Función para mostrar el popup con un mensaje específico
function showPopup(message) {
    popupMessage.textContent = message;
    popupDialog.showModal();
}

// Cierra el popup al hacer clic en el botón de cerrar
popupCloseButton.addEventListener('click', () => {
    popupDialog.close();
});

// Maneja el evento de registro cuando se hace clic en el botón de registro
registrarmeBtn.addEventListener('click', function (event) {
    event.preventDefault();  // Evita que se recargue la página al enviar el formulario

    // Captura los datos del formulario
    const nombre = form.elements[0].value;
    const apellido = form.elements[1].value;
    const dni = form.elements[2].value;
    const celular = form.elements[3].value;
    const email = form.elements[4].value;
    const password = form.elements[5].value;
    const genero = form.elements[6].value;
    const calle = form.elements[7].value;
    const numero = form.elements[8].value;
    const piso = form.elements[9].value;
    const dpto = form.elements[10].value;
    const cp = form.elements[11].value;
    const provincia = form.elements[12].value;
    const ciudad = form.elements[13].value;

    // Valida que los campos requeridos no estén vacíos
    if (!nombre || !apellido || !dni || !celular || !email || !password || !genero || !calle || !numero || !cp || !provincia || !ciudad) {
        showPopup('Por favor, completa todos los campos requeridos.');
        return;
    }

    // Crea un objeto de usuario con los datos capturados
    const nuevoUsuario = {
        nombre,
        apellido,
        dni,
        celular,
        email,
        password,
        genero,
        direccion: {
            calle,
            numero,
            piso,
            dpto,
            cp,
            provincia,
            ciudad
        }
    };

    // Obtiene el array de usuarios desde localStorage o crea uno nuevo si no existe
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica que el email no esté ya registrado
    const usuarioExistente = usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        showPopup('El email ingresado ya está registrado. Por favor, usa otro email.');
        return;
    }

    // Agrega el nuevo usuario al array de usuarios y guarda en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Muestra un mensaje de éxito y redirige a la página de inicio
    showPopup('Registro exitoso. Ahora puedes iniciar sesión.');
    popupCloseButton.addEventListener('click', () => {
        window.location.href = '../pages/inicioSesion.html';
    });
});