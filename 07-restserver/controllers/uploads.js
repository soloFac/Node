const path = require( 'node:path' )
const fs = require( 'node:fs' )

const { response } = require( 'express' )
const { subirArchivo } = require( '../helpers/subirArchivo' )
const { Usuario, Producto } = require( '../models' )

const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

const cargarArchivo = async ( req, res = response ) => {
  try {
    const nombre = await subirArchivo( req.files, extensionesValidas, 'imgs' )

    res.json( {
      nombre
    } )
  } catch ( msg ) {
    res.status( 400 ).json( {
      msg
    } )
  }
}

const actualizarImagen = async ( req, res = response ) => {
  const { id, coleccion } = req.params

  let modelo

  switch ( coleccion ) {
  case 'usuarios':
    modelo = await Usuario.findById( id )
    if ( !modelo ) {
      return res.status( 400 ).json( {
        msg: `No existe un usuario con el id ${ id }`
      } )
    }
    break
  case 'productos':
    modelo = await Producto.findById( id )
    if ( !modelo ) {
      return res.status( 400 ).json( {
        msg: `No existe un producto con el id ${ id }`
      } )
    }
    break
  default:
    return res.status( 500 ).json( { msg: 'Se me olvidó validar esto' } )
  }

  // Limpiar imagenes previas
  if ( modelo.img ) {
    // Hay que borrar la img del servidor
    const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img )
    if ( fs.existsSync( pathImagen ) ) {
      fs.unlinkSync( pathImagen ) // Borra el archivo
    }
  }

  const nombre = await subirArchivo( req.files, extensionesValidas, coleccion )
  modelo.img = nombre

  await modelo.save()

  res.json( { modelo } )
}

const mostrarImagen = async ( req, res = response ) => {
  const { id, coleccion } = req.params

  let modelo

  switch ( coleccion ) {
  case 'usuarios':
    modelo = await Usuario.findById( id )
    if ( !modelo ) {
      return res.status( 400 ).json( {
        msg: `No existe un usuario con el id ${ id }`
      } )
    }
    break
  case 'productos':
    modelo = await Producto.findById( id )
    if ( !modelo ) {
      return res.status( 400 ).json( {
        msg: `No existe un producto con el id ${ id }`
      } )
    }
    break
  default:
    return res.status( 500 ).json( { msg: 'Se me olvidó validar esto' } )
  }

  // Limpiar imagenes previas
  if ( modelo.img ) {
    // Hay que borrar la img del servidor
    const pathImagen = path.join( __dirname, '../uploads/', coleccion, modelo.img )
    if ( fs.existsSync( pathImagen ) ) {
      return res.sendFile( pathImagen )
    }
  }

  // res.json( { msg: 'Falta palce holder' } )
  const pathNoImage = path.join( __dirname, '../assets/no-image.png' )
  return res.sendFile( pathNoImage )
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen
}
