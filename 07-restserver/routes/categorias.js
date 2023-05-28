const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

/**
 * {{url}}/api/cateogiras
 */

router.get('/', ( req, res ) => {
  console.log('todo ok')
})

module.exports = router