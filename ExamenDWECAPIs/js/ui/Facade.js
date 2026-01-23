class Facade {
  constructor() {}
  async cargarProductos() {
    const section = document.getElementById("seccionProductos");
    const template = document.getElementById("templateProducts");

    const productos = await fetch("http://localhost:3000/products")
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Something went wrong on API server!");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });

    productos.forEach((producto) => {
      const clone = template.content.firstElementChild.cloneNode(true);

      const name = clone.querySelector("#productname");
      const description = clone.querySelector("#description");
      const price = clone.querySelector("#price");
      const user = clone.querySelector("#username");

      name.textContent = producto.name;
      description.textContent = producto.description;
      price.textContent = producto.price;
      user.textContent = producto.user.name;

      clone
        .querySelector("#btnEliminar")
        .addEventListener("click", async (event) => {
          await fetch(`http://localhost:3000/products/${producto._id}`, {
            method: "DELETE",
          }).catch((error) => {
            console.log(error);
          });
          location.reload();
        });

      section.appendChild(clone);
    });
  }
}
export { Facade };
