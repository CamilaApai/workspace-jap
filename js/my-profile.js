document.addEventListener("DOMContentLoaded", function (e) {
    const enlaceInicioSesion = document.getElementById('inicioSesion').querySelector('a');
    const usuariovalue = localStorage.getItem('usuariovalue');
  
    if (usuariovalue !== null) {
        enlaceInicioSesion.href = "my-profile.html";
        enlaceInicioSesion.textContent = usuariovalue;
    }    });


    function guardarDatos() {
        const primerNombreInput = document.getElementById("validationCustom01");
        const primerApellidoInput = document.getElementById("validationCustom03");
        const telefonoInput = document.getElementById("validationCustom06");
      
        // Verificar la validez de los campos
        const primerNombreValid = primerNombreInput.checkValidity();
        const primerApellidoValid = primerApellidoInput.checkValidity();
        const telefonoValid = telefonoInput.checkValidity();
      
        // Mostrar u ocultar los mensajes de validación personalizados
        if (primerNombreValid) {
          primerNombreInput.classList.remove("is-invalid");
          primerNombreInput.classList.add("is-valid");
        } else {
          primerNombreInput.classList.remove("is-valid");
          primerNombreInput.classList.add("is-invalid");
        }
      
        if (primerApellidoValid) {
          primerApellidoInput.classList.remove("is-invalid");
          primerApellidoInput.classList.add("is-valid");
        } else {
          primerApellidoInput.classList.remove("is-valid");
          primerApellidoInput.classList.add("is-invalid");
        }
      
        if (telefonoValid) {
          telefonoInput.classList.remove("is-invalid");
          telefonoInput.classList.add("is-valid");
        } else {
          telefonoInput.classList.remove("is-valid");
          telefonoInput.classList.add("is-invalid");
        }
      
        // Comprobar si todos los campos obligatorios son válidos
        if (primerNombreValid && primerApellidoValid && telefonoValid) {
          // Los campos obligatorios están completos, puedes guardar los datos en el almacenamiento local.
          localStorage.setItem("primerNombre", primerNombreInput.value);
          localStorage.setItem("primerApellido", primerApellidoInput.value);
          localStorage.setItem("telefono", telefonoInput.value);
      
          alert("Datos guardados correctamente");
        }
      }
      
      
      // Función para cargar los datos al cargar la página
      function cargarDatos() {
        const primerNombre = localStorage.getItem("primerNombre");
        const primerApellido = localStorage.getItem("primerApellido");
        const telefono = localStorage.getItem("telefono");
      
        if (primerNombre) {
          document.getElementById("validationCustom01").value = primerNombre;
        }
        if (primerApellido) {
          document.getElementById("validationCustom03").value = primerApellido;
        }
        if (telefono) {
          document.getElementById("validationCustom06").value = telefono;
        }
      }
      
      // Llama a la función de cargarDatos cuando la página se carga
      window.onload = cargarDatos;
      