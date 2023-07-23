const { response } = require('express')
const { Producto } = require('../models')

// obtenerproductos: paginado - total - populate (propio de mongoose: se puede hacer la relacion, para que se tenga toda la información del usuario con el id)
// obtenerProducto: populate

const obtenerProductos = async ( req, res = response ) => {
  const { limite: lim = 5, desde = 0 } = req.query
  const query = { estado: true }

  const [total, productos] = await Promise.all([
    Producto.countDocuments( query ),
    Producto.find( query ).populate( 'usuario', 'nombre' )
                          .populate( 'categoria', 'nombre' )
      .skip( desde )
      .limit( lim ) 
  ])
  res.json({
    total,
    productos
  })
}

const obtenerProducto = async ( req, res = response ) => {
  const { id } = req.params
  const productoDB = await Producto.findOne({ _id: id })
    .populate( 'usuario', 'nombre' )
    .populate( 'categoria', 'nombre' )
  
  const { _id, nombre, estado, precio, usuario, categoria } = productoDB
  return res.json({
    _id,
    nombre,
    estado,
    precio,
    usuario,
    categoria
  })
}

// Producto = {
//   nombre,
//   descripcion,
//   precio = 0,
//   categoria
// }
const crearProducto = async ( req, res = response ) => {
  const { nombre, ...body } = req.body
  const nombreMayus = nombre.toUpperCase()
  
  const productoDB = await Producto.findOne({ nombre: nombreMayus })
  if ( productoDB ){  //- Podria no realizar esta validación porque el campo en el model esta como UNIQUE, solo realizar un try-catch para que la aplicacion no se caiga
    return res.status(400).json({
      msg: `La producto [${ productoDB.nombre.toLowerCase() }], ya existe`
    })
  }
  // - Dependiendo de lo que se reciba, si es un idCategoria o si es el nombreCategoria
  // - Se podría realizar una validación en la base de datos antes de insertar la data

  const data = {
    nombre: nombreMayus, 
    ...body,
    usuario: req.usuario._id,
  }

  const producto = new Producto(data)
  await producto.save()

  res.status(201).json({ producto })
}

// Producto = {
//   nombre,
//   precio,
//   categoria,
//   descripcion,
//   disponible
// }
const actualizarProducto = async ( req, res = response ) => {   // No podre cambiar el estado aquí
  const { id } = req.params
  const { nombre, precio, categoria, descripcion, disponible } = req.body

  info = { nombre: nombre.toUpperCase(), precio, categoria, descripcion, disponible }

  const producto = await Producto.findByIdAndUpdate( id, info, { new: true } )
  res.status(200).json({
    producto
  })
}

// borrarProducto: estado = false
const borrarProducto = async ( req, res = response ) => {
  const { id } = req.params
  
  const producto = await Producto.findByIdAndUpdate( id, { estado: false } )

  res.status(200).json({
    producto
  })
}

module.exports = {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos
}
