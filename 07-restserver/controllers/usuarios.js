const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = async (req, res) => {
  const { limite: lim = 5, desde = 0 } = req.query
  const query = { estado: true }

  // Para disparar ambas respuestas de manera simultanea lo que voy a hacer es lo siguiente:
  // Hay que poner el await para que ejecute las promesasa, si una da error, todas dan error
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
      .skip( desde )
      .limit( lim )
  ])

  res.json({
    total, 
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

  // - Guardo en la base de datos
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

const usuariosDelete = async (req, res) => {
  const { id } = req.params

  // Físicamente lo borramos
  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })

  res.json({
    usuario
  })
}

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