import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl } from '../../infrastructure/datasources/auth.datasource.impl';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/auth.repositories.impl';

export class AuthRoutes {

  static get routes(): Router { // A menos que quieramos realizar injección de dependencias, no es necesario crear una instancia de la clase
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl( datasource );
    // La injección de dependencias sirve para que el controller no tenga que saber de donde viene la data
    const controller = new AuthController( authRepository ); // Aqui realizo la injedcción de dependencias
    // y que la data que recibe es del tipo que el controller espera

    // Definir todas mis rutas principales
    router.use('/login', controller.loginUser)
    router.use('/register', controller.registerUser)

    return router;
  }
}

