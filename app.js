// const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');

const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        // console.log('crear por hacer');
        let tarea = porHacer.crear( argv.descripcion );
        console.log(tarea);

        break;
        
    case 'listar':
        // console.log('mostrar todas las tareas por hacer');
        let listado = porHacer.getListado();

        for (const tarea of listado ) {
            console.log('========= Por Hacer ========='.green);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('=============================');
            
        }
        break;

    case 'actualizar':
        // console.log('Actualiza tarea por hacer');
        // alamacenamos el resultado en una variable
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        // true si lo grabo y false indica que no lo grabo
        console.log(actualizado);

        break;

    case 'borrar':
        let borrado = porHacer.borrar( argv.descripcion );
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}