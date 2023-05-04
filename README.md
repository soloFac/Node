# Node

# Sección 10
Muchas personas tienen la falsa idea de que un JWT es sumamente seguro, 
pero es sumamente popular porque permite una autenticación pasiva del lado del cliente,
ese token es utilizado para autenticarse y validarse en el backend (no quiere decir que mantiene la sessión activa de cada uno de ellos).
Un JWT tiene:
  - header
  - payload
  - firma
Cualquier persona con un código puede abrir el JWT y ver que información contiene, por lo tanto nunca
utilizar para almacenar contraseñas, tarjetas de credito, etc (información sensible).
El usuario es el encargado de cerrar la sesión para que se elimine el JWT. 
El backend validará que no haya sido manipulado o alterado de alguna manera, que la firma exista y todavia sea vigente, cualquiera que no se cumpla hara que sea descartado por nuestro backend.
El Payload es muy facil de visualizar.