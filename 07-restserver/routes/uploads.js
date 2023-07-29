const { Router } = require( 'express' )
const { check } = require( 'express-validator' )

const { validarCampos } = require( '../middlewares/validar-campos' )
const { cargarArchivo, actualizarImagen } = require( '../controllers/uploads' )
const { coleccionesPermitidas } = require( '../helpers/db-validators' )
const { validarArchivoSubir } = require( '../middlewares' )

const router = Router()

router.post( '/', validarArchivoSubir, cargarArchivo )

router.put( '/:coleccion/:id', [
  validarArchivoSubir,
  check( 'id', 'El id debe ser de mongo' ).isMongoId(),
  check( 'coleccion' ).custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
  validarCampos
], actualizarImagen )

module.exports = router
