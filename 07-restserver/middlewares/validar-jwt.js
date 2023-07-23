const { request } = require( 'express' )

const jwt = require( 'jsonwebtoken' )

const Usuario = require( '../models/usuario' )

// Recordar que en javascript todo se pasa por referencia
const validarJWT = async ( req = request, res = Response, next ) => {
  const token = req.header( 'x-token' )

  if ( !token ) {
    return res.status( 401 ).json( {
      msg: 'No hay token en la peticion'
    } )
  }

  try {
    // Si el jwt no es valido se va por la parte del catch
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById( uid )

    // Si no encuentra a nadie el usuario puede ser undefined
    if ( !usuario ) {
      return res.status( 401 ).json( {
        msg: 'Token no válido - usuario no existe DB'
      } )
    }

    // Verificar si el uid tiene estado true
    if ( !usuario.estado ) {
      return res.status( 401 ).json( {
        msg: 'Token no válido - usuario con estado: false'
      } )
    }

    req.usuario = usuario

    next()
  } catch ( error ) {
    console.log( error )
    res.status( 401 ).json( {
      msg: 'Token no valido'
    } )
  }
}

module.exports = {
  validarJWT
}
