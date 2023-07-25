const path = require( 'node:path' )
const { v4: uuidv4 } = require( 'uuid' )

const subirArchivo = ( files, extensionesValidas, carpeta = '' ) => {
  return new Promise( ( resolve, reject ) => {
    const { archivo } = files

    const ext = path.extname( archivo.name ).slice( 1 )

    if ( !extensionesValidas.includes( ext ) ) {
      return reject( `La extensión ${ ext } no es permitida, ${ extensionesValidas }` )
    }

    const nombreTemp = uuidv4() + '.' + ext
    const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp )

    archivo.mv( uploadPath, ( err ) => {
      if ( err ) {
        return reject( { err } )
      }
      return resolve( nombreTemp )
    } )
  } )
}

module.exports = {
  subirArchivo
}
