const { Router } = require('express')
const { check } = require('express-validator')
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

const router = Router()

// En el server ya estoy configurando la ruta para '/api/usuario'

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', [
  // El check va preparando los errores, esta creando en la req todos los errores de estos middlewares
  check('correo', 'El correo no es valido').isEmail()
] ,usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router