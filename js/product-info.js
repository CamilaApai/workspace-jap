document.addEventListener("DOMContentLoaded", function () {
    const comentariosURL = "https://japceibal.github.io/emercado-api/products_comments/50921.json";
  
    fetch(comentariosURL)
      .then(response => response.json())
      .then(data => {
        // Obtener el elemento contenedor donde se mostrarán las tarjetas de comentarios
        const ulContenedor = document.getElementById('ulContenedor');
  
        // Iterar a través de la lista de comentarios
        data.forEach(comment => {
          // Crear una tarjeta (card) Bootstrap para cada comentario
          const comentarioCard = document.createElement('div');
          comentarioCard.className = 'amarillo mb-3'; 
          
          
  
          // Crear el encabezado de la tarjeta (nombre de usuario y fecha)
          const cardHeader = document.createElement('div');
          cardHeader.className = 'card-header';
          comentarioCard.className = 'amarillo mb-3';
          // Nombre de usuario
          const username = document.createElement('span');
          username.className = 'font-weight-bold';
          username.textContent = comment.user;
          cardHeader.appendChild(username);
          
          // Fecha del comentario
          const commentDate = document.createElement('span');
          commentDate.className = 'float-end text-muted';
          commentDate.textContent = comment.dateTime;
          cardHeader.appendChild(commentDate);
          
          comentarioCard.appendChild(cardHeader);
  
          // Crear el cuerpo de la tarjeta (contenido del comentario)
          const cardBody = document.createElement('div');
          cardBody.className = 'card-body';
          
  
          // Crear un párrafo para el comentario
          const pComment = document.createElement('p');
          pComment.className = 'card-text';
          pComment.textContent = comment.description;
          cardBody.appendChild(pComment);
  
          comentarioCard.appendChild(cardBody);
  
          // Crear el pie de la tarjeta (puntuación)
          const cardFooter = document.createElement('div');
          cardFooter.className = 'card-footer text-muted';
  
          // Crear estrellas para mostrar la puntuación
          const puntuacion = document.createElement('span');
          puntuacion.innerHTML = 'Puntuación: ';
          for (let i = 1; i <= 5; i++) {
            const starIcon = document.createElement('i');
            starIcon.className = `fa fa-star${i <= comment.score ? '' : '-o'}`;
            
            puntuacion.appendChild(starIcon);
          }
          cardFooter.appendChild(puntuacion);
  
          comentarioCard.appendChild(cardFooter);
  
          // Agregar la tarjeta al contenedor de tarjetas
          ulContenedor.appendChild(comentarioCard);
        });
      })
      .catch(err => console.log('Solicitud fallida', err));
  });
  



  

















  //Inicializa un array vacio donde se cargarán los datos recibidos e inicializa una variable
let productsArray = [];
let htmlContentToAppend = "";

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "product-info.html"
}

//Función que recibe un array como parametro
function showProduct(array, i) {
htmlContentToAppend = ""; // Limpia el contenido anterior antes de rellenar el nuevo

let product = array[i];
htmlContentToAppend += `
    <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${product.image}" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4>${product.name} - ${product.currency} ${product.cost}</h4>
                        <p>${product.description}</p>
                    </div>
                    <small class="text-muted">${product.soldCount} artículos vendidos</small>
                </div>
            </div>
        </div>
    </div>
`;

// Después de generar el código HTML para el elemento seleccionado, establece el contenido del contenedor
document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e) {
  getJSONData(autitosURL).then(function(resultObj) {
      if (resultObj.status === "ok") {
          productsArray = resultObj.data.products;
          //showProductsList(productsArray);
          showProduct(productsArray, 0 );
      }
  });
});







