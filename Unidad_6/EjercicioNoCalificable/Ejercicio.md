# Ampliación de la práctica: Persistencia mediante API

En la versión actual de la Librería Comercio, los libros se almacenan únicamente en memoria utilizando un array global, por lo que los datos se pierden al recargar la página o cerrar la pestaña del navegador.

En esta ampliación de la práctica, deberás dotar de persistencia a los libros utilizando una API.

Requisitos funcionales
Los libros no deben almacenarse en un array global en el frontend.

La aplicación deberá comunicarse con una API REST para:

Guardar un nuevo libro.

Obtener el listado completo de libros.

Al acceder a la página Consultar, los libros deberán cargarse desde la API.

Al crear un nuevo libro, este deberá enviarse a la API y quedar persistido.

Requisitos técnicos
La API deberá exponer, al menos, los siguientes endpoints:

GET /libros → Devuelve el listado de libros.

POST /libros → Crea un nuevo libro.

El intercambio de datos se realizará en formato JSON.

Desde el frontend se deberán usar peticiones HTTP (fetch) para comunicarse con la API.

La estructura del libro deberá seguir usando el modelo de la clase Libro.
