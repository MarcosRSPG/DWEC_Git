const vocales = ["a", "e", "i", "o", "u"];
let palabra = "Hola buenas";
function calcularVocales(palabra) {
  let cont = 0;
  for (i = 0; i < palabra.length; i++) {
    vocales.includes(palabra[i].toLowerCase()) ? cont++ : cont;
  }
  return cont;
}

console.log(calcularVocales(palabra));
