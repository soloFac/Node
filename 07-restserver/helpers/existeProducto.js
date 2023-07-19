/* @type {mongodb.Db} */
const { Producto } = require("../models")

const existeProducto = async ( id ) => {
  const producto = await Producto.findById( id )
  // console.log( 'Producto: ', Producto )
  if ( !producto ) {
    throw new Error(`La Producto con el id ${ id } no existe`)
  }
}

module.exports = {
  existeProducto
}