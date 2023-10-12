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
});

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

            // Agregar evento input para calcular el subtotal en función de la cantidad
            const inputQuantity = productDiv.querySelector('input');
            inputQuantity.addEventListener('input', function () {
                const count = parseInt(inputQuantity.value);
                const unitCost = product.unitCost;
                const subtotal = count * unitCost;
                const subtotalElement = productDiv.querySelector('.subtotal');
                subtotalElement.innerHTML = `<h5>$${subtotal}</h5>`;
            });
        });
    })
    .catch((error) => {
        console.error("Error al cargar el carrito:", error);
    });