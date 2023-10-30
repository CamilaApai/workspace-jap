document.addEventListener("DOMContentLoaded", function (e) {
    const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
    const usuariovalue = localStorage.getItem('usuariovalue');
  
    if (usuariovalue !== null) {
        enlaceInicioSesion.href = "my-profile.html";
        enlaceInicioSesion.textContent = usuariovalue;
    }    });