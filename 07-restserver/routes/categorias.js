const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { crearCategoria } = require('../controllers/categorias')

const router = Router()

/**
 * {{url}}/api/cateogiras
 */

// Obtener todas las categorias - publico
router.get('/', ( req, res ) => {
  res.json('get')
})

// Obtener una categoria por id - publico
router.get('/:id', ( req, res ) => {
  res.json('get - id')
})

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
],
  crearCategoria
)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', ( req, res ) => {
  res.json('put')
})

// Borrar una categoria - Admin
router.delete('/:id', ( req, res ) => {
  res.json('delete')
})


module.exports = router