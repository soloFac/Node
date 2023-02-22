require('dotenv').config()

const { pausa, inquirerMenu, leerInput, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async () => {
  const busquedas = new Busquedas()

  let opt;
  do {
    console.clear()
    opt = await inquirerMenu()

    switch( opt ) {
      case 1:
        // Mostrar mensaje
        const entrada = await leerInput('Ciudad: ');
        const lugares = await busquedas.ciudad( entrada )

        const id = await listarLugares( lugares )

        const lugarSel = lugares.find( l => l.id === id )
        const { nombre, lng, lat } = lugarSel;

        // Buscar el lugar

        // Seleccionar el lugar

        // Clima
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad: ', nombre)
        console.log('Lat: ', lat)
        console.log('Lng: ', lng)
        console.log('Temperatura: ', )
        console.log('Mínima: ', )
        console.log('Máxima: ', )
      break;

      case 2:

      break;
    }

    if ( opt !== 0 ) { await pausa() }
  } while (opt !== 0)

}


main()