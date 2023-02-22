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

        // Buscar los lugares
        const lugares = await busquedas.ciudad( entrada )

        // Seleccionar el lugar
        const id = await listarLugares( lugares )
        const lugarSel = lugares.find( l => l.id === id )

        const { nombre, lng, lat } = lugarSel;

        // Clima
        const { desc, temp, min, max } = await busquedas.climaLugar( lat, lng )
        
        console.log('\nInformación de la ciudad\n'.green)
        console.log(`Ciudad: ${ nombre }`)
        console.log(`Lat: ${ lat }`)
        console.log(`Lng: ${ lng }`)
        console.log(`Temperatura: ${ temp }`)
        console.log(`Mínima: ${ min }`)
        console.log(`Máxima: ${ max }`)
      break;

      case 2:

      break;
    }

    if ( opt !== 0 ) { await pausa() }
  } while (opt !== 0)

}


main()