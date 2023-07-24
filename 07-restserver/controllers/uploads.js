const path = require( 'node:path' )

const { v4: uuidv4 } = require( 'uuid' )

const { response } = require( 'express' )

const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

const validarExtension = ( ext ) => {
  // path.basename('/tmp/midu-secre-files/password.txt') // - Nombre del fichero -> password
  if ( extensionesValidas.includes( ext ) ) {
    return true
  }
  return false
}

const cargarArchivo = ( req, res = response ) => {
  if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.archivo ) {
    res.status( 400 ).json( { msg: 'No hay archivos que subir' } )
    return
  }

  console.log( 'req.files >>>', req.files )

  const { archivo } = req.files

  const ext = path.extname( archivo.name ).slice( 1 )

  if ( !validarExtension( ext ) ) {
    return res.status( 400 ).json( {
      msg: `La extensión ${ ext } no es permitida, ${ extensionesValidas }`
    } )
  }

  const nombreTemp = uuidv4() + '.' + ext

  const uploadPath = path.join( __dirname, '../uploads/', nombreTemp )

  archivo.mv( uploadPath, ( err ) => {
    if ( err ) {
      return res.status( 500 ).json( { err } )
    }
    res.json( 'File puloaded to ' + uploadPath )
  } )
}

module.exports = {
  cargarArchivo
}
