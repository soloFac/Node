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
        if( id === '0' ) continue

        const lugarSel = lugares.find( l => l.id === id )
        const { nombre, lng, lat } = lugarSel;

        // Guardar en DB
        busquedas.agregarHistorial( nombre )

        // Clima
        const { desc, temp, min, max } = await busquedas.climaLugar( lat, lng )
        
        console.log('\nInformación de la ciudad\n'.green)
        console.log(`Ciudad: ${ nombre }`.green)
        console.log(`Lat: ${ lat }`.green)
        console.log(`Lng: ${ lng }`.green)
        console.log(`Temperatura: ${ temp }`.green)
        console.log(`Mínima: ${ min }`.green)
        console.log(`Máxima: ${ max }`.green)
      break;

      case 2:
        busquedas.historial.forEach( ( lugar, i ) => {
          const idx = `${ i + 1 }.`.green;
          console.log(`${ idx } ${ lugar }`)
        })
      break;
    }

    if ( opt !== 0 ) { await pausa() }
  } while (opt !== 0)

}


main()