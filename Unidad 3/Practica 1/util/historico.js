export function generarHistorico(contenedor, template, frase) {
  const nodo = template.content.firstElementChild.cloneNode(true);
  nodo.textContent = frase;
  contenedor.appendChild(nodo);
}
