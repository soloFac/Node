import { Validators } from "../../../config";

export class RegisterUserDto {
  // Para evitar que otro desarrollador lo utilice con el constructor directamente lo ponemos como privado
  private constructor( // Si no vienen estas propiedades voy a lanzar errores, etc.
    public name: string,
    public email: string,
    public password: string
  ) { }
  // Quiero tomar todos mis datos de mi body para crear mi DTO 
  static create( object: { [ key: string ]: unknown } ): [ string?, RegisterUserDto? ]{
    // Definir las reglas de como quiero validar mi objeto y transformar lo que yo recibo a algo que cumpla mi RegisterUserDTO
    // Se lo puede resumir si utilizamos paquetes de terceros como express validator
    typeof object.password
    // object.password = object.password.toString() as string;
    const { name, email, password } = object;

    
    if( !name || !email || !password ) {
      return [ 'Missing data' ];
    }
    
    if ( typeof name !== 'string' || name.length < 3 ) {
      return [ 'Name must be at least 3 characters' ];
    }
    
    if ( typeof password !== 'string' || password.length < 6 ) {
      return [ `Password [type]: ${typeof password} must be at least 6 characters` ];
    }

    if ( typeof email !== 'string' || !Validators.email.test( email ) ){
      return [ 'Invalid email' ];
    }

    return [
      undefined,
      new RegisterUserDto( name , email , password ) // Por ello lo pongo de esta forma, porque solo quiero que pueda ser de esta forma creado
    ];
  }
}