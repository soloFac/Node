import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {

  static get routes(): Router { // A menos que quieramos realizar injección de dependencias, no es necesario crear una instancia de la clase
    const router = Router();
    const controller = new AuthController();

    // Definir todas mis rutas principales
    router.use('/login', controller.loginUser)
    router.use('/register', controller.registerUser)

    return router;
  }
}

