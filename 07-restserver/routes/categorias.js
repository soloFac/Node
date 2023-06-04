const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { crearCategoria, obtenerCategoria, actualizarCategoria, borrarCategoria, obtenerCategorias } = require('../controllers/categorias')
const { existeCategoria, existeValor } = require('../helpers/existeCategoria')

const router = Router()

/**
 * {{url}}/api/cateogiras
 */

// Todo: validar el id utilizando un middleware
// todo: realizar validaciones que se consideren necesarias

// Obtener todas las categorias - publico
router.get('/', 
  obtenerCategorias
)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id','No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoria )
  ],
  obtenerCategoria
)

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
],
  crearCategoria
)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id','No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoria )
  ],  
  actualizarCategoria
)

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    check('id','No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCategoria )
  ],
  borrarCategoria
)


module.exports = router