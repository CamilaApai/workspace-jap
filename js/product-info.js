document.addEventListener("DOMContentLoaded", function(e) {
  // se obtiene el prodID almacenado en el almacenamiento local
  const prodID = localStorage.getItem("ProdID");

  if (prodID) {
      // Realiza una solicitud (fetch) a la API con el prodID para obtener los detalles del producto
      const productInfoURL = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

      fetch(productInfoURL)
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {

            document.getElementById("product-title").textContent = data.name;
            document.getElementById("product-description").textContent = data.description;
            document.getElementById("product-price").textContent = `${data.currency} ${data.cost}`;
            document.getElementById("product-category").textContent = `${data.category}`;
            document.getElementById("product-soldCount").textContent = `${data.soldCount}`;

            // Actualiza las imágenes del producto
    const productImagesContainer = document.getElementById("product-images");

    data.images.forEach(function(imageUrl) {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.className = "img-fluid"; // Para que las imágenes sean responsivas
      productImagesContainer.appendChild(imgElement);
    });

 // Después de mostrar la información del producto, obtén y muestra los comentarios
 obtenerYMostrarComentarios(prodID);



          })
          .catch(function(error) {
              console.error("Error al obtener los detalles del producto:", error);
          });
  } else {
      // Maneja el caso en el que no haya un prodID en el almacenamiento local.
      // Puedes mostrar un mensaje de error o redirigir a la página de inicio, por ejemplo.
      alert("hola no funciono")
  }

  function obtenerYMostrarComentarios(prodID) {
    // Realiza una solicitud (fetch) para obtener los comentarios del producto
    const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;


      fetch(comentariosURL)
        .then(response => response.json())
        .then(data => {
          // Obtener el elemento contenedor donde se mostrarán las tarjetas de comentarios
          const ulContenedor = document.getElementById('ulContenedor');
    
          // Iterar a través de la lista de comentarios
          data.forEach(comment => {
            // Crear una tarjeta (card) Bootstrap para cada comentario
            const comentarioCard = document.createElement('div');
            comentarioCard.className = 'card mb-3'; 
            
            
    
            // Crear el encabezado de la tarjeta (nombre de usuario y fecha)
            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header';
            // comentarioCard.className = 'card mb-3';
            // Nombre de usuario
            const username = document.createElement('h6');
            username.className = 'card-subtitle text-muted';
            username.textContent = comment.user;
            cardHeader.appendChild(username);
            
            // Fecha del comentario
            const commentDate = document.createElement('small');
            commentDate.className = 'text-muted float-end';
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
            const puntuacion = document.createElement('p');
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
    
      }});