const { Router } = require('express')
const { check } = require('express-validator')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios')

const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste } = require('../helpers/db-validators')

const router = Router()

// En el server ya estoy configurando la ruta para '/api/usuario'

router.get('/', usuariosGet)

router.put('/:id', usuariosPut)

router.post('/', [
  // MIDDLEWARES
  // El check va preparando los errores, esta creando en la req todos los errores de estos middlewares
  // le especifico que campo del body quiero checkear
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de tener más de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( emailExiste ),
  // check('rol').custom( (rol) => esRoleValido(rol) ),
  check('rol').custom( esRoleValido ),
  // validarCampos recibe el req, res, next
  validarCampos
] ,usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router

