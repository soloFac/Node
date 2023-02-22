require('dotenv').config()

const { pausa, inquirerMenu, leerInput } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

console.log(process.env)

const main = async () => {
  const busquedas = new Busquedas()

  let opt;
  do {
    opt = await inquirerMenu()

    switch( opt ) {
      case 1:
        // Mostrar mensaje
        const lugar = await leerInput('Ciudad: ');
        await busquedas.ciudad(lugar)

        // Buscar el lugar

        // Seleccionar el lugar

        // Clima
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad: ', )
        console.log('Lat: ', )
        console.log('Lng: ', )
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