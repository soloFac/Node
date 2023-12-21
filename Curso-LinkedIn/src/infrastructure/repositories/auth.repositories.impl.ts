import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";


// La idea es que el repsoitory sea el encargado de hacer la logica de negocio
// y el datasource sea el encargado de hacer las consultas a la base de datos
// y retornar los datos en forma de entidades

// El repositorio se queda igual, solo cambia el datasource ( Mongo, Postgres, etc )
export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register( registerUserDto )
  }

}