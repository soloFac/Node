const { pausa, inquirerMenu } = require('./helpers/inquirer')

const main = async () => {

  let opc = 9999

  do {
    opc = await inquirerMenu()

    if ( opc !== 0 ) { await pausa() }
  } while (opc !== 0)

}


main()