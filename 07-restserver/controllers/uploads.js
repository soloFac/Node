const { response } = require( 'express' )
const { subirArchivo } = require( '../helpers/subirArchivo' )

const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

const cargarArchivo = async ( req, res = response ) => {
  if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.archivo ) {
    res.status( 400 ).json( { msg: 'No hay archivos que subir' } )
    return
  }

  console.log( 'req.files >>>', req.files )

  const nombre = await subirArchivo( req.files, extensionesValidas )

  res.json( {
    nombre
  } )
}

module.exports = {
  cargarArchivo
}
