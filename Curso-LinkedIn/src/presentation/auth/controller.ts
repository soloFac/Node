import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';

export class AuthController {
  constructor() { // Aqui si voy a utilizar injección de dependencias

  }

  // Las buenas practicas de express recomiendan que los controladores sean funciones puras, no asincronos
  // Puede ser asincronos, pero no se recomienda
  registerUser = async( req: Request, res: Response ) => {
    const [ error, registerUserDTO ] = RegisterUserDto.create( req.body );
    if ( error ) return res.status(400).json({ error })

    res.json( registerUserDTO )
  }

  loginUser = async( req: Request, res: Response ) => {
    res.json('loginUser Controller') 
  }
}