const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = async (req, res) => {
  const { limite: lim = 5, desde = 5 } = req.query
  console.log(typeof lim);
  // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query
  // TODO: Realizar validaciones. Controlar los errores que puedan ocurrir en el QueryParams, puede venir un string 'sdfgh' en lugar de un numero valido.
  const usuarios = await Usuario.find()
    .skip(desde)
    .limit(lim) // Ya no es necesario utilizar Number porque limit también puede recibir strings, porque viene desde el query como un string
  // Limitamos los usuarios por cuestiones de tamaño en la información

  res.json({
    usuarios
  })
}

const usuariosPost = async (req, res) => {

  const { nombre, correo, password, rol } = req.body
  // A pesar de que le envie campos que no estan definidos en el modelo, estos seran ignorados y no seran grabados
  const usuario = new Usuario( { nombre, correo, password, rol } )

  // - Encriptar la contraseña
  // Salt es el numero de vueltas que se quiere hacer para hacer mas complicado la encriptacion, tambien tardara mas en generarse
  // Es un Hash de 1 sola via
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync( password, salt )

  // - Guardar en la base de datos
  await usuario.save()

  res.status(201).json({
    msg: 'post API',
    usuario
  })
}

const usuariosPut = async (req, res) => {
  // Extraigo lo que viene de la URL
  const { id } =  req.params
  // Si enviamos en el body _id, aquí no deberiamos procesarlo, por lo tanto lo extraemos
  const { _id, password, google, ...info } = req.body
  
  // TODO validar contra base de datos
  if ( password ) { // Significa que desea actualizar su contraseña
    // Podriamos hacer una ruta especial, asegurarnos de que sea la misma persona que quiere actualizar su contraseña, infinidad de validaciones que se pueden hacer
    // Luego se validaran las rutas contra diferentes accesos y errores
    const salt = bcryptjs.genSaltSync()
    info.password = bcryptjs.hashSync( password, salt )
  }

  const usuario = await Usuario.findByIdAndUpdate( id, info )

  // Me regresa un _id pero no es el mismo
  res.status(201).json(usuario)
}

const usuariosDelete = ((req, res) => {
  res.json({
    msg: 'delete API'
  })
})

const usuariosPatch = ((req, res) => {
  res.json({
    msg: 'patch API'
  })
})

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch
}