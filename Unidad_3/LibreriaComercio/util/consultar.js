import { LIBROS_KEY } from "./constantes.js";

let libros = [];

const contenedor = document.getElementById("libro");
const template = document.getElementById("tempLibro");

function escribirLibro(contenedor, template, libro) {
  let node = template.content.cloneNode(true);
  node.querySelector("#nomLibro").textContent = libro.titulo;
  node.querySelector("#nomAut").textContent = libro.autor;
  node.querySelector("#numPag").textContent = libro.paginas;
  node.querySelector("#pres").textContent = libro.prestado ? "Si" : "No";
  let buttonEditar = node.querySelector("#btnEditarArticulo");
  let buttonEliminar = node.querySelector("#btnCerrarArticulo");

  buttonEliminar.addEventListener("click", (event) => {
    libros = recogerLibros().filter((l) => l.titulo !== libro.titulo);
    sessionStorage.setItem(LIBROS_KEY, JSON.stringify(libros));
    window.location.href = "consultar.html";
  });
  buttonEditar.addEventListener("click", (event) => {
    let libroMod = recogerLibros().filter((l) => l.titulo === libro.titulo);
    let nuevTitulo = prompt(
      `Pon un nuevo titulo para el libro: ${libro.titulo}`
    );
    libroMod.forEach((element) => {
      element.titulo = nuevTitulo;
    });
    sessionStorage.setItem(LIBROS_KEY, JSON.stringify(libros));
    window.location.href = "consultar.html";
  });
  contenedor.appendChild(node);
}

libros = recogerLibros();
libros.forEach((element) => {
  escribirLibro(contenedor, template, element);
});

function recogerLibros() {
  let stringLibros = sessionStorage.getItem(LIBROS_KEY);
  if (stringLibros !== null) {
    libros = JSON.parse(stringLibros);
    return libros;
  }
  return null;
}
