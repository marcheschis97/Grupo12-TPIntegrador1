const cursosDisponibles = JSON.parse(localStorage.getItem("cursos"));

const url = new URL(location.href);
const id = parseInt(url.searchParams.get('cursoId'));
console.log(id);

const curso = cursosDisponibles.cursos.find(c => c.cursoId === id);
console.log(curso);

if (curso) {
    const mainContainer = document.querySelector('#contenido-curso');

    const cursoDetalleHtml = `
        <section class="curso-detalle">
            <div class="curso-imagen">
                <img src="${curso.imagen}" alt="Imagen del curso">
            </div>
            <div class="curso-info">
                <h1>${curso.cursoNombre}</h1>
                <p>$${curso.precio}</p>
                <h4>Modalidad</h4>
                <p>${curso.modalidad}</p>
                <h4>Duración</h4>
                <p>${curso.duracion}</p>
                <h4>Sobre el curso</h4>
                <p>${curso.sobreCurso}</p>
                <h4>Requisitos previos</h4>
                <ul>
                    <li>${curso.requisito1}</li>
                    <li>${curso.requisito2}</li>
                </ul>
                <a href="./inicioSesion.html">
                    <button>Inscribirse</button>
                </a>
            </div>
        </section>

        <section class="unidades">
            <h3>Contenido por clase</h3>
            <div class="unidad">
                <details>
                    <summary><strong>UNIDAD 1</strong></summary>
                    <ul>
                        <li>
                            <label for="clase1">${curso.clase1}</label>
                            <div class="checkbox-container">
                                <input type="checkbox" id="clase1">
                                <span class="duracion">20 min</span>
                            </div>
                        </li>
                        <li>
                            <label for="clase2">${curso.clase2}</label>
                            <div class="checkbox-container">
                                <input type="checkbox" id="clase2">
                                <span class="duracion">25 min</span>
                            </div>
                        </li>
                        <li>
                            <label for="examen1">EXAMEN 1</label>
                            <div class="checkbox-container">
                                <input type="checkbox" id="examen1">
                                <span class="duracion">40 min</span>
                            </div>
                        </li>
                    </ul>
                </details>

                <details>
                    <summary><strong>UNIDAD 2</strong></summary>
                    <ul>
                        <li>
                            <label for="clase3">${curso.clase3}</label>
                            <div class="checkbox-container">
                                <input type="checkbox" id="clase3">
                                <span class="duracion">30 min</span>
                            </div>
                        </li>
                        <li>
                            <label for="clase4">${curso.clase4}</label>
                            <div class="checkbox-container">
                                <input type="checkbox" id="clase4">
                                <span class="duracion">35 min</span>
                            </div>
                        </li>
                        <li>
                            <label for="examen2">EXAMEN 2</label>
                            <div class="checkbox-container">
                                <input type="checkbox" id="examen2">
                                <span class="duracion">40 min</span>
                            </div>
                        </li>
                    </ul>
                </details>
            </div>
        </section>
    `;

    mainContainer.innerHTML = cursoDetalleHtml;
} else {
    console.error("Curso no encontrado");
}

const cursosRelacionados = cursosDisponibles.cursos.filter(curso => curso.cursoId !== id);
const cursosParaMostrar = cursosRelacionados.slice(0, 3);
const contenedorCursosRelacionados = document.querySelector('#cursos-relacionados');

let cursosHtml = '';  // Variable para acumular el HTML

cursosParaMostrar.forEach(curso => {
    cursosHtml += `
        <div class="detalle-cursos-list">
            <div class="curso-relacionado">
                <div class="relacionados-imagen">
                    <img src="${curso.imagen}" alt="${curso.cursoNombre} logo">
                </div>
                <p>${curso.cursoNombre}</p>
                <p>${curso.duracion}</p>
                <p>$${curso.precio}</p>
                <a href="${curso.url}">
                    <button>Detalle del curso</button>
                </a>
            </div>
        </div>
    `;
});

contenedorCursosRelacionados.innerHTML = cursosHtml;