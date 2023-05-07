const { Router } = require('express')
const { check } = require('express-validator')

// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt')
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles')

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios')

const router = Router()

// En el server ya estoy configurando la ruta para '/api/usuario'
router.get('/', usuariosGet)

router.put('/:id', [
  // check puede darse cuenta de los parametros o los segmentos -> URL
  check('id', 'No es un ID válido').isMongoId(), // Verifico que es un Id valido de Mongo.
  check('id').custom( existeUsuarioId ),  // Verifico que el id de Mongo valido esta registrado.
  check('rol').custom( esRoleValido ),  
  validarCampos // Para que no continue a la ruta si hay algun error.
],
usuariosPut)

router.post('/', [
  // MIDDLEWARES
  // El check va preparando los errores, esta creando en la req todos los errores de estos middlewares
  // le especifico que campo del body quiero checkear
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de tener más de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( emailExiste ),  // correo es enviado como parametro a emailExiste
  // check('rol').custom( (rol) => esRoleValido(rol) ),
  check('rol').custom( esRoleValido ),  // Cuando el parametro tiene el mismo nombre se lo puede simplificar de esta manera.
  validarCampos // recibe el req, res, next
] ,usuariosPost)

router.delete('/:id',[
  // Aquí solo estoy enviando la referencia de la función
  validarJWT,
  // Aqui estoy intentando ejecutar la función, por lo tanto tengo que retornar una función
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
  check('id', 'No es un ID válido').isMongoId(), // Verifico que es un Id valido de Mongo.
  check('id').custom( existeUsuarioId ),  // Verifico que el id de Mongo valido esta registrado.,
  validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router

