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
        

        let usuarioInicioSesion = localStorage.getItem("usuarioInicioSesion");
    
        if (!usuarioInicioSesion) {
            window.location.href = "login.html"; 
        }
    
       
        const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
        const usuariovalue = localStorage.getItem('usuariovalue');
        if (usuariovalue !== null) {
            enlaceInicioSesion.href = "my-profile.html" 
            enlaceInicioSesion.textContent = usuariovalue;
        }
    
    });
    
    
    // Agrega un evento de click para cerrar sesión.
    const cerrarSesionLink = document.getElementById("cerrarSesion");
    cerrarSesionLink.addEventListener("click", function(event) {
        // Evita que el evento predeterminado del clic se produzca.
        event.preventDefault();
    
        // Elimina la información de autenticación del localStorage.
        localStorage.removeItem("usuarioInicioSesion");
        localStorage.removeItem("usuariovalue");
    
        // Redirecciona a la página de inicio de sesión (login.html).
        window.location.href = "login.html";

        const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
        const usuariovalue = localStorage.getItem('usuariovalue');
        if (usuariovalue !== null) {
            enlaceInicioSesion.href = "my-profile.html" 
            enlaceInicioSesion.textContent = usuariovalue;
        }
// Agrega un evento de click para cerrar sesión.
const cerrarSesionLink = document.getElementById("cerrarSesion");
cerrarSesionLink.addEventListener("click", function(event) {
    // Evita que el evento predeterminado del clic se produzca.
    event.preventDefault();

    // Elimina la información de autenticación del localStorage.
    localStorage.removeItem("usuarioInicioSesion");
    localStorage.removeItem("usuariovalue");

    // Redirecciona a la página de inicio de sesión (login.html).
    window.location.href = "login.html";
});


// Función de modo día/noche
  document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
  
    // Obtiene el estado actual del modo día/noche usando localStorage
    const currentMode = localStorage.getItem('mode') || 'light';
  
    // Aplica el estado almacenado
    if (currentMode === 'dark') {
      body.classList.add("noche");
    }
  
    // Evento para cambiar entre día y noche 
    const modoToggle = document.getElementById('modo-toggle');
    modoToggle.addEventListener('click', function() {
      body.classList.toggle('noche');
  
      // Actualiza el estado en el localStorage
      localStorage.setItem('mode', currentMode === 'light' ? 'dark' : 'light');
    });
  });


    })


    .catch((error) => {
        console.error("Error al cargar el carrito:", error);
    });