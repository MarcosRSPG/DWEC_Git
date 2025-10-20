let entry = [6, 10];

function contarPrimos(entrada) {
  let left = entrada[0];
  let right = entrada[1];
  let numPrimos = 0;
  for (let index = left; index <= right; index++) {
    let numUnos = index
      .toString(2)
      .split("")
      .filter((n) => n == 1).length;
    let noEsPrimo = false;
    for (let index = numUnos - 1; index > 1; index--) {
      if (numUnos % index === 0) {
        noEsPrimo = true;
      }
    }
    if (numUnos <= 1) noEsPrimo = true;

    numPrimos += noEsPrimo ? 0 : 1;
  }
  return numPrimos;
}

console.log(contarPrimos(entry));
