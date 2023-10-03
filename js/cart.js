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
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div>
                                <img src="${product.image}" class="img-fluid rounded-3" alt="${product.name}" style="width: 65px;">
                            </div>
                            <div class="ms-3">
                                <h5>${product.name}</h5>
                                <p class="small mb-0">${product.count} unidades</p>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <div style="width: 50px;">
                                <h5 class="fw-normal mb-0">${product.count}</h5>
                            </div>
                            <div style="width: 80px;">
                                <h5 class="mb-0">$${product.unitCost}</h5>
                            </div>
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