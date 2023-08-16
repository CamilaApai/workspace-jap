document.addEventListener("DOMContentLoaded", function() {
    let boton = document.getElementById("botoncito");
    let inputUsuario = document.getElementById("inputUsuario"); 
    let inputContraseña = document.getElementById("inputContraseña");
    
    boton.addEventListener("click", function(event) {
        event.preventDefault();
       if ((inputUsuario.value !== "") && (inputContraseña.value !== ""))
       
    { window.location.href = "index.html";} 
else {alert("Necesitas rellenar ambos campos de datos!")}
       
   
    });
    
});