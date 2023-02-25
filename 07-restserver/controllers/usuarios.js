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
  res.status(201).json({
    msg: 'post API'
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