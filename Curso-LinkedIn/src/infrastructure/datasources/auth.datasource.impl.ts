import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      // 1. Verificar si el correo existe
      if( 'fernando@microsoft.com' === email ) {
        throw CustomError.badRequest('El correo ya existe')
      }
  
      // 2. Hash de contraseña
      
      // 3. Mapear la respuesta a nuestra entidad
      return new UserEntity(
        '1',
        name,
        email,
        password,
        ['ADMIN_ROLE'],
      )
  
      // 4. Guardar en la base de datos
    } catch (error) {
      if( error instanceof CustomError ) {
        throw error
      }
      throw CustomError.internalServerError()
    }
  }

  
}