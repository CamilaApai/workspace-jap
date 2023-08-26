//array donde se cargarán los datos recibidos:
let productsArray = [];

function setCatID(id) {
    localStorage.setItem("catID", id);
}

//función que recibe un array con los datos, y los muestra en pantalla a través del DOM
function showProductsList(array){
    let htmlContentToAppend = "";
//recorre el array y va agregando la info en distintas "tarjetas" de los autos en htmlContentToAppend, la información que se ve de dichos autos son la foto de cada uno, el precio, tipo de moneda, nombre, descripción y cuántos fueron vendidos.
    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `

        <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.image + `" alt="product image" class="img-thumbnail">
                   
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ products.name + ` - `+ products.currency + ` `+ products.cost + `  </h4> 
                        <p> `+ products.description +`</p> 
                        </div>
                        <small class="text-muted">` + products.soldCount + ` artículos vendidos</small> 
                         
                    </div>

                </div>
            </div>
        </div>
      
        `
        // busca con el dom el elemento con id cat-list-container y muestra dentro de él lo que contiene htmlContentToAppend (las tarjetas con la info de los autos)
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    
    }
}
     

// Una vez quese carga la página se llama a getJSONData() pasándole por parámetro la constante que contiene la url del json para obtener la lista de autos.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(autitosURL).then(function(resultObj){
      // Se verifica el estado del objeto que devuelve, y si es correcto, se cargan los datos en productsArray.
        if (resultObj.status === "ok")
        {
          //ahora productsArray va a contener la información de los autos
            productsArray = resultObj.data.products;
            // se llama a showProductsList() pasándole por parámetro productsArray.
            showProductsList(productsArray);
        }
    });
});







