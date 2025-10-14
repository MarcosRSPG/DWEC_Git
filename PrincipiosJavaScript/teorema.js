let num = 9999999999999999;

function cuadrados(num) {
  let solucion = [];
  for (let i = 0; i < 4; i++) {
    let sumando = parseInt(Math.sqrt(num));
    num -= sumando ** 2;
    solucion.push(sumando);
  }
  return solucion;
}

console.log(cuadrados(num));
