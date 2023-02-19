const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      ` ${ '1.'.green } Crear una tarea`,
      ` ${ '2.'.green } Listar tareas`,
      ` ${ '3.'.green } Listar tareas completadas`,
      ` ${ '4.'.green } Listar tareas pendientes`,
      ` ${ '5.'.green } Completar tarea(s)`,
      ` ${ '6.'.green } Borrar una tarea`,
      ` ${ '0.'.green } Salir`
    ]
  }
]

const inquirerMenu = async () => {
  console.clear()
  console.log('========================'.green)
  console.log(' Seleccione una opción '.green)
  console.log('========================'.green)

  const opt = await inquirer.prompt(preguntas)

  return opt
}


module.exports = {
  inquirerMenu
}