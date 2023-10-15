document.addEventListener("DOMContentLoaded", function () {
    // Recupera el nombre de usuario del localStorage
    const userName = localStorage.getItem('usuariovalue');

    // Verifica si el nombre de usuario se recuperó correctamente y no es nulo
    if (userName) {
        // Asigna el nombre de usuario al contenido del enlace de usuario
        const userDropdownLink = document.getElementById("userDropdown");
        userDropdownLink.textContent = userName;
    } else {
        // En caso de que no se haya recuperado un nombre de usuario válido
        console.error("Nombre de usuario no encontrado en el localStorage");
    }

    // URL del carrito
    const cartURL = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

    fetch(cartURL)
        .then((response) => response.json())
        .then((data) => {
            const cartItemsContainer = document.getElementById("cart-items");

            data.articles.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("card", "mb-3");

                productDiv.innerHTML = `
                    <div class="card-body">
                        <div class="row align-items-center">
                            <img src="${product.image}" class="img-fluid rounded-3" alt="${product.name}" style="width: 65px;">
                            <div class="col-md-3">
                                <h5>${product.name}</h5>
                            </div>
                            <div class="col-md-2">
                                <h5>${product.currency} ${product.unitCost}</h5>
                            </div>
                            <div class="col-md-2">
                                <input type="number" class="form-control" value="${product.count}" min="1" data-product-id="${product.id}">
                            </div>
                            <div class="col-md-2 subtotal">
                                <h5>Subtotal: ${product.currency} ${product.unitCost * product.count}</h5>
                            </div>
                            <div class="col-md-2">
                                <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                            </div>
                        </div>
                    </div>
                `;

                cartItemsContainer.appendChild(productDiv);

                 // Agregar evento input para calcular el subtotal en función de la cantidad del peugeot
                 const inputQuantity = productDiv.querySelector('input');
                 inputQuantity.addEventListener('input', function () {
                     const count = parseInt(inputQuantity.value);
                     const unitCost = product.unitCost;
                     const subtotal = count * unitCost;
                     const subtotalElement = productDiv.querySelector('.subtotal');
                     subtotalElement.innerHTML = `<h5>Subtotal: ${product.currency} ${subtotal}</h5>`;
                 });
 
                 // Agregar evento para eliminar el producto 
                 const deleteButton = productDiv.querySelector('a');
                 deleteButton.addEventListener('click', function () {
                    // Remover el elemento del carrito en el localStorage
 const carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];
 const index = carrito.findIndex((item) => item.id === product.id);
 if (index !== -1) {
     carrito.splice(index, 1);
     localStorage.setItem("CARRITO", JSON.stringify(carrito));
 }
 
 
                     // Remover el elemento del DOM
                     productDiv.remove();
                 });
             });

            // Función para mostrar productos en el carrito almacenados en el localStorage
            function MostrarProductoEnCarrito(producto) {
                // Obtener el elemento del producto almacenado en el localStorage
                const productDiv = document.createElement("div");
                productDiv.classList.add("card", "mb-3");

                productDiv.innerHTML = `
                    <div class="card-body">
                        <div class="row align-items-center">
                            <img src="${producto.image}" class="img-fluid rounded-3" alt="${producto.name}" style="width: 65px;">
                            <div class="col-md-3">
                                <h5>${producto.name}</h5>
                            </div>
                            <div class="col-md-2">
                                <h5>${producto.currency} ${producto.cost}</h5>
                            </div>
                            <div class="col-md-2">
                                <input type="number" class="form-control" value="${producto.count}" min="1" data-product-id="${producto.id}">
                            </div>
                            <div class="col-md-2 subtotal">
                                <h5>Subtotal: ${producto.currency} ${producto.cost * producto.count}</h5>
                            </div>
                            <div class="col-md-2">
                                <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                            </div>
                        </div>
                    </div>
                `;

                cartItemsContainer.appendChild(productDiv);

                // Agregar evento input para calcular el subtotal en función de la cantidad
                const inputQuantity = productDiv.querySelector('input');
                inputQuantity.addEventListener('input', function () {
                    const count = parseInt(inputQuantity.value);
                    const cost = producto.cost;
                    const subtotal = count * cost;
                    const subtotalElement = productDiv.querySelector('.subtotal');
                    subtotalElement.innerHTML = `<h5>Subtotal: ${producto.currency} ${subtotal}</h5>`;

                    // Actualizar el carrito en el localStorage con la nueva cantidad
                    const carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];
                    const productIndex = carrito.findIndex((item) => item.id === producto.id);
                    if (productIndex !== -1) {
                        carrito[productIndex].count = count;
                        localStorage.setItem("CARRITO", JSON.stringify(carrito));
                    }
                });

                // Agregar evento para eliminar el producto del carrito almacenado en el localStorage
                const deleteButton = productDiv.querySelector('a');
                deleteButton.addEventListener('click', function () {
                    // Remover el elemento del carrito almacenado en el localStorage
                    const carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];
                    const productIndex = carrito.findIndex((item) => item.id === producto.id);
                    if (productIndex !== -1) {
                        carrito.splice(productIndex, 1);
                        localStorage.setItem("CARRITO", JSON.stringify(carrito));
                    }

                    // Remover el elemento del DOM
                    productDiv.remove();
                });
            }

            // Recuperar el carrito del localStorage
            const CARRITO = JSON.parse(localStorage.getItem("CARRITO")) || [];

            // Iterar a través de los productos en el carrito almacenados en el localStorage y mostrarlos
            CARRITO.forEach((producto) => {
                MostrarProductoEnCarrito(producto);
            });
        })
        .catch((error) => {
            console.error("Error al cargar el carrito:", error);
        });
