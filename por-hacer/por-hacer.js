
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () =>{
    // para grabar, json a json valido
    let data = JSON.stringify(listadoPorHacer);
    
    // sobrescribimos
    fs.writeFile('database/data.json', data, (err) =>{
        if ( err ) throw new Error('No se pudo grabar', err );
    });
}

const cargarDB = () =>{
    try {
        // haremos un require y al detectar que es un json lo serializa
        listadoPorHacer = require('../database/data.json');
    } catch (error) {
        listadoPorHacer = []; // en caso de no tener nada coloco un array vacio
    } 
}

// funciones
const crear = (descripcion) => {

    cargarDB();

    let porHacer ={
        descripcion,
        completado: false
    };

    listadoPorHacer.push( porHacer );

    // Grabar
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar =( descripcion, completado = true )=>{
    // queremos actualizar la tarea que coinsida con la descripción que enviamos por parametro
    cargarDB();
    // findIndex : recibe un callback y va hacer un ciclo interno por cada uno de los elementos
    let index = listadoPorHacer.findIndex( tarea =>{
        // como encontrar un elemento en particular
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        // cambiar la propiedad completado
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }else{
        return false;
    }

}

const borrar = ( descripcion ) => {
    cargarDB();

    // filter me permite quitar o filtrar un elemento en particular y esta regresa un nuevo arreglo
    let nuevoListado = listadoPorHacer.filter( tarea => {
        // regresar elementos que no coincidan con esta condición
        return  tarea.descripcion !== descripcion; // lo excluyo del listado
    });

  
    if (listadoPorHacer.length === nuevoListado ) {
        return false;  // si el listadoPorHaccer tienen el mismo arreglo ( Nada se borró)
    }else{
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
