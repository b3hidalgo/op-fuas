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

// ... (todo tu JS de UI, acordeones y helpers existente) ...

function agregarFamiliar() {
  familiarCounter ++
  console.log("Creando acordeón de salud")
  const acordeonSalud = document.createElement("div");
  acordeonSalud.className = "accordion-item";
  acordeonSalud.innerHTML = `
    <h2 class="accordion-header" id="headingCondSalud${familiarCounter}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCondSalud${familiarCounter}" aria-expanded="false" aria-controls="collapseCondSalud${familiarCounter}">
        Familiar ${familiarCounter}
      </button>
    </h2>
    <div id="collapseCondSalud${familiarCounter}" class="accordion-collapse collapse" aria-labelledby="headingCondSalud${familiarCounter}" data-bs-parent="#acordeon-condicion-salud">
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
                <label class="form-label">Relación con el postulante</label>
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
                  <option>Técnico</option>
                </select>
              </div>
            </div>
            <div class="row g-3 mb-2">
              <div class="col-md-12">
                <label class="form-label">Antecedentes de salud</label>
                <textarea class="form-control" rows="3" placeholder="Describe la condición de salud del familiar..."></textarea>
              </div>
            </div>
            <div class="row g-3 mb-2">
              <div class="col-md-6 mb-3">
                <label class="form-label">¿Se puede desplazar dentro del hogar?</label><br>
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
    </div>
  `;
  document.getElementById("acordeon-condicion-salud").appendChild(acordeonSalud);
}

function eliminarFamiliar(btn) {
  if (confirm("¿Estás seguro de que deseas eliminar este familiar?")) {
    btn.closest(".accordion-item").remove();
  }
}

// ... (más código de tus módulos y navegación) ...

// --------------------------
// Carga de HTMLs de las secciones
// --------------------------
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

        // Inicializadores por sección (post-inyección)
        try {
          switch (idContenedor) {
            case "form-ingresosFamiliares":
              if (typeof window.initIngresosFamiliaresMatriz === "function") window.initIngresosFamiliaresMatriz();
              break;
            case "form-datosPersonales":
              if (typeof window.inicializarDatosPersonales === "function") window.inicializarDatosPersonales();
              break;
            case "form-datosFamiliares":
              // si tienes un init específico, llámalo aquí
              break;
            case "form-condicionSalud":
              // si tienes un init específico, llámalo aquí
              break;
          }
        } catch (e) {
          console.warn("Init sección falló:", e);
        }

      } else {
        console.warn(`Contenedor con id "${idContenedor}" no encontrado.`);
      }
    })
    .catch(error => console.error(`Error al cargar ${rutaArchivo}:`, error));
}

// --------------------------
// Inicio global
// --------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Cargar secciones del formulario
  cargarHTML("/static/header.html",                         "header-container");
  cargarHTML("/static/formulario/datos-personales.html",    "form-datosPersonales");
  cargarHTML("/static/formulario/datos-familiares.html",    "form-datosFamiliares");
  cargarHTML("/static/formulario/ingresos-familiares.html", "form-ingresosFamiliares");
  cargarHTML("/static/formulario/condicion-salud.html",     "form-condicionSalud");
  // Tooltips delegados
  initTooltipsDelegados();
});

var personales = {};

function guardarDatosPersonales() {

  personales = {
    rut: document.getElementById("rutPostulante").value,
    apePaterno: document.getElementById("ap-paternoPostulante").value,
    apeMaterno: document.getElementById("ap-maternoPostulante").value,
    nomPostulante: document.getElementById("nombresPostulante").value,
    civPostulante: document.getElementById("civPostulante").value,
    nivPostulante: document.getElementById("nivPostulante").value,
    actPostulante: document.getElementById("actPostulante").value
  };

  // Mostrar datos en labels
  cargarSeccion();

  // Navegación
  navdatosPersonales();
}

function cargarSeccion() {
  document.getElementById("lblRut").textContent = personales.rut;
  document.getElementById("lblapePaterno").textContent = personales.apePaterno;
  document.getElementById("lblapeMaterno").textContent = personales.apeMaterno;
  document.getElementById("lblnomPostulante").textContent = personales.nomPostulante;
  document.querySelectorAll(".lblNomCompleto").forEach(label => {
    label.textContent = personales.nomPostulante + " " + personales.apePaterno + " " + personales.apeMaterno;
  });
  document.getElementById("lblciv-estPostulante").textContent = personales.civPostulante;
  document.getElementById("lblniv-estPostulante").textContent = personales.nivPostulante;
  document.getElementById("lblactPostulante").textContent = personales.actPostulante;
}


function mostrardatosPersonales() {
  document.getElementById("form-datosPersonales").classList.remove("d-none");
}
function mostrardatosFamiliares() {
  document.getElementById("form-datosFamiliares").classList.remove("d-none");
}
function mostraringresosFamiliares() {
  document.getElementById("form-ingresosFamiliares").classList.remove("d-none");
}
function mostrarcondicionSalud() {
  document.getElementById("form-condicionSalud").classList.remove("d-none");
}

function ocultarTodo() {
  document.getElementById("form-datosPersonales").classList.add("d-none");
  document.getElementById("form-datosFamiliares").classList.add("d-none");
  document.getElementById("form-ingresosFamiliares").classList.add("d-none");
  document.getElementById("form-condicionSalud").classList.add("d-none");
}

function navdatosPersonales() {
  ocultarTodo();
  mostrardatosPersonales();
}
function navdatosFamiliares() {
  ocultarTodo();
  mostrardatosFamiliares();
}
function navingresosFamiliares() {
  ocultarTodo();
  mostraringresosFamiliares();
}
function navcondicionSalud() {
  ocultarTodo();
  mostrarcondicionSalud();
}

function ocultarCondicionHeader(){
  document.getElementById('condicionSaludhead').classList.add("d-none");
}

// --------------------------
// Tooltips con delegación (global)
// --------------------------
function initTooltipsDelegados() {
  if (typeof bootstrap === "undefined" || !bootstrap.Tooltip) return;
  new bootstrap.Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
    container: "body",
    trigger: "hover focus"
  });
}

// =====================================================
/* MÓDULO: Ingresos Familiares (matriz + subtotales, robusto) */
// =====================================================
(function () {
  const ROOT_ID = "ingresos-familiares-matriz";
  const KEY_PREFIX = "fuas.ingresosMatriz."; // por miembro

  // Si ya tienes el miembro actual en tu app, setéalo en window.currentMemberId
  function currentMemberId() {
    return window.currentMemberId || "postulante";
  }

  // --- Helpers ---
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);
  const toNum = (v) => Number(String(v || 0).replace(/[^\d.-]/g, "")) || 0;
  const clp = (n) => "$" + Number(n || 0).toLocaleString("es-CL");

  // ==== PARCHE ROBUSTEZ (Ing. Familiares): tolerante a nodos faltantes ====
  const qsa_safe = (sel, root) => (root ? Array.from(root.querySelectorAll(sel)) : []);
  const $_safe  = (sel, root) => (root ? root.querySelector(sel) : null);

  function computeYearSubtotal(yearContainer) {
    if (!yearContainer) return 0;
    let subtotal = 0;
    qsa_safe("input.igf-input", yearContainer).forEach(inp => {
      subtotal += toNum(inp.value);
    });
    return subtotal;
  }

  function updateSubtotals() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return; // aún no se inyecta esta vista, salimos sin romper

    const y2024 = root.querySelector('[data-year="2024"]');
    const y2025 = root.querySelector('[data-year="2025"]');

    const s2024 = computeYearSubtotal(y2024);
    const s2025 = computeYearSubtotal(y2025);
    const g     = s2024 + s2025;

    const el2024 = $_safe("#igf-subtotal-2024", root);
    const el2025 = $_safe("#igf-subtotal-2025", root);
    const elGlob = $_safe("#igf-subtotal-global", root);

    if (el2024) el2024.textContent = clp(s2024);
    if (el2025) el2025.textContent = clp(s2025);
    if (elGlob) elGlob.textContent = clp(g);
  }

  function serializeFromDOM() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return { "2024": {}, "2025": {} };

    const out = { "2024": {}, "2025": {} };
    ["2024", "2025"].forEach(year => {
      const box = root.querySelector(`[data-year="${year}"]`);
      qsa_safe("input.igf-input", box).forEach(inp => {
        out[year][inp.dataset.type] = toNum(inp.value);
      });
    });
    return out;
  }

  function hydrateToDOM(state) {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;

    ["2024", "2025"].forEach(year => {
      const box = root.querySelector(`[data-year="${year}"]`);
      qsa_safe("input.igf-input", box).forEach(inp => {
        const v = state?.[year]?.[inp.dataset.type];
        inp.value = typeof v === "number" ? v : 0;
      });
    });
    updateSubtotals();
  }

  function guardarIngreso() {
    const tipo = document.getElementById("igf_tipo")?.value;
    const anual = Number(document.getElementById("igf_monto_anual")?.value || 0);
    const auto = document.getElementById("igf_auto_calc")?.checked;
    const mensual = auto ? calcularMensual(tipo, anual) : 0;

    const key = "fuas.ingresos." + tipo;
    const registro = { anual, mensual, auto };

    let lista = JSON.parse(localStorage.getItem(key) || "[]");
    lista.push(registro);
    localStorage.setItem(key, JSON.stringify(lista));

    mostrarIngresos();
  }

  function mostrarIngresos() {
    let subtotal = 0;
    const cont = document.getElementById("igf_lista");
    if (!cont) return;

    cont.innerHTML = "";
    const keyPrefix = "fuas.ingresos.";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(keyPrefix)) {
        const lista = JSON.parse(localStorage.getItem(key) || "[]");
        lista.forEach((item) => {
          subtotal += item.mensual || 0;
          const li = document.createElement("li");
          li.className = "list-group-item d-flex justify-content-between align-items-center";
          li.textContent = `${key.replace(keyPrefix, "")} → $${item.mensual.toLocaleString("es-CL")}/mes`;
          cont.appendChild(li);
        });
      }
    }

    const el = document.getElementById("igf_subtotal");
    if (el) {
      el.textContent = "$" + subtotal.toLocaleString("es-CL");
    }
  }

  function actualizarSubtotalEnVivo() {
    const tipo = document.getElementById("igf_tipo")?.value;
    const anual = Number(document.getElementById("igf_monto_anual")?.value || 0);
    const auto = document.getElementById("igf_auto_calc")?.checked;
    const mensual = auto ? calcularMensual(tipo, anual) : 0;

    let subtotal = 0;
    const keyPrefix = "fuas.ingresos.";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(keyPrefix)) {
        const lista = JSON.parse(localStorage.getItem(key) || "[]");
        lista.forEach((item) => (subtotal += item.mensual || 0));
      }
    }
    subtotal += mensual;

    const el = document.getElementById("igf_subtotal");
    if (el) {
      el.textContent = "$" + subtotal.toLocaleString("es-CL");
    }
  }

  function wireForm() {
    const form = document.getElementById("igf_form");
    if (!form) return;

    const tipo = document.getElementById("igf_tipo");
    const anual = document.getElementById("igf_monto_anual");
    const auto = document.getElementById("igf_auto_calc");
    const guardarBtn = document.getElementById("igf_guardar");

    if (guardarBtn) guardarBtn.addEventListener("click", guardarIngreso);
    if (tipo) tipo.addEventListener("change", actualizarSubtotalEnVivo);
    if (anual) anual.addEventListener("input", actualizarSubtotalEnVivo);
    if (auto) auto.addEventListener("change", actualizarSubtotalEnVivo);

    updateSubtotals();
  }

  // Exponer inicializador global
  window.initIngresosFamiliaresMatriz = function () {
    wireForm();
    hydrateToDOM(loadState(currentMemberId()));
    updateSubtotals();
  };

  // Storage por miembro (si lo necesitas)
  function storageKey(memberId) { return KEY_PREFIX + memberId; }
  function loadState(memberId) {
    try { return JSON.parse(localStorage.getItem(storageKey(memberId)) || "{}"); }
    catch { return {}; }
  }
  function saveState(memberId, state) {
    localStorage.setItem(storageKey(memberId), JSON.stringify(state));
  }

  // Auto-init si el bloque ya existe al cargar (por si no lo inyectas)
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById(ROOT_ID)) {
      window.initIngresosFamiliaresMatriz();
    }
  });
})();

/*************************************************************
 * 1) GUARDAR Y CONTINUAR DESDE DATOS PERSONALES
 *************************************************************/
function continuarDesdePersonales() {
  const personales = {
    rut: document.getElementById("rutPostulante")?.value?.trim() || "",
    apePaterno: document.getElementById("ap-paternoPostulante")?.value?.trim() || "",
    apeMaterno: document.getElementById("ap-maternoPostulante")?.value?.trim() || "",
    nomPostulante: document.getElementById("nombresPostulante")?.value?.trim() || "",
    civPostulante: document.getElementById("civPostulante")?.value || "",
    nivPostulante: document.getElementById("nivPostulante")?.value || "",
    actPostulante: document.getElementById("actPostulante")?.value || "",
  };

  localStorage.setItem("fuas.personales", JSON.stringify(personales));

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || "-"; };
  set("lblRut", personales.rut);
  set("lblapePaterno", personales.apePaterno);
  set("lblapeMaterno", personales.apeMaterno);
  set("lblnomPostulante", personales.nomPostulante);
  document.querySelectorAll(".lblNomCompleto").forEach(lbl => {
    lbl.textContent = `${personales.nomPostulante} ${personales.apePaterno} ${personales.apeMaterno}`.trim();
  });
  set("lblciv-estPostulante", personales.civPostulante);
  set("lblniv-estPostulante", personales.nivPostulante);
  set("lblactPostulante", personales.actPostulante);

  if (typeof ocultarTodo === "function") ocultarTodo();
  if (document.getElementById("form-datosFamiliares")) {
    document.getElementById("form-datosFamiliares").classList.remove("d-none");
  }
}

/*************************************************************
 * 2) AGREGAR / ELIMINAR FAMILIAR (render acordeones)
 *************************************************************/
const FAM_LIST_KEY = "fuas.familia.list";
let familiarCounter = Number(localStorage.getItem("fuas.familia.counter") || 1);

function getFamiliaList() {
  try { return JSON.parse(localStorage.getItem(FAM_LIST_KEY) || "[]"); }
  catch { return []; }
}
function setFamiliaList(list) {
  localStorage.setItem(FAM_LIST_KEY, JSON.stringify(list || []));
}

function eliminarFamiliar(btn) {
  const item = btn?.closest(".accordion-item");
  if (!item) return;
  const famId = item.getAttribute("data-fam-id");
  if (!famId) return;

  if (!confirm("¿Eliminar este familiar y sus secciones asociadas?")) return;

  const list = getFamiliaList().filter(f => f.id !== famId);
  setFamiliaList(list);

  document.querySelectorAll(`[data-fam-id="${famId}"]`).forEach(el => el.remove());

  if (window.currentMemberId === famId) {
    window.currentMemberId = "postulante";
  }
}

/********** Helpers de render **********/
function renderAcordeonDatosFamiliaresItem(famId, nombreVisible) {
  const acc = document.getElementById("acordeon-container"); // <<<<<< ID corregido según tu HTML
  if (!acc) return;

  const idx = famId.replace("fam_", "");
  const html = `
    <div class="accordion-item" data-fam-id="${famId}">
      <h2 class="accordion-header" id="head-df-${idx}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#col-df-${idx}" aria-expanded="false" aria-controls="col-df-${idx}">
          ${nombreVisible} — Datos del familiar
        </button>
      </h2>
      <div id="col-df-${idx}" class="accordion-collapse collapse" aria-labelledby="head-df-${idx}" data-bs-parent="#acordeon-container">
        <div class="accordion-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">RUT</label>
              <input class="form-control" data-f="${famId}" data-field="rut" placeholder="12.345.678-9">
            </div>
            <div class="col-md-6">
              <label class="form-label">Nombres</label>
              <input class="form-control" data-f="${famId}" data-field="nombres" placeholder="Nombres">
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellido paterno</label>
              <input class="form-control" data-f="${famId}" data-field="apPaterno" placeholder="Apellido paterno">
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellido materno</label>
              <input class="form-control" data-f="${famId}" data-field="apMaterno" placeholder="Apellido materno">
            </div>
            <div class="col-md-6">
              <label class="form-label">Relación</label>
              <select class="form-select" data-f="${famId}" data-field="relacion">
                <option selected disabled>Selecciona…</option>
                <option>Madre</option>
                <option>Padre</option>
                <option>Hermano/a</option>
                <option>Otro</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Nivel de estudio</label>
              <select class="form-select" data-f="${famId}" data-field="nivelEstudio">
                <option selected disabled>Selecciona…</option>
                <option>Básica</option>
                <option>Media</option>
                <option>Superior</option>
                <option>Técnico</option>
              </select>
            </div>
            <div class="col-12 d-flex justify-content-end">
              <button type="button" class="btn btn-outline-danger btn-sm" onclick="eliminarFamiliar(this)">
                Eliminar familiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  acc.insertAdjacentHTML("beforeend", html);

  const pane = document.getElementById(`col-df-${idx}`);
  pane?.addEventListener("show.bs.collapse", () => { window.currentMemberId = famId; });
}

function renderAcordeonCondicionSaludItem(famId, nombreVisible) {
  const acc = document.getElementById("acordeon-condicion-salud");
  if (!acc) return;

  const idx = famId.replace("fam_", "");
  const html = `
  <div class="accordion-item" data-fam-id="${famId}">
    <h2 class="accordion-header" id="head-salud-${idx}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#col-salud-${idx}" aria-expanded="false" aria-controls="col-salud-${idx}">
        ${nombreVisible} — Condición de salud
      </button>
    </h2>
    <div id="col-salud-${idx}" class="accordion-collapse collapse" aria-labelledby="head-salud-${idx}" data-bs-parent="#acordeon-condicion-salud">
      <div class="accordion-body">
        <div class="row g-3">
          <div class="col-md-12">
            <label class="form-label">Antecedentes de salud</label>
            <textarea class="form-control" rows="2" data-f="${famId}" data-field="saludNotas"
              placeholder="Describe la condición de salud del familiar…"></textarea>
          </div>
          <div class="col-md-6">
            <label class="form-label">¿Se puede desplazar dentro del hogar?</label><br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="desplaza_${idx}" value="si" data-f="${famId}" data-field="desplaza">
              <label class="form-check-label">Sí</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="desplaza_${idx}" value="no" data-f="${famId}" data-field="desplaza">
              <label class="form-check-label">No</label>
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label">¿Control de esfínteres?</label><br>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="esfinter_${idx}" value="si" data-f="${famId}" data-field="esfinteres">
              <label class="form-check-label">Sí</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="esfinter_${idx}" value="no" data-f="${famId}" data-field="esfinteres">
              <label class="form-check-label">No</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  acc.insertAdjacentHTML("beforeend", html);

  const pane = document.getElementById(`col-salud-${idx}`);
  pane?.addEventListener("show.bs.collapse", () => { window.currentMemberId = famId; });
}

/*************************************************************
 * 3) INIT “Datos familiares” (botón + reconstrucción)
 *************************************************************/
function initDatosFamiliares() {
  const btnAdd = document.getElementById("btn-agregar-familiar");
  if (btnAdd && !btnAdd._fuasHooked) {
    btnAdd.addEventListener("click", agregarFamiliar);
    btnAdd._fuasHooked = true;
  }

  const list = getFamiliaList();
  list.forEach(item => {
    renderAcordeonDatosFamiliaresItem(item.id, item.nombre);
    renderAcordeonCondicionSaludItem(item.id, item.nombre);
  });

  if (!list.length) {
    familiarCounter += 1;
    localStorage.setItem("fuas.familia.counter", String(familiarCounter));
    const id = `fam_${familiarCounter}`;
    const nombre = `Familiar ${familiarCounter}`;
    const list2 = getFamiliaList(); list2.push({id, nombre}); setFamiliaList(list2);
    renderAcordeonDatosFamiliaresItem(id, nombre);
    renderAcordeonCondicionSaludItem(id, nombre);
    window.currentMemberId = id;
  }
}

// Auto-init si el HTML ya está
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("acordeon-container")) {
    initDatosFamiliares();
  }
});

/* ==== Patch: Add ingresos accordion per familiar, usando plantilla existente ==== */
(function(){
  const ORIG_ADD = window.agregarFamiliar;
  function findIngresosTemplate(){
    const candidates = Array.from(document.querySelectorAll('#accordionFamiliar1 .accordion-item'));
    for(const el of candidates){
      if(el.querySelector('#ingresos-familiares-matriz')) return el;
    }
    return null;
  }
  function uniqueIngresosFor(idx){
    const templateAcc = findIngresosTemplate();
    if(!templateAcc){ return null; }
    const clone = templateAcc.cloneNode(true);
    const header = clone.querySelector('[id^="headingFamiliar"]');
    if(header){ header.id = 'headingFamiliar'+idx; }
    const btn = clone.querySelector('button.accordion-button');
    if(btn){
      btn.setAttribute('data-bs-target', '#collapseFamiliar'+idx);
      btn.setAttribute('aria-controls','collapseFamiliar'+idx);
    }
    const collapse = clone.querySelector('[id^="collapseFamiliar"]');
    if(collapse){
      collapse.id = 'collapseFamiliar'+idx;
      collapse.setAttribute('aria-labelledby','headingFamiliar'+idx);
      collapse.classList.remove('show');
    }
    const matrix = clone.querySelector('#ingresos-familiares-matriz');
    if(matrix){
      matrix.id = 'ingresos-familiares-matriz-'+idx;
      const s24 = clone.querySelector('#igf-subtotal-2024'); if(s24){ s24.id = 'igf-subtotal-2024-'+idx; s24.setAttribute('data-role','subtotal-2024'); }
      const s25 = clone.querySelector('#igf-subtotal-2025'); if(s25){ s25.id = 'igf-subtotal-2025-'+idx; s25.setAttribute('data-role','subtotal-2025'); }
      const sg  = clone.querySelector('#igf-subtotal-global'); if(sg){ sg.id  = 'igf-subtotal-global-'+idx; sg.setAttribute('data-role','subtotal-global'); }
      clone.querySelectorAll('input.igf-input').forEach(inp=>{ inp.setAttribute('data-idx', String(idx)); inp.value = 0; });
    }
    const lbl = clone.querySelector('label.lblNomCompleto');
    if(lbl){ lbl.textContent = 'Familiar '+idx; }
    return clone;
  }
  function updateSubtotalsIn(root){
    if(!root) return;
    function sumForYear(y){
      let s=0;
      root.querySelectorAll('[data-year="'+y+'"] input.igf-input').forEach(inp=>{
        const v = Number(String(inp.value||0).replace(/[^\d.-]/g,''))||0; s+=v;
      });
      return s;
    }
    const s24 = sumForYear('2024'), s25 = sumForYear('2025'), g = s24+s25;
    const fmt = n => '$' + Number(n||0).toLocaleString('es-CL');
    const el24 = root.querySelector('[data-role="subtotal-2024"]'); if(el24) el24.textContent = fmt(s24);
    const el25 = root.querySelector('[data-role="subtotal-2025"]'); if(el25) el25.textContent = fmt(s25);
    const elg  = root.querySelector('[data-role="subtotal-global"]'); if(elg)  elg.textContent  = fmt(g);
  }
  function wireIngresos(root){
    if(!root) return;
    root.querySelectorAll('input.igf-input').forEach(inp=>{
      inp.addEventListener('input', ()=> updateSubtotalsIn(root));
      inp.addEventListener('change', ()=> updateSubtotalsIn(root));
    });
    updateSubtotalsIn(root);
  }
  window.agregarFamiliar = function(){
    try{ if(typeof ORIG_ADD === 'function') ORIG_ADD(); }catch(e){}
    let idx = 1;
    const last = localStorage.getItem('fuas.familia.counter');
    if(last) idx = Number(last);
    const dest = document.getElementById('acordeon-ingresos-familiares');
    const clone = uniqueIngresosFor(idx);
    if(dest && clone){
      dest.appendChild(clone);
      const root = clone.querySelector('.accordion-body') || clone;
      wireIngresos(root);
    }
  };
  document.addEventListener('DOMContentLoaded', ()=>{
    const first = findIngresosTemplate();
    if(first){
      const body = first.querySelector('.accordion-body') || first;
      const s24 = body.querySelector('#igf-subtotal-2024'); if(s24) s24.setAttribute('data-role','subtotal-2024');
      const s25 = body.querySelector('#igf-subtotal-2025'); if(s25) s25.setAttribute('data-role','subtotal-2025');
      const sg  = body.querySelector('#igf-subtotal-global'); if(sg) sg.setAttribute('data-role','subtotal-global');
      wireIngresos(body);
    }
  });
})();

/***** PARCHE: Agregar familiar robusto (numera bien y conserva estilos) *****/
(function () {
  const IDS = {
    datos: "acordeon-container",
    ingresos: "acordeon-ingresos-familiares",
    salud: "acordeon-condicion-salud",
  };

  // Contador por DOM: calcula el próximo "Familiar N" mirando cuántos items hay en los 3 acordeones
  function nextIndex() {
    const c = id => (document.getElementById(id)?.querySelectorAll(".accordion-item").length || 0);
    return Math.max(c(IDS.datos), c(IDS.ingresos), c(IDS.salud)) + 1;
  }

  // Toma como plantilla el PRIMER .accordion-item del contenedor
  function getTemplate(containerId) {
    const cont = document.getElementById(containerId);
    if (!cont) return null;
    return cont.querySelector(".accordion-item");
  }

  // Limpia campos del clon
  function resetFields(root) {
    root.querySelectorAll("input").forEach(inp => {
      if (inp.type === "radio" || inp.type === "checkbox") inp.checked = false;
      else inp.value = "";
    });
    root.querySelectorAll("textarea").forEach(t => t.value = "");
    root.querySelectorAll("select").forEach(s => (s.selectedIndex = 0));
  }

  // Ajusta ids/targets del acordeón sin tocar clases (así no se rompe la estética)
  function uniquifyAccordion(clone, prefix, idx, parentId) {
    // header + button
    const header = clone.querySelector("h2[id]") || clone.querySelector('[id^="heading"]');
    if (header) header.id = `${prefix}-head-${idx}`;

    const btn = clone.querySelector(".accordion-button");
    if (btn) {
      btn.setAttribute("data-bs-target", `#${prefix}-col-${idx}`);
      btn.setAttribute("aria-controls", `${prefix}-col-${idx}`);
      // no tocamos clases => se mantiene diseño
    }

    // collapse
    const col = clone.querySelector(".accordion-collapse[id]");
    if (col) {
      col.id = `${prefix}-col-${idx}`;
      if (header) col.setAttribute("aria-labelledby", header.id);
      // asegurar parent correcto
      if (parentId) col.setAttribute("data-bs-parent", `#${parentId}`);
      col.classList.remove("show");
    }

    // marca del familiar
    clone.setAttribute("data-fam-id", `fam_${idx}`);
  }

  // Cambia el texto del botón/heading manteniendo estilos
  function setHeadingText(clone, baseText, idx) {
    const btn = clone.querySelector(".accordion-button");
    if (!btn) return;
    // Si el template ya tiene un "Familiar X", lo reemplazamos; si no, agregamos el sufijo
    const txt = btn.textContent.trim();
    const replaced = txt.replace(/Familiar\s+\d+/i, `${baseText} ${idx}`);
    btn.textContent = /Familiar\s+\d+/i.test(txt) ? replaced : `${baseText} ${idx}`;
  }

  // Subtotales locales para el clon de INGRESOS (no toca estilos)
  function bindIngresosSubtotals(clone) {
    const fmt = n => "$" + Number(n || 0).toLocaleString("es-CL");
    const toNum = v => Number(String(v || 0).replace(/[^\d.-]/g, "")) || 0;

    function sumYear(y) {
      let s = 0;
      clone.querySelectorAll(`[data-year="${y}"] input.igf-input, [data-year="${y}"] input[data-type]`)
        .forEach(inp => (s += toNum(inp.value)));
      return s;
    }
    const sub24 = clone.querySelector('[data-role="subtotal-2024"]') || clone.querySelector("#igf-subtotal-2024");
    const sub25 = clone.querySelector('[data-role="subtotal-2025"]') || clone.querySelector("#igf-subtotal-2025");
    const subG  = clone.querySelector('[data-role="subtotal-global"]') || clone.querySelector("#igf-subtotal-global");

    function recalc() {
      const s24 = sumYear("2024");
      const s25 = sumYear("2025");
      if (sub24) sub24.textContent = fmt(s24);
      if (sub25) sub25.textContent = fmt(s25);
      if (subG)  subG.textContent  = fmt(s24 + s25);
    }

    clone.querySelectorAll("input.igf-input, input[data-type]").forEach(inp => {
      inp.addEventListener("input", recalc);
      inp.addEventListener("change", recalc);
    });
    recalc();
  }

  // Clona el primer item del contenedor, lo limpia, actualiza ids/título y lo añade
  function cloneInto(containerId, prefix, idx, titleBase) {
    const cont = document.getElementById(containerId);
    const tpl  = getTemplate(containerId);
    if (!cont || !tpl) return null;

    const clone = tpl.cloneNode(true);
    resetFields(clone);
    uniquifyAccordion(clone, prefix, idx, containerId);
    if (titleBase) setHeadingText(clone, titleBase, idx);

    cont.appendChild(clone);
    return clone;
  }

  
  // Asegura subtotales vivos en el PRIMER item de Ingresos que ya existe
  document.addEventListener("DOMContentLoaded", () => {
    const first = getTemplate(IDS.ingresos);
    if (first) bindIngresosSubtotals(first);
  });
})();


// DATOS PERSONALES | REGIONES Y COMUNAS 
// ===== 0) Esperar DOM listo =====
document.addEventListener('DOMContentLoaded', () => {
  // ===== 1) DATASET (puedes pegar el completo aquí) =====
  const REGIONES_COMUNAS = {
    "Región de Arica y Parinacota": ["Arica","Camarones","Putre","General Lagos"],
    "Región de Tarapacá": ["Iquique","Alto Hospicio","Pozo Almonte","Camiña","Colchane","Huara","Pica"],
    "Región de Antofagasta": ["Antofagasta","Mejillones","Sierra Gorda","Taltal","Calama","Ollagüe","San Pedro de Atacama","Tocopilla","María Elena"],
    "Región de Atacama": ["Copiapó","Caldera","Tierra Amarilla","Chañaral","Diego de Almagro","Vallenar","Alto del Carmen","Freirina","Huasco"],
    "Región de Coquimbo": ["La Serena","Coquimbo","Andacollo","La Higuera","Paiguano","Vicuña","Illapel","Canela","Los Vilos","Salamanca","Ovalle","Combarbalá","Monte Patria","Punitaqui","Río Hurtado"],
    "Región de Valparaíso": ["Valparaíso","Viña del Mar","Concón","Quilpué","Villa Alemana","Limache","Olmué","Quintero","Puchuncaví","Casablanca","Juan Fernández","San Antonio","Cartagena","El Tabo","El Quisco","Algarrobo","Santo Domingo","San Felipe","Llaillay","Catemu","Panquehue","Putaendo","Santa María","Los Andes","Calle Larga","Rinconada","San Esteban","La Ligua","Papudo","Cabildo","Zapallar","Petorca","Quillota","La Calera","Nogales","Hijuelas","La Cruz","Isla de Pascua"],
    "Región Metropolitana de Santiago": ["Santiago","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura","Puente Alto","San José de Maipo","Pirque","Colina","Lampa","Tiltil","Buin","Paine","San Bernardo","Calera de Tango","Melipilla","Alhué","Curacaví","María Pinto","San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"],
    "Región del Libertador General Bernardo O'Higgins": ["Rancagua","Codegua","Coinco","Coltauco","Doñihue","Graneros","Las Cabras","Machalí","Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rengo","Requínoa","San Vicente","Pichilemu","La Estrella","Litueche","Marchihue","Navidad","Paredones","San Fernando","Chépica","Chimbarongo","Lolol","Nancagua","Palmilla","Peralillo","Placilla","Pumanque","Santa Cruz"],
    "Región del Maule": ["Talca","Constitución","Curepto","Empedrado","Maule","Pelarco","Pencahue","Río Claro","San Clemente","San Rafael","Cauquenes","Chanco","Pelluhue","Curicó","Hualañé","Licantén","Molina","Rauco","Romeral","Sagrada Familia","Teno","Vichuquén","Linares","Colbún","Longaví","Parral","Retiro","San Javier","Villa Alegre","Yerbas Buenas"],
    "Región de Ñuble": ["Chillán","Chillán Viejo","Quillón","Bulnes","San Ignacio","El Carmen","Pemuco","Yungay","Pinto","Coihueco","San Carlos","Ñiquén","San Fabián","San Nicolás","Cobquecura","Quirihue","Ninhue","Treguaco","Portezuelo","Ránquil","Coelemu"],
    "Región del Biobío": ["Concepción","Coronel","Chiguayante","Florida","Hualqui","Lota","Penco","San Pedro de la Paz","Santa Juana","Talcahuano","Tomé","Hualpén","Lebu","Arauco","Cañete","Contulmo","Curanilahue","Los Álamos","Tirúa","Los Ángeles","Antuco","Cabrero","Laja","Mulchén","Nacimiento","Negrete","Quilaco","Quilleco","San Rosendo","Santa Bárbara","Tucapel","Yumbel","Alto Biobío"],
    "Región de La Araucanía": ["Temuco","Carahue","Cunco","Curarrehue","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Saavedra","Teodoro Schmidt","Toltén","Vilcún","Villarrica","Cholchol","Angol","Collipulli","Curacautín","Ercilla","Lonquimay","Los Sauces","Lumaco","Purén","Renaico","Traiguén","Victoria"],
    "Región de Los Ríos": ["Valdivia","Corral","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli","La Unión","Futrono","Lago Ranco","Río Bueno"],
    "Región de Los Lagos": ["Puerto Montt","Calbuco","Cochamó","Fresia","Frutillar","Los Muermos","Llanquihue","Maullín","Puerto Varas","Castro","Ancud","Chonchi","Curaco de Vélez","Dalcahue","Puqueldón","Queilén","Quellón","Quemchi","Quinchao","Osorno","Puerto Octay","Purranque","Puyehue","Río Negro","San Juan de la Costa","San Pablo","Chaitén","Futaleufú","Hualaihué","Palena"],
    "Región de Aysén del General Carlos Ibáñez del Campo": ["Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas","Cochrane","O'Higgins","Tortel","Chile Chico","Río Ibáñez"],
    "Región de Magallanes y de la Antártica Chilena": ["Punta Arenas","Laguna Blanca","Río Verde","San Gregorio","Cabo de Hornos","Antártica","Porvenir","Primavera","Timaukel","Natales","Torres del Paine"]
  };

  // ===== 2) Función idempotente de inicialización =====
  function initRegionComuna() {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    // Si aún no existen, salir
    if (!regionSelect || !comunaSelect) return false;

    // Evitar doble-inicialización (si ya la hicimos, no repetir)
    if (regionSelect.dataset.inited === '1') return true;
    regionSelect.dataset.inited = '1';

    // Poblar regiones
    regionSelect.innerHTML = '<option selected disabled>[Selecciona...]</option>';
    Object.keys(REGIONES_COMUNAS).forEach(region => {
      const opt = document.createElement('option');
      opt.value = region;
      opt.textContent = region;
      regionSelect.appendChild(opt);
    });

    // Listener único para cambiar comunas
    regionSelect.addEventListener('change', () => {
      const region = regionSelect.value;
      comunaSelect.innerHTML = '<option selected disabled>[Selecciona...]</option>';

      if (!region) {
        comunaSelect.disabled = true;
        return;
      }

      REGIONES_COMUNAS[region].forEach(comuna => {
        const opt = document.createElement('option');
        opt.value = comuna;
        opt.textContent = comuna;
        comunaSelect.appendChild(opt);
      });

      comunaSelect.disabled = false;
    }, { once: false });

    // Si quieres restaurar desde localStorage, acá podrías hacerlo

    return true;
  }

  // ===== 3) Intento inmediato (si está en el DOM al cargar) =====
  if (!initRegionComuna()) {
    // ===== 4) Observador: se inicializa cuando el fragmento se inserte =====
    const observer = new MutationObserver(() => {
      if (initRegionComuna()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
});


// DATOS PERSONALES | VALIDACIÓN DE RUT

document.addEventListener('DOMContentLoaded', () => {
  // --- helpers RUT ---
  const cleanRut = (s) => (s || '').replace(/[^0-9kK]/g, '').toUpperCase();

  const formatRut = (s) => {
    const c = cleanRut(s);
    if (!c) return '';
    if (c.length <= 1) return c; // aún escribiendo DV
    const body = c.slice(0, -1);
    const dv = c.slice(-1);
    const rev = body.split('').reverse().join('');
    const chunks = rev.match(/.{1,3}/g) || [];
    const withDots = chunks.join('.').split('').reverse().join('');
    return `${withDots}-${dv}`;
  };

  const computeDV = (bodyStr) => {
    let sum = 0, mul = 2;
    for (let i = bodyStr.length - 1; i >= 0; i--) {
      sum += parseInt(bodyStr[i], 10) * mul;
      mul = (mul === 7) ? 2 : (mul + 1);
    }
    const rest = 11 - (sum % 11);
    return rest === 11 ? '0' : rest === 10 ? 'K' : String(rest);
  };

  const isValidRut = (s) => {
    const c = cleanRut(s);
    if (c.length < 2) return false;
    const body = c.slice(0, -1);
    const dv = c.slice(-1);
    if (!/^\d+$/.test(body)) return false;
    return computeDV(body) === dv;
  };

  const normalizeRut = (s) => {
    const c = cleanRut(s);
    return c.length >= 2 ? `${c.slice(0, -1)}-${c.slice(-1)}` : c;
  };

  // --- inicialización idempotente de un input RUT ---
  function initRutInput(input) {
    if (!input || input.dataset.rutInited === '1') return;

    const feedback = document.getElementById(input.getAttribute('aria-describedby')) 
                      || document.getElementById('rutFeedback');

    const updateRut = () => {
      const raw = input.value;
      const formatted = formatRut(raw);

      // mantener el caret al final si escribe al final
      const atEnd = input.selectionStart === input.value.length;
      input.value = formatted;
      if (atEnd) input.selectionStart = input.selectionEnd = input.value.length;

      const valid = isValidRut(raw);
      input.classList.toggle('is-valid', valid);
      const hasEnough = cleanRut(raw).length >= 2;
      input.classList.toggle('is-invalid', hasEnough && !valid);
      if (feedback) {
        feedback.textContent = valid ? '' : 'RUT inválido. Revisa los dígitos y el verificador.';
      }
      // si quieres guardar: const rutParaGuardar = normalizeRut(raw);
    };

    // listeners
    input.addEventListener('input', updateRut);
    input.addEventListener('blur', updateRut);
    // limpieza al pegar
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text');
      input.value = cleanRut(text);
      updateRut();
    });

    input.dataset.rutInited = '1';
  }

  // --- inicializar los que existan ahora (soporta muchos) ---
  function initAllRutInputs() {
    // por id clásico…
    const byId = document.getElementById('rutPostulante');
    if (byId) initRutInput(byId);
    // …y por atributo data-rut (permite múltiples)
    document.querySelectorAll('input[data-rut]').forEach(initRutInput);
  }

  initAllRutInputs();

  // --- observar el DOM por contenido cargado dinámicamente ---
  const observer = new MutationObserver(() => initAllRutInputs());
  observer.observe(document.body, { childList: true, subtree: true });
});

// DATOS PERSONALES | Condicion de Salud (SI/NO)

document.addEventListener('DOMContentLoaded', () => {
  const rSi = document.getElementById('saludSi');
  const rNo = document.getElementById('saludNo');

  if (rSi && rNo) {
    // Al cambiar, guardamos y sincronizamos interfaz
    rSi.addEventListener('change', () => setShowCondSalud(true));
    rNo.addEventListener('change', () => setShowCondSalud(false));

    // Inicializa radios según lo guardado (por si vuelven a la página)
    const saved = getShowCondSalud();
    if (saved) rSi.checked = true; else rNo.checked = true;
    syncCondSaludUI();
  }
});
