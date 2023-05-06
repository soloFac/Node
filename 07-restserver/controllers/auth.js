const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const login = async ( req, res = response ) => {
  const { correo, password } = req.body

  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo })
    if ( !usuario ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }
    // Si el usuario esta activo en la base de datos
    if ( !usuario.estado ) {
      return res.status(400).json({
        msg: 'Usuario/ Password no son correctos - estado: false'
      })
    }
    // Verificar la contraseña
    // console.log('password: ', password, typeof password);
    // console.log('Usuario password: ', usuario.password, typeof usuario.password);
    const validPassword = bcryptjs.compareSync( password, usuario.password )
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'Usuario/ Password no son correctos - password'
      })
    }
    // Generar el JWT

    res.json({
      msg: 'Login ok',
      correo, password
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  login
}