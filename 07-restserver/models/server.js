const express = require( 'express' )
const cors = require( 'cors' )
const fileUpload = require( 'express-fileupload' )

const { dbConnection } = require( '../database/config' )

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // PATHS
    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      usuarios: '/api/usuarios',
      categorias: '/api/categorias',
      productos: '/api/productos',
      uploads: '/api/uploads'
    }

    // Conectar a DB
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes()
  }

  async conectarDB () {
    await dbConnection()
  }

  middlewares () {
    // CORS
    this.app.use( cors() )

    // Lectura y parseo del body - Cualquier informacion que venga aqui la va a intentar serializar a un JSON
    this.app.use( express.json() )

    // Directorio Publico
    this.app.use( express.static( 'public' ) )

    // Fileupload - Carga de Archivos
    this.app.use( fileUpload( {
      useTempFiles: true,
      tempFileDir: '/temp/',
      createParentPath: true
    } ) )
  }

  routes () {
    // Defino las rutas
    this.app.use( this.paths.auth, require( '../routes/auth' ) )
    this.app.use( this.paths.buscar, require( '../routes/buscar' ) )
    this.app.use( this.paths.usuarios, require( '../routes/usuarios' ) )
    this.app.use( this.paths.categorias, require( '../routes/categorias' ) )
    this.app.use( this.paths.productos, require( '../routes/productos' ) )
    this.app.use( this.paths.uploads, require( '../routes/uploads' ) )
  }

  listen () {
    this.app.listen( this.port, () => {
      console.log( 'Servidor corriendo en puerto ', this.port )
    } )
  }
}

module.exports = Server
