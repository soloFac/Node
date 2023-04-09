const Role = require('../models/role')

const esRoleValido = async ( rol = '' ) => {
  const existeRol = await Role.findOne({ rol });
  if ( !existeRol ) {
    // Este es un error personalizado que va a ser atrapado aqui en el custom. No va a romper nuestra aplicación de Node
    throw new Error(`El rol ${ rol } no está registrado en la BD`)
  }
  // Si no regresamos un error significa que pasa la validacion
}

module.exports = {
  esRoleValido
}