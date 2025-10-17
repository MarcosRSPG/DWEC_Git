let cadena =
  "eeeaa eeeaaaooo aaaeeeuuuooo aaaaaaaaaaeeeeeeeeeiiiiiiiooooooouuuuuuuuu";

function comprobarLongitud(cadena) {
  let miniCadenas = cadena.split(" ");
  let max = ["", 0];

  for (const cadenita of miniCadenas) {
    let sinRep = [];
    for (let letra of cadenita) {
      if (!sinRep.includes(letra)) {
        sinRep.push(letra);
      }
    }
    if (sinRep.length > max[1]) {
      max[0] = cadenita;
      max[1] = sinRep.length;
    }
  }
  return max;
}

console.log(comprobarLongitud(cadena));
