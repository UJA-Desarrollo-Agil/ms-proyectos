/**
 * Funciones en javascript para el cliente
 */
const SERVER = "http://localhost"
const PORT = "8002"

const DIV_LISTADO = "listado"

async function recuperaProyectos(callBackFn) {
    const url = SERVER + ":" + PORT + "/getProyectosAll"
    const response = await fetch(url);
    const vectorProyectos = await response.json()
    callBackFn(vectorProyectos.data)
}

// Mostrar como DIV
//const FN_CABECERA="proyectosCabeceraDIV"
//const FN_Proyecto="proyectoDIV"
//const FN_PIE="proyectosPieDIV"

// Mostrar como TABLA
const FN_CABECERA="proyectosCabeceraTABLE"
const FN_Proyecto="proyectoTR"
const FN_PIE="proyectosPieTABLE"

// Funciones para mostrar como DIV
function proyectosCabeceraDIV() {
    return "<div>";
}

function proyectoDIV( p ) {
    return `<div>
    <p><b>ID</b>: ${p.ref['@ref'].id}</p>
    <p><b>Nombre</b>: ${p.data.nombre}</p>
    <p><b>Apelidos</b>: ${p.data.apellidos}</p>
    <p><b>E-mail</b>: ${p.data.email}</p>
    <p><b>En plantilla desde</b>: ${p.data.anio_entrada}</p>
    </div>
    `;
}
function proyectosPieDIV() {
    return "</div>";
}

// Funciones para mostrar como TABLE
function proyectosCabeceraTABLE() {
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>eMail</th><th>Año contratación</th>
        </thead>
        <tbody>
    `;
}
function proyectoTR( p ) {
    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.data.nombre}</td>
    <td>${p.data.apellidos}</td>
    <td>${p.data.email}</td>
    <td>${p.data.anio_entrada}</td>
    </tr>
    `;
}
function proyectosPieTABLE() {
    return "</tbody></table>";
}



// Función que muestra todo el listado de proyectos en pantalla
function imprimeProyectos(vector) {
    const div = document.getElementById(DIV_LISTADO);
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_Proyecto)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}


// Función inicial para la página de listar
function main_listar() {
    recuperaProyectos(imprimeProyectos);
    return true;
}
