let mat = [2, 5, 3, 9, 5, 3];

function comSimil(matriz) {
  let numeros = {};
  let mediasDiff = [];
  matriz.forEach((numero, index) => {
    numeros[index] = { derecha: 0, izquierda: 0 };
    let contIz = 0;
    let contDer = 0;

    for (let i = index + 1; i < matriz.length; i++) {
      numeros[index].derecha += matriz[i];
      contDer++;
    }
    for (let i = 0; i <= index; i++) {
      numeros[index].izquierda += matriz[i];
      contIz++;
    }

    if (index !== matriz.length - 1) {
      mediasDiff.push(
        Math.abs(
          Math.floor(numeros[index].derecha / contDer) -
            Math.floor(numeros[index].izquierda / contIz)
        )
      );
    }
  });
  if (matriz.length === 1) {
    mediasDiff.push(matriz[0]);
  }
  let minimo = Math.min(...mediasDiff);
  for (let index in mediasDiff) {
    if (mediasDiff[index] === minimo) {
      return index;
    }
  }
}
console.log(comSimil(mat));
