# Descripción breve del proyecto

Este proyecto es una aplicación web de gestión de tareas. Permite crear tareas con título, descripción y prioridad, almacenarlas en el localStorage para que no se pierdan al recargar la página y mostrarlas en una lista donde se puede ver su fecha de creación y su estado. Desde la propia interfaz se pueden marcar tareas como completadas, desmarcarlas, eliminarlas y filtrarlas por prioridad y por estado.

# Patrones utilizados

- Singleton: Se aplica a la clase que gestiona el conjunto de tareas para garantizar que toda la aplicación use una única instancia compartida, encargada de la lista de tareas, el contador de identificadores y la sincronización con el almacenamiento local.

- Strategy: Se utiliza en el sistema de filtros de tareas para poder cambiar de forma flexible el criterio de filtrado (por estado o por prioridad), de manera que se puedan combinar y ampliar filtros sin modificar la estructura principal del código.

- Facade: Se emplea en la capa de interfaz para ofrecer un punto de entrada único que construye las tarjetas de tareas, aplica filtros y conecta los botones del DOM con las acciones de negocio, evitando que el resto de la aplicación tenga que manejar directamente los detalles de la UI.

# Instrucciones para ejecutar el proyecto

Para crear una tarea debes introducir en el primer formulario, un titulo, una descprición y una prioridad, después pulsas crear y se genera automáticamente en tu almacenamiento local para no perderlo aun que cierres la pestaña.

En el buscador puedes filtrar tanto por prioridad como por estado, y puedes modificar el estado pulsando el boton del lapicero en cada tarea o borrar tareas pulsando el boton x de cada tarea. Una vez cambiada o borrada una tarea, se reiniciara la web y podras volver a buscar ya que el foco al reiniciar lo tendrá en el buscador.
