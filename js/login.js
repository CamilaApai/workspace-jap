document.addEventListener("DOMContentLoaded", function() {
    let boton = document.getElementById("botoncito");
    let inputUsuario = document.getElementById("inputUsuario");
    let inputContraseña = document.getElementById("inputContraseña");
    let alertaMostrada = false;

    boton.addEventListener("click", function(event) {
        validarIngreso();
        event.preventDefault();
    });

    function validarIngreso() {
        const nombreInput = document.getElementById("inputUsuario");
        const nombrevalue = nombreInput.value;
        const contraInput = document.getElementById("inputContraseña");
        const contravalue = contraInput.value;

        if (nombrevalue === "") {
            nombreInput.setCustomValidity("Por favor, ingresa el nombre de usuario.");
            nombreInput.classList.add("is-invalid");
        } else {
            nombreInput.setCustomValidity("");
            nombreInput.classList.remove("is-invalid");
            nombreInput.classList.add("is-valid");
        }

        if (contravalue === "") {
            contraInput.setCustomValidity("Por favor, ingresa la contraseña.");
            contraInput.classList.add("is-invalid");
        } else {
            contraInput.setCustomValidity("");
            contraInput.classList.remove("is-invalid");
            contraInput.classList.add("is-valid");
        }

        // Verifica si ambos campos tienen valores no vacíos
        if (nombrevalue !== "" && contravalue !== "") {
            // Almacena en el almacenamiento local (localStorage) un indicador de que el usuario inició sesión
            localStorage.setItem("usuarioInicioSesion", "true");
            localStorage.setItem('usuariovalue', nombrevalue);
            
            // Redirige al usuario a la página "index.html"
            window.location.href = "index.html";
        }
    }
});
