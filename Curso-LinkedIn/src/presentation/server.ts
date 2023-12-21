import express, { Router } from 'express'

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  // Tratando de aplicar SRP (single responsibility principle)
  // Y que cuando se quiera aplicar que cuando queramos hacer modificaciones en nuestro servidor, lo hagamos mediante argumentos
  // Deben estar abiertas a la expansion pero cerrada a su modificación
  constructor( options: Options ) { // Como debo enviar más de 3 argumentos es mejor enviar un objeto
    const { port = 3100, routes } = options

    this.port = port;
    this.routes = routes;
  } 

  async start() {
    // Middlewares
    this.app.use( express.json() )
    this.app.use( express.urlencoded({ extended: true })) // x-www-form-urlencoded

    // Usar las rutas definidas
    this.app.use( this.routes );

    // process.env.PORT -> Esto crea una dependencia oculta
    // Para evitar las dependencias ocultas, vamos a crear una dependencia explicita
    this.app.listen( this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
  }
}