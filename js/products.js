//Inicializa un array vacio donde se cargarán los datos recibidos e inicializa una variable
let productsArray = [];
let htmlContentToAppend = "";

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "product-info.html"
}

//Función que recibe un array como parametro
function showProductsList(array) {
    htmlContentToAppend = ""; // Limpia el contenido anterior antes de rellenar el nuevo
    for (let i = 0; i < array.length; i++) {
        let products = array[i];
        htmlContentToAppend += `
        <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${products.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>${products.name} - ${products.currency} ${products.cost}</h4>
                            <p>${products.description}</p>
                        </div>
                        <small class="text-muted">${products.soldCount} artículos vendidos</small>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    // Después de recorrer el array y crear el nuevo contenido, establece el contenido del contenedor
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(autitosURL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);

            // Resto del código para filtros y orden

            // Buscador en tiempo real
            const searchInput = document.getElementById("searchInput");
            searchInput.addEventListener("input", function() {
                const searchText = searchInput.value.trim().toLowerCase();
                const filteredProducts = productsArray.filter(function(product) {
                    const titleMatch = product.name.toLowerCase().includes(searchText);
                    const descriptionMatch = product.description.toLowerCase().includes(searchText);
                    return titleMatch || descriptionMatch;
                });
                showProductsList(filteredProducts);
            });
        }
    });
});


// Evento que se ejecuta cuando la página se ha cargado completamente
document.addEventListener("DOMContentLoaded", function(e) {
    // Obtiene los datos de productos usando la función getJSONData
    getJSONData(autitosURL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            // Almacena los productos en el array productsArray
            productsArray = resultObj.data.products;

            // Muestra la lista de productos por defecto al cargar la página
            showProductsList(productsArray);

            document.getElementById("applyFilterBtn").addEventListener("click", function() {
                const minPrice = parseFloat(document.getElementById("minPrice").value);
                const maxPrice = parseFloat(document.getElementById("maxPrice").value);
            
                if (!isNaN(minPrice) || !isNaN(maxPrice)) {
                    // Filtra los productos según el rango de precio
                    const filteredProducts = productsArray.filter(function(product) {
                        // Verifica si al menos uno de los valores de precio es válido
                        const isMinPriceValid = isNaN(minPrice) || product.cost >= minPrice;
                        const isMaxPriceValid = isNaN(maxPrice) || product.cost <= maxPrice;
                        
                        return isMinPriceValid && isMaxPriceValid;
                    });
            
                    // Muestra la lista de productos filtrados
                    showProductsList(filteredProducts);
                }
            });

            // Ordenar por precio ascendente
            document.getElementById("ascPriceBtn").addEventListener("click", function() {
                // Copia y ordena el array de productos por precio ascendente
                const sortedProducts = productsArray.slice().sort(function(a, b) {
                    return a.cost - b.cost;
                });

                // Muestra la lista de productos ordenados
                showProductsList(sortedProducts);
            });

            // Ordenar por precio descendente
            document.getElementById("descPriceBtn").addEventListener("click", function() {
                // Copia y ordena el array de productos por precio descendente
                const sortedProducts = productsArray.slice().sort(function(a, b) {
                    return b.cost - a.cost;
                });

                // Muestra la lista de productos ordenados
                showProductsList(sortedProducts);
            });

            // Ordenar por relevancia descendente (vendidos)
            document.getElementById("descRelevanceBtn").addEventListener("click", function() {
                // Copia y ordena el array de productos por relevancia descendente
                const sortedProducts = productsArray.slice().sort(function(a, b) {
                    return b.soldCount - a.soldCount;
                });

                // Muestra la lista de productos ordenados
                showProductsList(sortedProducts);
            });
        }
    });
});






