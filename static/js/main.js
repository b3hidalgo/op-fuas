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

let contadorFamiliares = 1;

function agregarFamiliar() {
  contadorFamiliares++;
      console.log("Prueba 2");

  const acordeon = document.createElement("div");
  acordeon.classList.add("accordion-item", "mb-1");

  acordeon.innerHTML = `
    <h2 class="accordion-header" id="headingFamiliar${contadorFamiliares}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseFamiliar${contadorFamiliares}" aria-expanded="false"
        aria-controls="collapseFamiliar${contadorFamiliares}">
        Familiar ${contadorFamiliares}
      </button>
    </h2>
    <div id="collapseFamiliar${contadorFamiliares}" class="accordion-collapse collapse"
      aria-labelledby="headingFamiliar${contadorFamiliares}">
      <div class="accordion-body">
        <div class="container-fluid">
            <div class="row g-3 mb-2">
              <div class="col-md-6">
                <label class="form-label">RUT</label>
                <input type="text" class="form-control">
              </div>
              <div class="col-md-6">
                <label class="form-label">Nombres</label>
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="row g-3 mb-2">
              <div class="col-md-6">
                <label class="form-label">Apellido paterno</label>
                <input type="text" class="form-control">
              </div>
              <div class="col-md-6">
                <label class="form-label">Apellido materno</label>
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="row g-3 mb-2">
              <div class="col-md-6">
                <label class="form-label">Parentesco</label>
                <select class="form-select">
                  <option selected disabled>Selecciona...</option>
                  <option>Padre</option>
                  <option>Madre</option>
                  <option>Hermano(a)</option>
                  <option>Otro</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Estado civil</label>
                <select class="form-select">
                  <option selected disabled>Selecciona...</option>
                  <option>Soltero(a)</option>
                  <option>Casado(a)</option>
                  <option>Divorciado(a)</option>
                  <option>Viudo(a)</option>
                </select>
              </div>
            </div>
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label">Actividad</label>
                <select class="form-select">
                  <option selected disabled>Selecciona...</option>
                  <option>Estudiante</option>
                  <option>Trabajador</option>
                  <option>Cesante</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Nivel de estudio</label>
                <select class="form-select">
                  <option selected disabled>Selecciona...</option>
                  <option>Básica</option>
                  <option>Media</option>
                  <option>Superior</option>
                  <option>Postgrado</option>
                </select>
              </div>
            </div>
            

          
          </div>
      </div>
    </div>
  `;

  document.getElementById("acordeon-container").appendChild(acordeon);

   // Crear acordeón de ingresos
  const acordeonIngresos = document.createElement("div");
  acordeonIngresos.classList.add("accordion-item", "mb-1");
  acordeonIngresos.innerHTML = `
    <h2 class="accordion-header" id="headingIngresos${contadorFamiliares}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseIngresos${contadorFamiliares}" aria-expanded="false" aria-controls="collapseIngresos${contadorFamiliares}">
        Familiar ${contadorFamiliares} - Ingresos
      </button>
    </h2>
    <div id="collapseIngresos${contadorFamiliares}" class="accordion-collapse collapse">
      <div class="accordion-body">
        <h5><strong>Año 2024</strong></h5>
        <div class="row">
            <div class="col-md-6 mb-3">
            <label for="sueldos2024" class="form-label">Sueldos</label>
            <input type="number" class="form-control" id="sueldos2024" value="0"/>
            </div>
            <div class="col-md-6 mb-3">
            <label for="pensiones2024" class="form-label">Pensiones</label>
            <input type="number" class="form-control" id="pensiones2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="honorarios2024" class="form-label">Honorarios</label>
            <input type="number" class="form-control" id="honorarios2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="retiros2024" class="form-label">Retiros</label>
            <input type="number" class="form-control" id="retiros2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="dividendos2024" class="form-label">Dividendos por acciones</label>
            <input type="number" class="form-control" id="dividendos2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="intereses2024" class="form-label">Intereses mobiliarios</label>
            <input type="number" class="form-control" id="intereses2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="ganancias2024" class="form-label">Ganancias de capital</label>
            <input type="number" class="form-control" id="ganancias2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="pensionAlimenticia2024" class="form-label">Pensión alimenticia y otros aportes de parientes</label>
            <input type="number" class="form-control" id="pensionAlimenticia2024" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="independiente2024" class="form-label">Actividades independientes</label>
            <input type="number" class="form-control" id="independiente2024" value="0" />
            </div>
        </div>
        <hr>
        <h5><strong>Año 2025</strong></h5>
        <div class="row">
            <div class="col-md-6 mb-3">
            <label for="sueldos2025" class="form-label">Sueldos</label>
            <input type="number" class="form-control" id="sueldos2025" value="0"/>
            </div>
            <div class="col-md-6 mb-3">
            <label for="pensiones2025" class="form-label">Pensiones</label>
            <input type="number" class="form-control" id="pensiones2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="honorarios2025" class="form-label">Honorarios</label>
            <input type="number" class="form-control" id="honorarios2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="retiros2025" class="form-label">Retiros</label>
            <input type="number" class="form-control" id="retiros2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="dividendos2025" class="form-label">Dividendos por acciones</label>
            <input type="number" class="form-control" id="dividendos2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="intereses2025" class="form-label">Intereses mobiliarios</label>
            <input type="number" class="form-control" id="intereses2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="ganancias2025" class="form-label">Ganancias de capital</label>
            <input type="number" class="form-control" id="ganancias2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="pensionAlimenticia2025" class="form-label">Pensión alimenticia y otros aportes de parientes</label>
            <input type="number" class="form-control" id="pensionAlimenticia2025" value="0" />
            </div>
            <div class="col-md-6 mb-3">
            <label for="independiente2025" class="form-label">Actividades independientes</label>
            <input type="number" class="form-control" id="independiente2025" value="0" />
            </div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("acordeon-ingresos-familiares").appendChild(acordeonIngresos);

  // Crear acordeón de condición de salud
  const acordeonSalud = document.createElement("div");
  acordeonSalud.classList.add("accordion-item", "mb-1");
  acordeonSalud.innerHTML = `
    <h2 class="accordion-header" id="headingSalud${contadorFamiliares}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseSalud${contadorFamiliares}" aria-expanded="false" aria-controls="collapseSalud${contadorFamiliares}">
        Familiar ${contadorFamiliares} - Condición de Salud
      </button>
    </h2>
    <div id="collapseSalud${contadorFamiliares}" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div class="row">

  <div class="col-md-6 mb-3">
    <label for="fechaNacimiento" class="form-label">Fecha de nacimiento</label>
    <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento">
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Tiene ceguera o dificultad visual aún usando lentes de forma permanente?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="ceguera" id="cegueraSi" value="si">
      <label class="form-check-label" for="cegueraSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="ceguera" id="cegueraNo" value="no">
      <label class="form-check-label" for="cegueraNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Tiene sordera o dificultad auditiva aún usando audífonos de forma permanente?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="sordera" id="sorderaSi" value="si">
      <label class="form-check-label" for="sorderaSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="sordera" id="sorderaNo" value="no">
      <label class="form-check-label" for="sorderaNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Tiene mudez o dificultad en el habla de forma permanente?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="mudez" id="mudezSi" value="si">
      <label class="form-check-label" for="mudezSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="mudez" id="mudezNo" value="no">
      <label class="form-check-label" for="mudezNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Tiene dificultad física de forma permanente?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="dificultadFisica" id="dificultadFisicaSi" value="si">
      <label class="form-check-label" for="dificultadFisicaSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="dificultadFisica" id="dificultadFisicaNo" value="no">
      <label class="form-check-label" for="dificultadFisicaNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Tiene problemas mentales de forma permanente?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="problemasMentales" id="problemasMentalesSi" value="si">
      <label class="form-check-label" for="problemasMentalesSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="problemasMentales" id="problemasMentalesNo" value="no">
      <label class="form-check-label" for="problemasMentalesNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Tiene problemas psiquiátricos de forma permanente?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="problemasPsiquiatricos" id="problemasPsiquiatricosSi" value="si">
      <label class="form-check-label" for="problemasPsiquiatricosSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="problemasPsiquiatricos" id="problemasPsiquiatricosNo" value="no">
      <label class="form-check-label" for="problemasPsiquiatricosNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Puede salir solo(a) a la calle sin ayuda o compañía?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="salirSolo" id="salirSoloSi" value="si">
      <label class="form-check-label" for="salirSoloSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="salirSolo" id="salirSoloNo" value="no">
      <label class="form-check-label" for="salirSoloNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Puede hacer compras o ir al médico solo(a), sin ayuda o compañía?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="comprasSolo" id="comprasSoloSi" value="si">
      <label class="form-check-label" for="comprasSoloSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="comprasSolo" id="comprasSoloNo" value="no">
      <label class="form-check-label" for="comprasSoloNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Puede bañarse, lavarse los dientes, peinarse o comer solo(a)?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="aseoPersonal" id="aseoPersonalSi" value="si">
      <label class="form-check-label" for="aseoPersonalSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="aseoPersonal" id="aseoPersonalNo" value="no">
      <label class="form-check-label" for="aseoPersonalNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Puede moverse/desplazarse solo(a) dentro de la casa?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="desplazarseCasa" id="desplazarseCasaSi" value="si">
      <label class="form-check-label" for="desplazarseCasaSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="desplazarseCasa" id="desplazarseCasaNo" value="no">
      <label class="form-check-label" for="desplazarseCasaNo">No</label>
    </div>
  </div>

  <div class="col-md-6 mb-3">
    <label class="form-label">¿Puede controlar completamente sus esfínteres?</label><br>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="esfinteres" id="esfinteresSi" value="si">
      <label class="form-check-label" for="esfinteresSi">Sí</label>
    </div>
    <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="esfinteres" id="esfinteresNo" value="no">
      <label class="form-check-label" for="esfinteresNo">No</label>
    </div>
  </div>
</div>

      </div>
    </div>
  `;
  document.getElementById("acordeon-condicion-salud").appendChild(acordeonSalud);
}

function eliminarFamiliar(btn) {
  if (confirm("¿Estás seguro de que deseas eliminar este familiar?")) {
    btn.closest(".accordion-item").remove();
  }
}


function cargarHTML(rutaArchivo, idContenedor) {
  fetch(rutaArchivo)
    .then(response => {
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
      return response.text();
    })
    .then(data => {
      const contenedor = document.getElementById(idContenedor);
      if (contenedor) {
        contenedor.innerHTML = data;
      } else {
        console.warn(`Contenedor con id "${idContenedor}" no encontrado.`);
      }
    })
    .catch(error => console.error(`Error al cargar ${rutaArchivo}:`, error));
}



document.addEventListener("DOMContentLoaded", function () {
  // Cargar secciones del formulario
  cargarHTML("/static/header.html",                         "header-container");
  cargarHTML("/static/formulario/datos-personales.html",    "form-datosPersonales");
  cargarHTML("/static/formulario/datos-familiares.html",    "form-datosFamiliares");
  cargarHTML("/static/formulario/ingresos-familiares.html", "form-ingresosFamiliares");
  cargarHTML("/static/formulario/condicion-salud.html", "form-condicionSalud");
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
  console.log("Redirigiendo a datos familiares");
  ocultarTodo();
  mostrardatosFamiliares()
}

function navdatosPersonales() {
  ocultarTodo();
  mostrardatosPersonales()
}

function navingresosFamiliares() {
  console.log("Redirigiendo a ingresos familiares");
  ocultarTodo();
  mostraringresosFamiliares()
}

function navcondicionSalud() {
  console.log("Redirigiendo a Condicion de Salud");
  ocultarTodo();
  mostrarcondicionSalud()
}


function ocultarTodo() {
  document.getElementById("form-datosPersonales").classList.add("d-none");
  document.getElementById("form-datosFamiliares").classList.add("d-none");
  document.getElementById("form-ingresosFamiliares").classList.add("d-none");
  document.getElementById("form-condicionSalud").classList.add("d-none");

}



function mostraringresosFamiliares(){
document.getElementById("form-ingresosFamiliares").classList.remove("d-none");
}
function mostrardatosPersonales(){
document.getElementById("form-datosPersonales").classList.remove("d-none");
}
function mostrardatosFamiliares() {
  document.getElementById("form-datosFamiliares").classList.remove("d-none");
}
function mostrarcondicionSalud() {
  document.getElementById("form-condicionSalud").classList.remove("d-none");
}


function cargarSeccion() {
  document.getElementById("lblRut").textContent = personales.rut;
  document.getElementById("lblapePaterno").textContent = personales.apePaterno;
  document.getElementById("lblapeMaterno").textContent = personales.apeMaterno;
  document.getElementById("lblnomPostulante").textContent = personales.nomPostulante;
  document.querySelectorAll(".lblNomCompleto").forEach(label => {
  label.textContent = personales.nomPostulante + " " + personales.apePaterno + " " + personales.apeMaterno;});
  document.getElementById("lblciv-estPostulante").textContent = personales.civPostulante;
  document.getElementById("lblniv-estPostulante").textContent = personales.nivPostulante;
  document.getElementById("lblactPostulante").textContent = personales.actPostulante;
  }
let familiarCounter = 1; // Contador global

//function agregarFamiliar() {
  //document.getElementById("accordionFamiliar2").classList.remove("d-none");
 // }

  const container = document.getElementById("acordeon-familiares");

  // Creamos un ID único
  const familiarId = `familiar-${familiarCounter}`;

  // Plantilla del acordeón 
 


function eliminarFamiliar(id) {
  const confirmar = confirm("¿Estás seguro de que deseas eliminar este familiar?");
  if (confirmar) {
    const familiar = document.getElementById(id);
    if (familiar) familiar.remove();
  }
}
