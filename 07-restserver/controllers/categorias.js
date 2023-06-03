const { response } = require('express')
const { Categoria } = require('../models')

// obtenerCategorias - paginado - total - populate
// 


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
}

module.exports = {
  crearCategoria
}