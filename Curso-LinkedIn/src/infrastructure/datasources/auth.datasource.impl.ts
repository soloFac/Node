import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";

// AuthMongoDatasourceImpl

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      // 1. Verificar si el correo existe
      const exists = await UserModel.findOne({ email })
      if ( exists ) throw CustomError.badRequest('User already exists')
  
      const user = await UserModel.create({
        name,
        email,
        password
      })

      // 2. Hash de contraseña

      await user.save()

      // 3. Mapear la respuesta a nuestra entidad
      // Todo: falta un mapper
      return new UserEntity(
        user.id,  // el id de mongo
        name,
        email,
        password,
        user.roles,
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