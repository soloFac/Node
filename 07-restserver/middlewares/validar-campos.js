const { validationResult } = require("express-validator")

const validarCampos = ( req, res, next ) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  // Para seguir con el siguiente middleware, que continue
  next()
}

module.exports = {
  validarCampos
}