document.addEventListener("DOMContentLoaded",function(){
   
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
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
  