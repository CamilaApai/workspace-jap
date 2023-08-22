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
        enlaceInicioSesion.href = "login.html" 
        enlaceInicioSesion.textContent = usuariovalue;
    }

});