document.addEventListener("DOMContentLoaded", function (e) {
  const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
    const usuariovalue = localStorage.getItem('usuariovalue');
    if (usuariovalue !== null) {
        enlaceInicioSesion.href = "my-profile.html" 
        enlaceInicioSesion.textContent = usuariovalue;
    }
 
    // se obtiene el prodID almacenado en el almacenamiento local
    const prodID = localStorage.getItem("ProdID");
  
    if (prodID) {
      // Realiza una solicitud (fetch) a la API con el prodID para obtener los detalles del producto
      const producotInfoURL = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
  
      fetch(producotInfoURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          document.getElementById("producto-titulo").textContent = data.name;
          document.getElementById("producto-descripcion").textContent =
            data.description;
          document.getElementById(
            "producto-precio"
          ).textContent = `${data.currency} ${data.cost}`;
          document.getElementById(
            "producto-categoria"
          ).textContent = `${data.category}`;
          document.getElementById(
            "producto-vendidos"
          ).textContent = `${data.soldCount}`;
  
          // Actualiza las imágenes del producto
          const contenedorImagenes = document.getElementById("product-images");
  
          // Crea un div con la clase "row" para envolver las imágenes
          const rowDiv = document.createElement("div");
          rowDiv.className = "row";
  
          data.images.forEach(function (imageUrl) {
            // Crea un div con la clase "col" para cada imagen
            const colDiv = document.createElement("div");
            colDiv.className = "col";
  
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.className = "img-fluid"; // Para que las imágenes sean responsive
  
            colDiv.appendChild(imgElement);
            rowDiv.appendChild(colDiv);
          });
  
          // Agrega la fila de imágenes al contenedor de imágenes del producto
          contenedorImagenes.appendChild(rowDiv);
  
          // Después de mostrar la información del producto, obtiene y muestra los comentarios
          obtenerYMostrarComentarios(prodID);

           //consigo el objeto relatedProducts del json y lo almaceno en una cte llamada relacionados
          const relacionados = data.relatedProducts;
//hago una funcion para conseguir el id del producto relacionado y que me redirija al product-info
          function ParallevarmeaproductinfoREL(id) {
            // almaceno el ID del producto relacionado en el localstorage 
            localStorage.setItem("ProdID", id); 
            //que me redirija a product-ifno
            window.location.href = "product-info.html";
          }

          const divrleated = document.getElementById('aCAVANLOSRELACIONADOS');
          //hago un for para que recorra el array de productos relacionados (solo tiene dos productos relacionados)
          for (let i = 0; i < relacionados.length; i++) {
            //deifno productorelacionado segun el lugar del array 
            const productoRelacionado = relacionados[i];

            const divcard = document.createElement('div');
            divcard.classList.add('card');
            divcard.id = `divcardREL${i}`;

            const Titulo = document.createElement('p');
            Titulo.textContent = productoRelacionado.name;
            Titulo.classList.add('tituloRel');
        
            const imagenproductorelacionado = document.createElement('img');
            imagenproductorelacionado.src = productoRelacionado.image;
            imagenproductorelacionado.classList.add('card-body');
        
            // se agrega el onclick y se le pasa el id del producto como parametro de la funcion parallevarmeaproductinforel
            divcard.onclick = function () {
              ParallevarmeaproductinfoREL(productoRelacionado.id);
            };

            divrleated.appendChild(divcard);
            divcard.appendChild(Titulo);
            divcard.appendChild(imagenproductorelacionado);
          }

        })
        
        .catch(function (error) {
          console.error("Error al obtener los detalles del producto:", error);
        });
    } else {
      // Maneja el caso en el que no haya un prodID en el almacenamiento local.
      alert("No funcionó");
    }
  
      // Función para obtener y mostrar los comentarios
    function obtenerYMostrarComentarios(prodID) {
      // Realiza una solicitud (fetch) para obtener los comentarios del producto
      const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
  
      fetch(comentariosURL)
        .then((response) => response.json())
        .then((data) => {
          // Obtiene el elemento contenedor donde se mostrarán las tarjetas de comentarios
          const ulContenedor = document.getElementById("ulContenedor");
  
          // Itera a través de la lista de comentarios
          data.forEach((comment) => {
            // Crea una tarjeta (card) para cada comentario
            const comentarioCard = document.createElement("div");
            comentarioCard.className = "card mb-3";
  
            // Crea el encabezado de la tarjeta (nombre de usuario y fecha)
            const cardHeader = document.createElement("div");
            cardHeader.className = "card-header";
            // comentarioCard.className = 'card mb-3';
            // Nombre de usuario
            const username = document.createElement("h6");
            username.className = "card-subtitle text-muted";
            username.textContent = comment.user;
            cardHeader.appendChild(username);
  
            // Fecha del comentario
            const commentDate = document.createElement("small");
            commentDate.className = "text-muted float-end";
            commentDate.textContent = comment.dateTime;
            cardHeader.appendChild(commentDate);
  
            comentarioCard.appendChild(cardHeader);
  
            // Crea el cuerpo de la tarjeta (contenido del comentario)
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
  
            // Crear un párrafo para el comentario
            const pComment = document.createElement("p");
            pComment.className = "card-text";
            pComment.textContent = comment.description;
            cardBody.appendChild(pComment);
  
            comentarioCard.appendChild(cardBody);
  
            // Crea el pie de la tarjeta (puntuación)
            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer text-muted";
  
            // Crea estrellas para mostrar la puntuación
            const puntuacion = document.createElement("p");
            puntuacion.innerHTML = "Puntuación: ";
            for (let i = 1; i <= 5; i++) {
              const starIcon = document.createElement("i");
              starIcon.className = `fa fa-star${i <= comment.score ? "" : "-o"}`;
  
              puntuacion.appendChild(starIcon);
            }
            cardFooter.appendChild(puntuacion);
  
            comentarioCard.appendChild(cardFooter);
  
            // Agrega la tarjeta al contenedor de tarjetas
            ulContenedor.appendChild(comentarioCard);
          });
        })
        .catch((err) => console.log("Solicitud fallida", err));
    }

 // Agrega un evento 'submit' al formulario de comentarios
 const commentForm = document.getElementById("commentForm");
 commentForm.addEventListener("submit", function (event) {
   event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

   // Obtener el comentario y la puntuación ingresados por el usuario
   const comentario = document.getElementById("exampleFormControlTextarea1").value;
   const puntuacion = document.getElementById("puntuacionID").value;

// Obtener el nombre de usuario del localStorage
const nombreDeUsuario = localStorage.getItem('usuariovalue');



   // Crear un nuevo comentario en forma de objeto
const nuevoComentario = {
 user: nombreDeUsuario, // Utilizar el nombre de usuario obtenido del localStorage
 description: comentario,
 score: parseInt(puntuacion),
 dateTime: new Date().toLocaleString(),
};

    // Lógica para agregar el nuevo comentario a la lista de comentarios mostrados
    agregarNuevoComentario(nuevoComentario);

    // Limpiar el formulario después de agregar el comentario
    commentForm.reset();
  });

   // Función para agregar el nuevo comentario a la lista de comentarios
 function agregarNuevoComentario(comentario) {
   // Obtener el elemento contenedor donde se mostrarán las tarjetas de comentarios
   const ulContenedor = document.getElementById("ulContenedor");

   // Crear una tarjeta (card) Bootstrap para el nuevo comentario
   const comentarioCard = document.createElement("div");
   comentarioCard.className = "card mb-3";

   // Crear el encabezado de la tarjeta (nombre de usuario y fecha)
   const cardHeader = document.createElement("div");
   cardHeader.className = "card-header";

   // Nombre de usuario
   const username = document.createElement("h6");
   username.className = "card-subtitle text-muted";
   username.textContent = comentario.user;
   cardHeader.appendChild(username);

   // Fecha del comentario
   const commentDate = document.createElement("small");
   commentDate.className = "text-muted float-end";
   commentDate.textContent = comentario.dateTime;
   cardHeader.appendChild(commentDate);

   comentarioCard.appendChild(cardHeader);

   // Crear el cuerpo de la tarjeta (contenido del comentario)
   const cardBody = document.createElement("div");
   cardBody.className = "card-body";

   // Crear un párrafo para el comentario
   const pComment = document.createElement("p");
   pComment.className = "card-text";
   pComment.textContent = comentario.description;
   cardBody.appendChild(pComment);

   comentarioCard.appendChild(cardBody);

   // Crear el pie de la tarjeta (puntuación)
   const cardFooter = document.createElement("div");
   cardFooter.className = "card-footer text-muted";

   // Crear estrellas para mostrar la puntuación
   const puntuacion = document.createElement("p");
   puntuacion.innerHTML = "Puntuación: ";
   for (let i = 1; i <= 5; i++) {
     const starIcon = document.createElement("i");
     starIcon.className = `fa fa-star${i <= comentario.score ? "" : "-o"}`;

     puntuacion.appendChild(starIcon);
   }
   cardFooter.appendChild(puntuacion);

   comentarioCard.appendChild(cardFooter);

   // Agregar la tarjeta al contenedor de tarjetas
   ulContenedor.appendChild(comentarioCard);
 }
    
  });
  