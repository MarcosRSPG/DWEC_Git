// ------------------- VARIABLES --------------------
let filas, columnas, velHun, trampas;
let vidas = 3;
let aciertos = 0;

const inputFilas = document.getElementById("filas");
const inputColumnas = document.getElementById("columnas");
const inputVelocidad = document.getElementById("velHun");
const inputNumTramp = document.getElementById("trampas");
const formulario = document.getElementById("config");
const grid = document.getElementById("grid");
//let id1 = setInterval(() => moverBarco(), parseInt(inputVelocidad.value));
// ------------------- GUARDAR CONFIG --------------------
function guardarConfig() {
  localStorage.setItem("filas", filas);
  localStorage.setItem("columnas", columnas);
  localStorage.setItem("velHun", velHun);
  localStorage.setItem("trampas", trampas);
}

function comprobarValidity() {
  if (parseInt(inputFilas.value) < 3 || parseInt(inputFilas.value) > 10) {
    inputFilas.setCustomValidity("Las filas deben estar entre 3 y 10");
  }
  if (parseInt(inputColumnas.value) < 3 || parseInt(inputColumnas.value) > 10) {
    inputColumnas.setCustomValidity("Las columnas deben estar entre 3 y 10");
  }
  if (
    parseInt(inputVelocidad.value) < 200 ||
    parseInt(inputVelocidad.value) > 5000
  ) {
    inputVelocidad.setCustomValidity("La velocidad debe estar entre 200 y 800");
  }
  let numTrampMax = inputFilas.value * inputColumnas.value;
  if (
    parseInt(inputNumTramp.value) < 1 ||
    parseInt(inputNumTramp.value) > parseInt(numTrampMax / 3)
  ) {
    inputNumTramp.setCustomValidity(
      "Debes poner un numero de trampas entre 1 y " + parseInt(numTrampMax / 3)
    );
  }
  if (!formulario.checkValidity()) {
    formulario.reportValidity();
  }
}

// ------------------- BOTÓN CREAR GRID --------------------
document.getElementById("crear").addEventListener("click", (event) => {
  event.preventDefault();
  comprobarValidity();
  filas = Number(document.getElementById("filas").value);
  columnas = Number(document.getElementById("columnas").value);
  velHun = Number(document.getElementById("velHun").value);
  trampas = Number(document.getElementById("trampas").value);

  vidas = 3;
  aciertos = 0;

  document.getElementById("vidas-num").textContent = vidas;
  generarGrid();
});

// ------------------- GENERAR GRID --------------------
function generarGrid() {
  grid.innerHTML = "";

  grid.style.gridTemplateColumns = `repeat(${columnas}, 40px)`;
  grid.style.gridTemplateRows = `repeat(${filas}, 40px)`;

  for (let i = 0; i < filas * columnas; i++) {
    const cell = document.createElement("figure");
    cell.className = "cell";
    cell.dataset.index = i;
    grid.appendChild(cell);
  }
  crearMinas();
  let id1 = setInterval(() => moverBarco(), parseInt(velHun));
}
function crearMinas() {
  for (let index = 0; index < trampas; index++) {
    grid.childNodes[Math.round(Math.random() * filas * columnas)].setAttribute(
      "estado",
      "mina"
    );
  }
}
function moverBarco() {
  let contador = 0;
  grid.childNodes.forEach((nodo) => {
    contador++;

    if (nodo.getAttribute("estado") === "barco") {
      nodo.childNodes.forEach((hijo) => {
        nodo.removeChild(hijo);
      });
    }
    const imagen = document.createElement("img");
    if (
      Math.round(Math.random() * filas * columnas) === contador &&
      nodo.getAttribute("estado") !== "mina" &&
      nodo.getAttribute("estado") !== "error"
    ) {
      imagen.setAttribute("src", "./img/boat.png");
      nodo.setAttribute("estado", "barco");
      nodo.appendChild(imagen);
    } else {
      if (nodo.getAttribute("estado") !== "mina") {
        nodo.setAttribute("estado", "cell");
      }
    }
    nodo.addEventListener("click", (event) => {
      //id1 = setInterval(() => moverBarco(), parseInt(inputVelocidad.value));
      if (nodo.getAttribute("estado") === "barco") {
        aciertos += 1;
        if (aciertos === 10) {
          alert("Has Ganado");
          window.location.reload();
        }
      }
      if (nodo.getAttribute("estado") === "cell") {
        vidas -= 1;

        nodo.setAttribute("estado", "error");
        nodo.appendChild(document.createElement("img"));
        nodo.querySelector("img").setAttribute("src", "./img/error.png");
        if (vidas <= 0) {
          alert("Has Perdido");
          window.location.reload();
        }
      }
      if (nodo.getAttribute("estado") !== "mina") {
        nodo.setAttribute("estado", "error");
        nodo.appendChild(document.createElement("img"));
        nodo.querySelector("img").setAttribute("src", "./img/error.png");
        if (vidas <= 0) {
          alert("Has Perdido");
          window.location.reload();
        }
      }
    });
  });
}
