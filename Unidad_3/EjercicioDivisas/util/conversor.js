"use strict";
import { EURO_TO_DOLAR, LIBRA_TO_DOLAR } from "./constantes.js";

const matriz_conver = [
  [1, EURO_TO_DOLAR / LIBRA_TO_DOLAR, EURO_TO_DOLAR],
  [LIBRA_TO_DOLAR / EURO_TO_DOLAR, 1, LIBRA_TO_DOLAR],
  [1 / EURO_TO_DOLAR, 1 / LIBRA_TO_DOLAR, 1],
];
export function cambiar(monto, divisaFrom, divisaTo) {
  return monto * matriz_conver[divisaFrom][divisaTo];
}
