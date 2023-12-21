import { Request, Response } from 'express'
import { AuthRepository, RegisterUserDto } from '../../domain';

export class AuthController {
  constructor(
    private readonly authRepository: AuthRepository,
  ) { // Aqui si voy a utilizar injección de dependencias
 
  }

  // Las buenas practicas de express recomiendan que los controladores sean funciones puras, no asincronos
  // Puede ser asincronos, pero no se recomienda
  registerUser = async ( req: Request, res: Response ) => {
    const [ error, registerUserDto ] = RegisterUserDto.create( req.body );
    if ( error ) return res.status(400).json({ error })

    this.authRepository.register( registerUserDto! )
      .then( user => res.json( user ))
      .catch( error => res.status( 500 ).json(error) )
  }

  loginUser = async( req: Request, res: Response ) => {
    res.json('loginUser Controller') 
  }
}