import * as fs from 'fs';
import * as ReadlineSync from 'readline-sync';

// Creo la clases Auto
class Auto {
    private patente: string;
    private marca: string;
    private modelo: string;
    private año: number;

    public constructor(patente: string, marca: string, modelo: string, año: number) {
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }


    public getPatente() : string {
        return this.patente;
    }

    public getMarca() : string {
        return this.marca;
    }

    public getModelo() : string {
        return this.modelo;
    }

    public getAño() : number {
        return this.año;
    }
}

// Creo la clase RegistroAutomotor
class RegistroAutomotor {
    private nombre: string;
    private direccion: string;
    private listaAutos: Array<Auto>;

    public constructor(nombre:string, direccion: string, listaAutos: Array<Auto>){
        this.nombre = nombre;
        this.direccion = direccion;
        this.listaAutos = listaAutos;
    }

    public getlistaAutos() : Array<Auto> {
        return this.listaAutos;
    }

    public mostrarAutos(): void {
        console.log(this.nombre);
        console.log(this.direccion);
        console.log(this.listaAutos);
    }

}

// Creo un gestor que permite leer un archivo de texto
class GestorDeArchivos {

    private arregloString: string[];

    constructor(txtFileLocation: string) {

        let archivoTxt: string = fs.readFileSync(txtFileLocation, 'utf-8'); 
        this.arregloString = archivoTxt.split(';');  
    
    }

    public mostrarArreglo(): void {
        console.log(this.arregloString);
    }

    public getArregloString(): string[] {
        return this.arregloString;
    }

}

// Función para crear un auto
function crearAuto(auto: string, arrayAuto: Array<Auto>) : void{

    let propiedadAuto : string[] = auto.split(',');
    let patente: string = propiedadAuto[0];
    let marca: string = propiedadAuto[1];
    let modelo: string = propiedadAuto[2];
    let año: number = Number(propiedadAuto[3]);
    let nuevoAuto : Auto = new Auto(patente,marca,modelo,año);

    arrayAuto.push(nuevoAuto);
}

// Función para agregar un auto
function agregarAuto(arregloAuto: Array<Auto>){
    let patente: string= ReadlineSync.question("Ingrese pantente (AA000AA): ");
    let marca: string= ReadlineSync.question("Ingrese la marca del vehiculo: ");
    let modelo: string= ReadlineSync.question("Ingrese el modelo del vehiculo: ");
    let año: number= ReadlineSync.questionInt("Ingrese el año del vehiculo: ");
    let nuevoAuto: Auto = new Auto(patente,marca,modelo,año);
    arregloAuto.push(nuevoAuto);
}

// Función para modificar un auto
function modificarAuto (arregloAuto: Array<Auto>){
    let posicion: number = ReadlineSync.questionInt("Elija posicion a modificar entre 1 y "+arregloAuto.length +": ");
    let patente: string= ReadlineSync.question("Ingrese pantente (AA000AA): ");
    let marca: string= ReadlineSync.question("Ingrese la marca del vehiculo: ");
    let modelo: string= ReadlineSync.question("Ingrese el modelo del vehiculo: ");
    let año: number= ReadlineSync.questionInt("Ingrese el año del vehiculo: ");
    let autoModificado: Auto = new Auto(patente,marca,modelo,año);
    delete arregloAuto[(posicion-1)];
    arregloAuto[(posicion-1)] = autoModificado;
}

// Función para borrar un auto
function borrarAuto(arregloAuto: Array<Auto>){
    let posicion: number = ReadlineSync.questionInt("Elija posicion a borrar entre 1 y "+arregloAuto.length +": ");
    delete arregloAuto[(posicion-1)];
}

// Iniciar programa
let datos: GestorDeArchivos = new GestorDeArchivos("autos.txt");
let listaAutos : Array<Auto> = [];
for (let i : number= 0; i < datos.getArregloString().length; i++){
    crearAuto(datos.getArregloString()[i], listaAutos);
}
let registro: RegistroAutomotor = new RegistroAutomotor("RNPA Nº1","San Martin 352",listaAutos)

// Creo el menu
let opcion: number=0;

while (opcion !== 5) {
  console.log("*********************");
  console.log("* Menu de opciones: *");
  console.log("* 1-Mostrar         *");
  console.log("* 2-Agregar         *");
  console.log("* 3-Modificar       *");
  console.log("* 4-Borrar          *");
  console.log("* 5-Salir           *");
  console.log("*********************");

  opcion = ReadlineSync.questionInt("Elija una opcion: ")
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