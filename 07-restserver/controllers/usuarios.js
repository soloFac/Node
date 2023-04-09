const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = ( (req, res) => {
  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query

  res.json({
    msg: 'get API',
    q,
    nombre,
    apikey,
    page,
    limit
  })
})

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
  const { id } =  req.params
  const { password, google, ...info } = req.body
  
  // TODO validar contra base de datos
  if ( password ) { // Significa que desea actualizar su contraseña
    // Podriamos hacer una ruta especial, asegurarnos de que sea la misma persona que quiere actualizar su contraseña, infinidad de validaciones que se pueden hacer
    // Luego se validaran las rutas contra diferentes accesos y errores
    const salt = bcryptjs.genSaltSync()
    info.password = bcryptjs.hashSync( password, salt )
  }

  const usuario = await Usuario.findByIdAndUpdate( id, info )

  res.status(201).json({
    msg: 'put API',
    usuario
  })
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