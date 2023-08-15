document.addEventListener("DOMContentLoaded", async function () {
  // Obtiene el id del elemento que contendrá la lista de información de cada producto.
  const autoInfo = document.getElementById("autoInfo");

  // Crea un h2 con el título "Productos".
  const productoTitulo = document.createElement("h2");
  productoTitulo.textContent = `Productos`;

  // Crea un parráfo con un breve texto.
  const productoParrafo = document.createElement("p");
  productoParrafo.textContent = `Veras aquí todos los productos de la categoría Autos`;

  // Agrega los elementos de título y párrafo al contenedor autoInfo.
  autoInfo.appendChild(productoTitulo);
  autoInfo.appendChild(productoParrafo);

  // URL de la API de productos.
  const apiUrl =
    "https://japceibal.github.io/emercado-api/cats_products/101.json";

  try {
    // Realiza una solicitud a la API y espera la respuesta.
    const response = await fetch(apiUrl);
    // Convierte la respuesta en formato JSON y espera el resultado.
    const jsonData = await response.json();

    // Crea un contenedor para las tarjetas de productos.
    const productosContenedor = document.createElement("div");

    // Itera a través de cada producto en los datos JSON.
    jsonData.products.forEach((product) => {

      // Crea un elemento de tarjeta para el producto.
      const tarjetaContenedor = document.createElement("div");

      // Crea un elemento de imagen y establece la ruta de la imagen del producto.
      const imagen = document.createElement("img");
      imagen.className = "card-img-top";
      imagen.src = product.image;

      // Crea un elemento para el cuerpo de la tarjeta.
      const tarjetaInformacion = document.createElement("div");

      // Crea un elemento para el nombre del producto.
      const nombreProducto = document.createElement("h3");
      nombreProducto.textContent = `${product.name} - ${product.currency} ${product.cost}`;

      // Crea un elemento para la descripción del producto.
      const descripcionProducto = document.createElement("p");
      descripcionProducto.textContent = product.description;

      // Crea un elemento para la cantidad vendida del producto.
      const ventasProducto = document.createElement("p");
      ventasProducto.textContent = `${product.soldCount} vendidos`;

      // Agrega los elementos creados a la estructura de la tarjeta y del producto.
      tarjetaInformacion.appendChild(nombreProducto);
      tarjetaInformacion.appendChild(descripcionProducto);
      tarjetaInformacion.appendChild(ventasProducto);

      tarjetaContenedor.appendChild(imagen);
      tarjetaContenedor.appendChild(tarjetaInformacion);

      productosContenedor.appendChild(tarjetaContenedor);
    });

    // Agrega toda la información al contenedor de productos.
    autoInfo.appendChild(productosContenedor);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
