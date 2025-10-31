const boton = document.getElementById("submitCalcular");

const contenedor = document.getElementById("resultado");

boton.addEventListener("click", (event) => {
  event.preventDefault();
  let anterior = document.getElementById("res");
  if (anterior) {
    contenedor.removeChild(anterior);
  }

  let valor = parseInt(document.getElementById("inputNum").value);
  const nuevaLinea = document.createElement("p");
  nuevaLinea.id = "res";

  const texto = document.createTextNode(
    `El valor es ${calcularFactorial(valor)}`
  );
  nuevaLinea.appendChild(texto);
  contenedor.appendChild(nuevaLinea);
});

function calcularFactorial(valor) {
  valor = Number(valor);

  if (isNaN(valor) || valor < 0) {
    return "valor no válido";
  }

  if (valor === 0 || valor === 1) {
    return 1;
  }

  return valor * calcularFactorial(valor - 1);
}
