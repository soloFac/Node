const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async ( rol = '' ) => {
  const existeRol = await Role.findOne({ rol });
  if ( !existeRol ) {
    // Este es un error personalizado que va a ser atrapado aqui en el custom. No va a romper nuestra aplicación de Node
    throw new Error(`El rol ${ rol } no está registrado en la BD`)
  }
  // Si no regresamos un error significa que pasa la validacion
}

const emailExiste = async ( correo = '' ) => {
    // - Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ) {
      throw new Error(`El email --${ correo }-- ya se encuentra registrado en la BD`)
    }
}

const existeUsuarioId = async ( id ) => {
  const existeUsuario = await Usuario.findById( id )
  // console.log(existeUsuario)
  if ( !existeUsuario ) {
    throw new Error(`El id ${ id } no existe en la BD`)
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioId
}