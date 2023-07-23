const jwt = require( 'jsonwebtoken' )

const generarJWT = ( uid = '' ) => {
  return new Promise( ( resolve, reject ) => {
    // Se podría grabar toda la información que se quiera en el payload
    const payload = { uid }

    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, ( err, token ) => {
      if ( err ) {
        console.log( err )
        reject( new Error( 'No se pudo generar el token' ) )
      } else {
        resolve( token )
      }
    } )
  } )
}

module.exports = {
  generarJWT
}
