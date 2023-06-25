const { response } = require('express')
const { Producto } = require('../models')

// obtenerproductos: paginado - total - populate (propio de mongoose: se puede hacer la relacion, para que se tenga toda la información del usuario con el id)
// obtenerProducto: populate

const obtenerProductos = async ( req, res = response ) => {

}

const obtenerProducto = async ( req, res = response ) => {

}

const crearProducto = async ( req, res = response ) => {

}

const actualizarProducto = async ( req, res = response ) => {

}

// borrarProducto: estado = false
const borrarProducto = async ( req, res = response ) => {

}

module.exports = {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProducto,
  obtenerProductos
}
