let cadenas = ["aacabb", "bbcbaa"];

function sonCercanas(cadenas) {
  // Por separado funcionan las dos operaciones, pero faltan las combinaciones
}
function operacionUno(cadenaUno, cadenaDos) {
  cadenaUno = cadenaUno.split("");
  cadenaDos = cadenaDos.split("");
  for (const i in cadenaUno) {
    for (const j in cadenaUno) {
      if (i === j) continue;
      let auxiliar = [...cadenaUno];
      auxiliar[i] = cadenaUno[j];
      auxiliar[j] = cadenaUno[i];
      if (auxiliar.join("") === cadenaDos.join("")) {
        return true;
      }
    }
  }
  return false;
}
function operacionDos(cadenaUno, cadenaDos) {
  cadenaUno = cadenaUno.split("");

  cadenaDos = cadenaDos.split("");
  let cadUnoNoReps = [];
  for (let letra of cadenaUno) {
    if (!cadUnoNoReps.includes(letra)) {
      cadUnoNoReps.push(letra);
    }
  }
  for (let letraUno of cadUnoNoReps) {
    for (let letraDos of cadUnoNoReps) {
      let auxiliar = [...cadenaUno];
      if (letraUno === letraDos) continue;
      for (let indice in auxiliar) {
        if (auxiliar[indice] == letraUno) {
          auxiliar[indice] = letraDos;
          continue;
        }
        if (auxiliar[indice] == letraDos) {
          auxiliar[indice] = letraUno;
          continue;
        }
      }
      if (auxiliar.join("") === cadenaDos.join("")) {
        return true;
      }
    }
  }
  return false;
}
console.log(sonCercanas(cadenas));
