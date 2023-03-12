const { response, request } = require('express')
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
  const body = req.body
  // A pesar de que le envie campos que no estan definidos en el modelo, estos seran ignorados y no seran grabados
  const usuario = new Usuario( body )

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