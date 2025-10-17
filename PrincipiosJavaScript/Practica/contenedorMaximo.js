let enteros = [4, 9, 7, 5, 4, 6, 10, 12, 3];

function cogerMasGrandes(enteros) {
  let maximos = [];
  let maxarea = 0;
  for (const i in enteros) {
    for (const j in enteros) {
      if (j === i) continue;
      base = Math.abs(j - i);

      let minimo = Math.min(enteros[i], enteros[j]);
      if (minimo * base > maxarea) {
        maximos = [enteros[i], enteros[j]];
        maxarea = minimo * base;
      }
    }
  }
  return maximos;
}

console.log(cogerMasGrandes(enteros));
