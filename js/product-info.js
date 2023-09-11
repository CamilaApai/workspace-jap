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
  