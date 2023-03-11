const { response, request } = require('express')

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

const usuariosPost = ((req, res) => {
  const { id, nombre, apellido, edad } = req.body

  res.status(201).json({
    msg: 'post API',
    nombre,
    apellido,
    edad
  })
})

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