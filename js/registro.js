const form = document.querySelector('.form');
const registrarmeBtn = document.querySelector('.boton-registrarme');
const popupDialog = document.getElementById('popupDialog');
const popupMessage = document.getElementById('popupMessage');
const popupCloseButton = document.getElementById('popupCloseButton');

// Mostrar popup de registro
function showPopup(message) {
    popupMessage.textContent = message;
    popupDialog.showModal();
}

popupCloseButton.addEventListener('click', () => {
    popupDialog.close();
});

// Registro de nuevo usuario
registrarmeBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const nombre = form.elements['nombre'].value;
    const apellido = form.elements['apellido'].value;
    const dni = form.elements['dni'].value;
    const celular = form.elements['celular'].value;
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const genero = form.elements['genero'].value;
    const calle = form.elements['calle'].value;
    const numero = form.elements['numero'].value;
    const piso = form.elements['piso'].value;
    const dpto = form.elements['dpto'].value;
    const cp = form.elements['cp'].value;
    const provincia = form.elements['provincia'].value;
    const ciudad = form.elements['ciudad'].value;

    if (!nombre || !apellido || !dni || !celular || !email || !password || !genero || !calle || !numero || !cp || !provincia || !ciudad) {
        showPopup('Por favor, completa todos los campos requeridos.');
        return;
    }

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

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(usuario => usuario.email === email);

    if (usuarioExistente) {
        showPopup('El email ingresado ya está registrado. Por favor, usa otro email.');
        return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    showPopup('Registro exitoso. Ahora puedes iniciar sesión.');
    popupCloseButton.addEventListener('click', () => {
        window.location.href = '../pages/inicioSesion.html';
    }, { once: true });
});