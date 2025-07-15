function inicializarDatosPersonales() {
  const selectNac = document.getElementById("nacionalidad");
  const campoPueblo = document.getElementById("campo-pueblo");
  const campoExtranjero = document.getElementById("campo-extranjero");

  if (!selectNac) return;

  selectNac.addEventListener("change", function () {
    const val = this.value;
    campoPueblo.classList.add("d-none");
    campoExtranjero.classList.add("d-none");

    if (val === "chilena") {
      campoPueblo.classList.remove("d-none");
    } else if (val === "extranjera") {
      campoExtranjero.classList.remove("d-none");
    }
  });
}



document.addEventListener("DOMContentLoaded", function () {
  fetch("/static/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;
    })
    .catch(error => console.error("Error cargando header:", error));
});



document.addEventListener("DOMContentLoaded", function () {
  fetch("/static/formulario/datos-personales.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("form-datosPersonales").innerHTML = data;

      // Esperamos brevemente para que los elementos estén cargados en el DOM
      setTimeout(() => {
        inicializarDatosPersonales();
      }, 50);
    });
});



document.addEventListener("DOMContentLoaded", function () {
  fetch("/static/formulario/datos-familiares.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("form-datosFamiliares").innerHTML = data;
    })
    .catch(error => console.error("Error cargando header:", error));
});


function guardarDatosPersonales() {
  const personales = {
    rut: document.getElementById("rutPostulante").value,
    nombres: document.getElementById("nombresPostulante").value,
    apellidoPaterno: document.getElementById("ap-paternoPostulante").value,
    apellidoMaterno: document.getElementById("ap-maternoPostulante").value,
    correo: document.getElementById("emailPostulante").value,
    fechaNacimiento: document.getElementById("fech-nacPostulante").value,
    estadoCivil: document.getElementById("est-civilPostulante").value,
    nacionalidad: document.getElementById("nacionalidad").value,
    puebloOriginario: document.getElementById("p-origPostulante")?.value || "",
    paisOrigen: document.getElementById("nac-extPostulante")?.value || "",
    pasaporte: document.getElementById("pasapPostulante")?.value || "",
    nivelEstudio: document.getElementById("niv-est-Postulante").value,
    actividad: document.getElementById("act-extPostulante").value,
    telefonoFijo: document.getElementById("numtelPostulante").value,
    celular: document.getElementById("numcelPostulante").value,
    direccion: document.getElementById("direcPostulante").value,
    numero: document.getElementById("num-direcPostulante").value,
    departamento: document.getElementById("depPostulante").value,
    poblacion: document.getElementById("pobPostulante").value,
    region: document.getElementById("regPostulante").value,
    comuna: document.getElementById("comPostulante").value,
    tipoEstablecimiento: document.getElementById("establecimientoPostulante").value,
    nem: document.getElementById("nemPostulante").value,
    institucion: document.getElementById("institucion").value,
    anioMatricula: document.getElementById("anio-matriculaPostulante").value,
    ahorroEducacion: document.getElementById("ahorroSi").checked ? "sí" : document.getElementById("ahorroNo").checked ? "no" : "",
    mediaCompletaChile: document.getElementById("mediaSi").checked ? "sí" : document.getElementById("mediaNo").checked ? "no" : ""
  };

  localStorage.setItem("fuas_personales", JSON.stringify(personales));
}

function continuarDesdePersonales() {
  guardarDatosPersonales();
  cargarSeccion("datos-familiares");
}

