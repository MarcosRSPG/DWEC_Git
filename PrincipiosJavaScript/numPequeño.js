let numeros = [1, 1, 2, 6, 5, 4, 7, 8, 9, 8, 8, 2, 2, 4, 2, 2, 3, 3, 6, 6];

function contarNumeros(numeros) {
  let mapa = {};
  numeros.forEach((numero) => {
    mapa[numero] = Object.keys(mapa).includes(String(numero))
      ? mapa[numero] + 1
      : 1;
  });

  minimo = Math.min(...Object.values(mapa));

  minimos = [];
  numeros.forEach((numero) => {
    if (mapa[numero] === minimo) {
      minimos.push(numero);
    }
  });
  return Math.min(...minimos);
}

console.log(contarNumeros(numeros));
