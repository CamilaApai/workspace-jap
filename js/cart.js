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
        
    }});

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
                        <div class="col-md-3">
                            <img src="${product.image}" class="img-fluid rounded-3" alt="${product.name}" style="width: 65px;">
                            <h5>${product.name}</h5>
                        </div>
                        <div class="col-md-2">
                            <h5>$${product.unitCost}</h5>
                        </div>
                        <div class="col-md-2">
                        <input type="number" class="form-control" value="${product.count}" min="1">
                        </div>
                        <div class="col-md-2">
                            <h5>$${product.unitCost * product.count}</h5>
                        </div>
                        <div class="col-md-3">
                            <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                        </div>
                    </div>
                </div>
            `;
        
            cartItemsContainer.appendChild(productDiv);
        });
        

        
    })


    .catch((error) => {
        console.error("Error al cargar el carrito:", error);
    });


    