"use strict";
exports.__esModule = true;
var fs = require("fs");
var ReadlineSync = require("readline-sync");
// Creo la clases Auto
var Auto = /** @class */ (function () {
    function Auto(patente, marca, modelo, año) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }
    Auto.prototype.getPatente = function () {
        return this.patente;
    };
    Auto.prototype.getMarca = function () {
        return this.marca;
    };
    Auto.prototype.getModelo = function () {
        return this.modelo;
    };
    Auto.prototype.getAño = function () {
        return this.año;
    };
    return Auto;
}());
// Creo la clase RegistroAutomotor
var RegistroAutomotor = /** @class */ (function () {
    function RegistroAutomotor(nombre, direccion, listaAutos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.listaAutos = listaAutos;
    }
    RegistroAutomotor.prototype.getlistaAutos = function () {
        return this.listaAutos;
    };
    RegistroAutomotor.prototype.mostrarAutos = function () {
        console.log(this.nombre);
        console.log(this.direccion);
        console.log(this.listaAutos);
    };
    return RegistroAutomotor;
}());
// Creo un gestor que permite leer un archivo de texto
var GestorDeArchivos = /** @class */ (function () {
    function GestorDeArchivos(txtFileLocation) {
        var archivoTxt = fs.readFileSync(txtFileLocation, 'utf-8');
        this.arregloString = archivoTxt.split(';');
    }
    GestorDeArchivos.prototype.mostrarArreglo = function () {
        console.log(this.arregloString);
    };
    GestorDeArchivos.prototype.getArregloString = function () {
        return this.arregloString;
    };
    return GestorDeArchivos;
}());
// Función para crear un auto
function crearAuto(auto, arrayAuto) {
    var propiedadAuto = auto.split(',');
    var patente = propiedadAuto[0];
    var marca = propiedadAuto[1];
    var modelo = propiedadAuto[2];
    var año = Number(propiedadAuto[3]);
    var nuevoAuto = new Auto(patente, marca, modelo, año);
    arrayAuto.push(nuevoAuto);
}
// Función para agregar un auto
function agregarAuto(arregloAuto) {
    var patente = ReadlineSync.question("Ingrese pantente (AA000AA): ");
    var marca = ReadlineSync.question("Ingrese la marca del vehiculo: ");
    var modelo = ReadlineSync.question("Ingrese el modelo del vehiculo: ");
    var año = ReadlineSync.questionInt("Ingrese el año del vehiculo: ");
    var nuevoAuto = new Auto(patente, marca, modelo, año);
    arregloAuto.push(nuevoAuto);
}
// Función para modificar un auto
function modificarAuto(arregloAuto) {
    var posicion = ReadlineSync.questionInt("Elija posicion a modificar entre 1 y " + arregloAuto.length + ": ");
    var patente = ReadlineSync.question("Ingrese pantente (AA000AA): ");
    var marca = ReadlineSync.question("Ingrese la marca del vehiculo: ");
    var modelo = ReadlineSync.question("Ingrese el modelo del vehiculo: ");
    var año = ReadlineSync.questionInt("Ingrese el año del vehiculo: ");
    var autoModificado = new Auto(patente, marca, modelo, año);
    delete arregloAuto[(posicion - 1)];
    arregloAuto[(posicion - 1)] = autoModificado;
}
// Función para borrar un auto
function borrarAuto(arregloAuto) {
    var posicion = ReadlineSync.questionInt("Elija posicion a borrar entre 1 y " + arregloAuto.length + ": ");
    delete arregloAuto[(posicion - 1)];
}
// Iniciar programa
var datos = new GestorDeArchivos("autos.txt");
var listaAutos = [];
for (var i = 0; i < datos.getArregloString().length; i++) {
    crearAuto(datos.getArregloString()[i], listaAutos);
}
var registro = new RegistroAutomotor("RNPA Nº1", "San Martin 352", listaAutos);
// Creo el menu
var opcion = 0;
while (opcion !== 5) {
    console.log("*********************");
    console.log("* Menu de opciones: *");
    console.log("* 1-Mostrar         *");
    console.log("* 2-Agregar         *");
    console.log("* 3-Modificar       *");
    console.log("* 4-Borrar          *");
    console.log("* 5-Salir           *");
    console.log("*********************");
    opcion = ReadlineSync.questionInt("Elija una opcion: ");
    switch (opcion) {
        case 1:
            console.log("Elegiste opción 1");
            registro.mostrarAutos();
            break;
        case 2:
            console.log("Elegiste opción 2");
            agregarAuto(listaAutos);
            break;
        case 3:
            console.log("Elegiste opción 3");
            modificarAuto(listaAutos);
            break;
        case 4:
            console.log("Elegiste opción 4");
            borrarAuto(listaAutos);
            break;
        case 5:
            console.log("Gracias, que tengas un lindo día");
            break;
        default:
            console.log("-----OPCIÓN INCORRECTA-----");
    }
}
