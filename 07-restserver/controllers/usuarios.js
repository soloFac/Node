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

  // - Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo })
  if( existeEmail ) {
    return res.status(400).json({
      msg: 'Ese correo ya existe!'
    })
  }

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

const usuariosPut = ((req, res) => {
  const { id } =  req.params
  
  res.status(201).json({
    msg: 'put API',
    id
  })
})

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