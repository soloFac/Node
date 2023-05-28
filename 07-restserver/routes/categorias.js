const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

/**
 * {{url}}/api/cateogiras
 */

// Obtener todas las categorias - publico
router.get('/', ( req, res ) => {
  console.log('get')
})

// Obtener una categoria por id - publico
router.get('/:id', ( req, res ) => {
  console.log('get - id')
})

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', ( req, res ) => {
  console.log('post')
})

// Actualizar - privado - cualquiera con token válido
router.put('/:id', ( req, res ) => {
  console.log('put')
})

// Borrar una categoria - Admin
router.delete('/:id', ( req, res ) => {
  console.log('delete')
})


module.exports = router