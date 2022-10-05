// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Agregando curso desde el btn
  listaCursos.addEventListener("click", agregarCurso);

  // Eliminar curso de carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    // console.log('Vaciando Carrito');
    articulosCarrito = []; // Reset el arreglo
    limpiarHTML(); // Eliminamos todo el HTML
  });
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
  console.log();
}

// Eliminar Curso
function eliminarCurso(e) {
  // console.log(e.target.classList);
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

// Leer el contenido del HTML y extraer la información
function leerDatosCurso(curso) {
  // console.log(curso);
  // Contenido del Curso Actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Verifica si el elemento ya existe y lo actualiza
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // Actualizar la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorma objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregar elementos al arreglo
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHTML();
}

// Mostrar en HTML los Cursos en el carrito
function carritoHTML() {
  // Limpìar el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
    `;

    // Agregar HTML en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Eliminar los cursos del tbody
function limpiarHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

console.log(articulosCarrito);
