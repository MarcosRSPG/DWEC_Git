let numeros = [
  1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9,
];
function contarImpares(numeros) {
  let mapa = {};
  numeros.forEach((numero) => {
    mapa[numero] = Object.keys(mapa).includes(String(numero))
      ? mapa[numero] + 1
      : 1;
  });
  let impares = [];
  numeros.forEach((numero) => {
    if (mapa[numero] % 2 !== 0 && !impares.includes(numero)) {
      impares.push(numero);
    }
  });
  return impares;
}

console.log(contarImpares(numeros));
