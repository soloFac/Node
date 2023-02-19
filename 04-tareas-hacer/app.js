require('colors')

const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { 
  inquirerMenu, 
  pausa,
  leerInput
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {
  console.log('Hola mundo')

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB()
  console.log(tareasDB)

  if ( tareasDB ) {
    // Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        // Crear opcion
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea( desc )
      break;

      case '2':
        tareas.listadoCompleto()
      break;
    }

    guardarDB( tareas.listadoArr )

    await pausa()
  } while (opt !== '0')

  // pausa()
}

main();