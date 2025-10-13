let numeros = "hola que tal";
function sinRepes(numeros) {
  let sinRep = [];
  for (let numero of numeros) {
    if (!sinRep.includes(numero)) {
      sinRep.push(numero);
    }
  }
  return sinRep;
}
console.log(sinRepes(numeros));
