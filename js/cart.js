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
            const containersubtotal = document.getElementById("subtotal-container"); // Contenedor de subtotales

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

                // Agregar evento input para calcular el subtotal en función de la cantidad del producto
                const cantitdadinput = productDiv.querySelector('input');
                cantitdadinput.addEventListener('input', function () {
                    const count = parseInt(cantitdadinput.value);
                    const unitCost = parseFloat(product.unitCost); // Corrección aquí
                    const subtotal = count * unitCost;
                    const subtotalElement = productDiv.querySelector('.subtotal');
                    subtotalElement.innerHTML = `<h5>Subtotal: ${product.currency} ${subtotal.toFixed(2)}`; // Corrección aquí
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
                const cantitdadinput = productDiv.querySelector('input');
                cantitdadinput.addEventListener('input', function () {
                    const count = parseInt(cantitdadinput.value);
                    const cost = parseFloat(producto.cost); // Corrección aquí
                    const subtotal = count * cost;
                    const subtotalElement = productDiv.querySelector('.subtotal');
                    subtotalElement.innerHTML = `<h5>Subtotal: ${producto.currency} ${subtotal.toFixed(2)}`; // Corrección aquí

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

           // Recuperar el botón "Realizar Pedido"
    const realizarPedidoButton = document.getElementById("realizar-pedido");

    // Agregar un evento click al botón "Realizar Pedido" para calcular los subtotales
    realizarPedidoButton.addEventListener("click", function (e) {
        e.preventDefault(); // Evita el envío del formulario por defecto
        calcularSubtotales();
    
    });

    // Agregar evento input para calcular el subtotal en función de la cantidad del producto
    const cantidadInputs = document.querySelectorAll('input[data-product-id]');
    cantidadInputs.forEach(function (cantitdadinput) {
        cantitdadinput.addEventListener('input', function () {
            calcularSubtotales(); // Recalcular al cambiar la cantidad
        });
    });

    // Agregar eventos para actualizar el costo de envío al cambiar el método de envío
    const metodoInputsEnvio = document.querySelectorAll('input[name="metodo-envio"]');
    metodoInputsEnvio.forEach(function (input) {
        input.addEventListener("change", function () {
            calcularSubtotales(); // Recalcular al cambiar el método de envío
        });
    });


    // Función para calcular el costo de envío
    function calcularCostoEnvio() {
        const premium = document.getElementById('premium');
        const express = document.getElementById('express');
        const standard = document.getElementById('standard');
        const cartItems = document.querySelectorAll(".card");
        let totalSubtotal = 0;

        cartItems.forEach((productDiv) => {
            const cantitdadinput = productDiv.querySelector('input');
            const count = parseInt(cantitdadinput.value);
            const unitCost = parseFloat(productDiv.querySelector('.col-md-2 h5').textContent.split(" ")[1]);

            if (!isNaN(count) && !isNaN(unitCost)) {
                const subtotal = count * unitCost;
                totalSubtotal += subtotal;
            }
        });

        if (premium.checked) {
            return totalSubtotal * 0.15;
        } else if (express.checked) {
            return totalSubtotal * 0.07;
        } else if (standard.checked) {
            return totalSubtotal * 0.05;
        }
        alert('debes agregar un método de pago'); // Si no se selecciona ningún método de envío
    }

     // Función para calcular los subtotales
     function calcularSubtotales() {
        const cartItems = document.querySelectorAll(".card");
        let totalSubtotal = 0;
        const costoenvio = calcularCostoEnvio();

        cartItems.forEach((productDiv) => {
            const cantitdadinput = productDiv.querySelector('input');
            const count = parseInt(cantitdadinput.value);
            const unitCost = parseFloat(productDiv.querySelector('.col-md-2 h5').textContent.split(" ")[1]);

            if (!isNaN(count) && !isNaN(unitCost)) {
                const subtotal = count * unitCost;
                totalSubtotal += subtotal;
            }
        });

        const totalPagar = totalSubtotal + costoenvio;

        const containersubtotal = document.getElementById("subtotal-container");
        containersubtotal.querySelector("#subtotal").classList.add("text-success"); // Ejemplo de clase de texto de color verde en Bootstrap
        containersubtotal.querySelector("#costo-envio").classList.add("text-success"); // Ejemplo de clase de texto de color azul en Bootstrap
        containersubtotal.querySelector("#total-pagar").classList.add("text-success"); // Ejemplo de clase de texto de color rojo en Bootstrap
        
        
        // Actualizar el contenido de los elementos con clases
        containersubtotal.querySelector("#costos").textContent = `Costos`;
        containersubtotal.querySelector("#subtotal").textContent = `Subtotal: $${totalSubtotal.toFixed(2)}`;
        containersubtotal.querySelector("#costo-envio").textContent = `Costo de envío: $${costoenvio.toFixed(2)}`;
        containersubtotal.querySelector("#total-pagar").textContent = `Total a pagar: $${totalPagar.toFixed(2)}`;
    }
});
});
