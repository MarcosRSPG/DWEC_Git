"use strict";

let resultado = {};

const numeros = prompt("Introduce una cadena de numeros");
const mensaje = document.getElementById("mensaje");
const template = document.getElementById("tempLista");
let regx = /\d,+/;

if (regx.test(numeros)) {
  let nums = numeros.split(",");
  resultado = analyzeNumbers(nums);
  escribirResult(mensaje, template, resultado);
} else {
  mensaje.appendChild(
    document
      .createElement("p")
      .appendChild(document.createTextNode(`Error de formato`))
  );
}
function analyzeNumbers(nums) {
  let arrayAyuda = [];

  nums.forEach((element) => {
    arrayAyuda.push(parseInt(element));
  });

  let result = {};
  result.original = nums;
  result.ordenDesc = arrayAyuda.toSorted((a, b) => a - b).reverse();

  let pares = [];
  let impares = [];
  let unicos = [];
  let suma = 0;

  arrayAyuda.forEach((element) => {
    element % 2 === 0 ? pares.push(element) : impares.push(element);

    if (!unicos.includes(element)) {
      unicos.push(element);
    }
    suma += element;
  });

  result.pares = pares;
  result.impares = impares;
  result.unicos = unicos;
  result.suma = suma;

  return result;
}
function escribirResult(contenedor, template, result) {
  let node = template.content.cloneNode(true);
  node.querySelector("#lisOri").textContent = result.original;
  node.querySelector("#numPar").textContent = result.pares;
  node.querySelector("#numImp").textContent = result.impares;
  node.querySelector("#numUni").textContent = result.unicos;
  node.querySelector("#lisOrd").textContent = result.ordenDesc;
  node.querySelector("#sumTot").textContent = result.suma;
  contenedor.appendChild(node);
}
