// Espera a que el DOM esté completamente cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function() {
    // Obtiene la referencia al elemento del botón mediante su ID.
    let boton = document.getElementById("botoncito");
    // Obtiene la referencia al campo de entrada del usuario mediante su ID.
    let inputUsuario = document.getElementById("inputUsuario"); 
    // Obtiene la referencia al campo de entrada de la contraseña mediante su ID.
    let inputContraseña = document.getElementById("inputContraseña");
    
    // Agrega un evento de clic al botón.
    boton.addEventListener("click", function(event) {
        // Evita que el evento predeterminado del clic del botón se produzca (en este caso, el envío del formulario).
        event.preventDefault();

        // Comprueba si ambos campos, de usuario y contraseña, no están vacíos.
        if ((inputUsuario.value !== "") && (inputContraseña.value !== "")) {
            // Si ambos campos están completos, redirige al usuario a la página "index.html".
            window.location.href = "index.html";
        } else {
            // Si al menos uno de los campos está vacío, muestra una alerta para informar al usuario.
            alert("Necesitas rellenar ambos campos de datos!");
        }
    });
});
