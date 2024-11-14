const cursosDisponibles = {
    cursos: [
        {
            cursoId: 1,
            cursoNombre: "Introducción a PHP",
            duracion: "12 horas",
            modalidad: "Virtual",
            sobreCurso: `En este curso de PHP aprenderás a crear sitios web dinámicos utilizando
                    las principales funciones del lenguaje. Descubrirás cómo gestionar formularios, trabajar con bases
                    de datos
                    y aplicar buenas prácticas para desarrollar aplicaciones web eficientes y seguras.`,
            requisito1: "Conocimientos básicos de HTML y CSS",
            requisito2: "Nociones de lógica de programación y manejo de estructuras básicas",
            clase1: "Introducción a PHP y su entorno de desarrollo",
            clase2: "Variables, tipos de datos y operadores en PHP",
            clase3: "Estructuras de control: condicionales y bucles",
            clase4: "Funciones y manejo de formularios en PHP",
            imagen: "../assets/image/php_logo.jpg",
            precio: 50000,
            totalPrecio: 50000,
            url: "../pages/detalleCursos.html?cursoId=1",
        },
        {
            cursoId: 2,
            cursoNombre: "Python Developer",
            duracion: "21 horas",
            modalidad: "Virtual",
            sobreCurso: `En este curso de Python aprenderás de forma práctica los conceptos básicos, las mejores técnicas, así
                    como las librerías más populares y herramientas necesarias para programar de forma eficiente con
                    este lenguaje de programación.`,
            requisito1: "Conocimientos Básicos de Computación",
            requisito2: "Nociones de lógica de programación y manejo de estructuras básicas",
            clase1: "Colección y Procesamiento de Datos",
            clase2: "Funciones y Manejo de Excepciones",
            clase3: "Programación Orientada a Objetos",
            clase4: "Lectura y escritura de archivos",
            imagen: "../assets/image/python_logo.png",
            precio: 85000,
            totalPrecio: 85000,
            url: "../pages/detalleCursos.html?cursoId=2",
        },
        {
            cursoId: 3,
            cursoNombre: "SQL Server",
            duracion: "18 horas",
            modalidad: "Presencial",
            sobreCurso: `En este curso de SQL Server aprenderás a administrar, mantener y optimizar bases de datos en SQL
                    Server, utilizando herramientas avanzadas para asegurar la integridad, seguridad y eficiencia en el
                    manejo de grandes volúmenes de datos.`,
            requisito1: "Fundamentos de Bases de Datos",
            requisito2: "Conceptos Básicos de Programación",
            clase1: "Introducción a las bases de datos relacionales",
            clase2: "Diseño de bases de datos y normalización",
            clase3: "Creación de bases de datos y tablas",
            clase4: "Manipulación de datos en SQL Server",
            imagen: "../assets/image/sql_logo.jpeg",
            precio: 105000,
            totalPrecio: 105000,
            url: "../pages/detalleCursos.html?cursoId=3",
        },
        {
            cursoId: 4,
            cursoNombre: "Javascript PWA",
            duracion: "24 horas",
            modalidad: "Virtual",
            sobreCurso: `Aprende a desarrollar aplicaciones web progresivas con JavaScript. 
                        Desarrolla sitios con el mayor rendimiento posible y aprende a desarrollar 
                        aplicaciones mobiles en JS simulando apps nativas.`,
            requisito1: "Conocimientos básicos de HTML y CSS",
            requisito2: "Nociones de lógica de programación y manejo de estructuras básicas",
            clase1: "Introducción a Javascript y su entorno de desarrollo",
            clase2: "Variables, tipos de datos y operadores en Javascript",
            clase3: "Buenas prácticas en JavaScript",
            clase4: "Funciones y manejo de formularios en Javascript",
            imagen: "../assets/image/javascript_logo.png",
            precio: 75000,
            totalPrecio: 75000,
            url: "../pages/detalleCursos.html?cursoId=4",
        },
    ],
    cursosTotal: 0,
    moneda: "ARS",
};

localStorage.setItem("cursos", JSON.stringify(cursosDisponibles));