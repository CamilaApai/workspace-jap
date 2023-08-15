document.addEventListener("DOMContentLoaded", function() {
    let boton = document.getElementById("botoncito");
    let inputUsuario = document.getElementById("inputUsuario"); 
    let inputContraseña = document.getElementById("inputContraseña");
    
    boton.addEventListener("click", function() {
       if ((inputContraseña.value && inputUsuario.value) !== "")
       { window.location.href = "index.html";}
       
   
    });
    
   
});