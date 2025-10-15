let num = 4;
function persisMult(num) {
  if (num < 10) {
    return 0;
  }
  let contador = 0;
  do {
    let numIni = 1;
    for (numero of num.toString().split("")) {
      numIni *= parseInt(numero);
    }
    num = numIni;
    contador++;
  } while (num >= 10);
  return contador;
}

console.log(persisMult(num));
