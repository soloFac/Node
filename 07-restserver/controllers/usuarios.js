const usuariosGet = ( (req, res) => {
  res.json({
    msg: 'get API'
  })
})

const usuariosPut = ((req, res) => {
  res.status(500).json({
    msg: 'put API'
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