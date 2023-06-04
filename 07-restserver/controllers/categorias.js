const { response } = require('express')
const { Categoria } = require('../models')

// obtenerCategorias: paginado - total - populate (propio de mongoose: se puede hacer la relacion, para que se tenga toda la información del usuario con el id)
// obtenerCategoria: populate

const obtenerCategorias = async ( req, res = response ) => {
  const { limite: lim = 5, desde = 0 } = req.query
  const query = { estado: true }

  const [ total, categorias ] = await Promise.all([
    Categoria.countDocuments( query ),
    Categoria.find( query ).populate( 'usuario', 'nombre' )
      .skip( desde )
      .limit( lim )
  ])
  res.json({
    total,
    categorias
  })
}

const obtenerCategoria = async ( req, res = response ) => {
  const { id } = req.params
  const categoriaDB = await Categoria.findOne({ _id: id }).populate( 'usuario', 'nombre' )

  const { _id, nombre, estado, usuario } = categoriaDB;
  return res.json({
    _id,
    nombre,
    estado,
    usuario
  })
}

const crearCategoria = async ( req, res = response ) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre })
  if ( categoriaDB ) {
    return res.status(400).json({
      msg: `La categoria ${ categoriaDB.nombre }, ya existe`
    })
  }
  const data = {
    nombre,
    //Porque req tiene el usuario
    usuario: req.usuario._id //Así es como Mongo los esta grabando
  }
  const categoria = new Categoria(data)
  await categoria.save()

  res.status(201).json({ categoria })
}

const actualizarCategoria = async ( req, res = response ) => {
  const { id } = req.params
  const { nombre: nombreCat, estado } = req.body
  
  let info = { nombre: nombreCat.toUpperCase() }
  if ( estado ) {
    info = { ...info, estado }
  }
  
  const categoria = await Categoria.findByIdAndUpdate( id, info )

  res.status(200).json({ categoria })
}

// borrarCategoria: estado = false
const borrarCategoria = async ( req, res = response ) => {
  const { id } = req.params

  const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } )

  res.status(200).json({ categoria })
}

module.exports = {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
  borrarCategoria
}
