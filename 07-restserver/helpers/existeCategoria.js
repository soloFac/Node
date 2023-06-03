/* @type {mongodb.Db} */
const { Categoria } = require("../models")

const existeCategoria = async ( id ) => {
  const categoria = await Categoria.findById( id )
  // console.log( 'categoria: ', categoria )
  if ( !categoria ) {
    throw new Error(`La categoria con el id ${ id } no existe`)
  }
}

module.exports = {
  existeCategoria
}