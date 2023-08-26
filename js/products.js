//Inicializa un array vacio donde se cargarán los datos recibidos e inicializa una variable
let productsArray = [];
<<<<<<< HEAD
let htmlContentToAppend = "";
//Función que recibe un array como parametro
=======

function setCatID(id) {
    localStorage.setItem("catID", id);
}

//función que recibe un array con los datos, y los muestra en pantalla a través del DOM
>>>>>>> main
function showProductsList(array){
//Recorre el array y le concatena la info de los elementos requeridos del array de objetos "products" a htmlContentToAppend por cada valor de i
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
        //Busca con el dom el elemento con id cat-list-container y muestra dentro de él lo que contiene htmlContentToAppend
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    
    }
}
     

<<<<<<< HEAD


//Una vez que carga la página se usa getJSONData(autitosURL) para obtener la lista de autos
=======
// Una vez quese carga la página se llama a getJSONData() pasándole por parámetro la constante que contiene la url del json para obtener la lista de autos.
>>>>>>> main
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(autitosURL).then(function(resultObj){
      //Se verifica el estado del objeto que devuelve, y si es correcto, se cargan los datos en productsArray
        if (resultObj.status === "ok")
        {
          //Ahora productsArray va a contener la información de los autos
            productsArray = resultObj.data.products;
            //Se llama a showProductsList() pasándole por parámetro productsArray
             showProductsList(productsArray);
        }
    });
});







