export function generarHistorico(contenedor, template, objHistorico) {
  let frase = `${objHistorico.dia}/${objHistorico.mes}/${objHistorico.ano} ${objHistorico.hora}:${objHistorico.min} importe ${objHistorico.monto} ${objHistorico.divisaFrom} - ${objHistorico.cambio} ${objHistorico.divisaTo}`;
  const nodo = template.content.firstElementChild.cloneNode(true);
  nodo.textContent = frase;
  contenedor.appendChild(nodo);
}
