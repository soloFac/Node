const { Router } = require( 'express' )
const { check } = require( 'express-validator' )

const { validarCampos } = require( '../middlewares/validar-campos' )
const { validarJWT } = require( '../middlewares/validar-jwt' )
const { crearProducto, obtenerProducto, actualizarProducto, borrarProducto, obtenerProductos } = require( '../controllers/productos' )
const { existeProducto, existeValor } = require( '../helpers/existeProducto' )
const { esAdminRole } = require( '../middlewares' )
const { existeCategoria } = require( '../helpers/existeCategoria' )

const router = Router()

/**
 * {{url}}/api/cateogiras
 */

// Todo: validar el id utilizando un middleware
// todo: realizar validaciones que se consideren necesarias

// Obtener todas las Productos - publico
router.get( '/',
  obtenerProductos
)

// Obtener una Producto por id - publico
router.get( '/:id', [
  check( 'id', 'No es un id de Mongo Válido' ).isMongoId(),
  check( 'id' ).custom( existeProducto ),
  validarCampos
],
obtenerProducto
)

// Crear Producto - privado - cualquier persona con un token válido
router.post( '/', [
  validarJWT,
  check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
  check( 'categoria', 'No es un id de Mongo' ).isMongoId(),
  check( 'categoria' ).custom( existeCategoria ),
  validarCampos
],
crearProducto
)

// Actualizar - privado - cualquiera con token válido
router.put( '/:id', [
  validarJWT,
  check( 'categoria', 'No es un id de Mongo Válido' ).isMongoId(),
  check( 'id' ).custom( existeProducto ),
  validarCampos
],
actualizarProducto
)

// Borrar una Producto - Admin
router.delete( '/:id', [
  validarJWT,
  esAdminRole,
  check( 'id', 'No es un id de Mongo Válido' ).isMongoId(),
  validarCampos,
  check( 'id' ).custom( existeProducto )
],
borrarProducto
)

module.exports = router
