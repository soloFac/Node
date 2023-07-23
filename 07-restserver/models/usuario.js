const { Schema, model } = require( 'mongoose' )

const UsuarioSchema = Schema( {
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatorio']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    default: 'USER_ROLE',
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
} )

// Sobre-escribo la funcion toJSON definida en el Schema, para que al pasarle como argumento usuario
// ya no retorne la __v ni el password
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

// Mongoose va a ponerle a la coleccion Usuarios
module.exports = model( 'Usuario', UsuarioSchema )
