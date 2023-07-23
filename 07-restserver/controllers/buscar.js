const { response } = require('express')
const { Usuario, Categoria, Producto } = require('../models')
const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
  'usuarios',
  'categoria',
  'productos',
  'roles'
]

const buscarUsuarios = async ( termino = '', res = response ) => {
  const esMongoID = ObjectId.isValid( termino )

  if ( esMongoID ) {
    const usuario = await Usuario.findById( termino )
    res.json({
      results: ( usuario ) ? [ usuario ] : []
    })
  }
}


const buscar = ( req, res = response ) => {
  const { coleccion, termino } = req.params

  if ( !coleccionesPermitidas.includes( coleccion ) ) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
    })
  }

  switch ( coleccion ) {
    case 'usuarios':
      buscarUsuarios(termino, res)
    break;
    case 'categoria':
    
    break;
    case 'productos':
    
    break;
  
    default:
      res.status(500).json({
        msg: 'Se le olvido hacer esta búsqueda'
      })
    break;
  }

  // res.json({
  //   coleccion,
  //   termino
  // })
}

module.exports = {
  buscar
}