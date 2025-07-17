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

var personales = {};

function guardarDatosPersonales() {

  personales = {
    rut: document.getElementById("rutPostulante").value,
    apePaterno: document.getElementById("ap-paternoPostulante").value,
    apeMaterno: document.getElementById("ap-maternoPostulante").value,
    nomPostulante: document.getElementById("nombresPostulante").value,
    civPostulante: document.getElementById("civ-estPostulante").value,
    nivPostulante: document.getElementById("niv-estPostulante").value,
    actPostulante: document.getElementById("actPostulante").value,
  
  };

  //localStorage.setItem("fuas_personales", JSON.stringify(personales));
  console.log("Datos de postulante: ", personales);
}

function continuarDesdePersonales() {
  console.log("Cargando datos");
  guardarDatosPersonales();
  cargarSeccion();
  ocultarTodo();
  mostrardatosFamiliares();

}

function navdatosPersonales() {
  ocultarTodo();
  mostrardatosPersonales()
}

function navdatosFamiliares() {
  ocultarTodo();
  mostrardatosFamiliares()
}

function navdatosPersonales() {
  ocultarTodo();
  mostrardatosPersonales()
}


function ocultarTodo() {
  document.getElementById("form-datosPersonales").classList.add("d-none");
  document.getElementById("form-datosFamiliares").classList.add("d-none");
}



function mostrardatosFamiliares() {
  document.getElementById("form-datosFamiliares").classList.remove("d-none");
}
function mostrardatosPersonales(){
document.getElementById("form-datosPersonales").classList.remove("d-none");
}


function cargarSeccion() {
  document.getElementById("lblRut").textContent = personales.rut;
  document.getElementById("lblapePaterno").textContent = personales.apePaterno;
  document.getElementById("lblapeMaterno").textContent = personales.apeMaterno;
  document.getElementById("lblnomPostulante").textContent = personales.nomPostulante;
  document.getElementById("lblnomCompleto").textContent = personales.nomPostulante + " " + personales.apePaterno + " " + personales.apeMaterno;
  document.getElementById("lblciv-estPostulante").textContent = personales.civPostulante;
  document.getElementById("lblniv-estPostulante").textContent = personales.nivPostulante;
  document.getElementById("lblactPostulante").textContent = personales.actPostulante;
  }
let familiarCounter = 1; // Contador global

function agregarFamiliar() {
  document.getElementById("accordionFamiliar2").classList.remove("d-none");
  }

  const container = document.getElementById("acordeon-familiares");

  // Creamos un ID único
  const familiarId = `familiar-${familiarCounter}`;

  // Plantilla del acordeón
  const nuevoFamiliar = document.createElement("div");
  nuevoFamiliar.classList.add("accordion-item");
  nuevoFamiliar.id = familiarId;

  nuevoFamiliar.innerHTML = `
    <h2 class="accordion-header">
      <button class="accordion-button collapsed bg-danger text-white fw-bold" type="button"
        data-bs-toggle="collapse" data-bs-target="#collapse-${familiarId}" aria-expanded="false"
        aria-controls="collapse-${familiarId}">
        Familiar ${familiarCounter}
      </button>
    </h2>
    <div id="collapse-${familiarId}" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="row g-3 mb-3">
          <div class="col-md-6">
            <label class="form-label">RUT</label>
            <input type="text" class="form-control" id="rut-${familiarId}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Nombres</label>
            <input type="text" class="form-control" id="nombres-${familiarId}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Apellido paterno</label>
            <input type="text" class="form-control" id="apellidoPaterno-${familiarId}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Apellido materno</label>
            <input type="text" class="form-control" id="apellidoMaterno-${familiarId}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Parentesco</label>
            <select class="form-select" id="parentesco-${familiarId}">
              <option selected>Selecciona...</option>
              <option>Madre</option>
              <option>Padre</option>
              <option>Hermano/a</option>
              <option>Otro</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Estado civil</label>
            <select class="form-select" id="estadoCivil-${familiarId}">
              <option selected>Selecciona...</option>
              <option>Soltero(a)</option>
              <option>Casado(a)</option>
              <option>Otro</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Actividad</label>
            <select class="form-select" id="actividad-${familiarId}">
              <option selected>Selecciona...</option>
              <option>Estudiante</option>
              <option>Trabajador</option>
              <option>Otro</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Nivel de estudio</label>
            <select class="form-select" id="nivelEstudio-${familiarId}">
              <option selected>Selecciona...</option>
              <option>Primaria</option>
              <option>Secundaria</option>
              <option>Superior</option>
            </select>
          </div>
        </div>
        <button class="btn btn-outline-danger btn-sm" onclick="eliminarFamiliar('${familiarId}')">
          <i class="bi bi-x-circle-fill"></i> Eliminar
        </button>
      </div>
    </div>
  `;

  container.appendChild(nuevoFamiliar);

function eliminarFamiliar(id) {
  const confirmar = confirm("¿Estás seguro de que deseas eliminar este familiar?");
  if (confirmar) {
    const familiar = document.getElementById(id);
    if (familiar) familiar.remove();
  }
}
