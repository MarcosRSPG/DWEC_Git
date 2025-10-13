let mat = [20, 10, -80, 10, 10, 15, 35];

function comSimil(matriz) {
  numeros = {};
  matriz.forEach((numero, index) => {
    numeros[index] = { derecha: 0, izquierda: 0 };

    for (let i = index + 1; i < matriz.length; i++) {
      if (index === matriz.length) {
        numeros[index].derecha = 0;
        break;
      }
      numeros[index].derecha += matriz[i];
    }
    for (let i = 0; i < index; i++) {
      if (index === 0) {
        numeros[index].izquierda = 0;
        break;
      }
      numeros[index].izquierda += matriz[i];
    }
  });
  let resultados = [];
  for (posicion in numeros) {
    if (numeros[posicion].derecha === numeros[posicion].izquierda) {
      resultados.push(posicion);
    }
  }
  return resultados;
}
console.log(comSimil(mat));
