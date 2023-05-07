# Node - Apuntes

## Sección 10
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

### Por que usar tokens?
Variables de sesión -> para manejar la autenticación de los usuarios.
Para manejar las variables de sesión podemos tener un servidor. Una variable de sesión se crea cuando 
un usuario se autentica correctamente, vive del lado del servidor, cualquier peticion que haga la computadora
la relaciona con el usuario.
Si el servidor se reinicia o perdiera la conexión por mucho tiempo, todos los usuarios se van a caer y van a tener que volver a iniciar sesión. El principal problema sería este, si facebook trabaja con variables de sesión, podemos tener x cantidad de sesiones por usuario.

El token es algo que va a existir en las computadoras clientes, la estructura sera parecida pero el contenido sera unico.

### Informacion importante sobre JWT
Esto no me garantiza que la informacion esta encryptada de forma segura.
La firma me asegurara que no fue manipulado, para validarlo.
La primera condicion de seguridad se debe saber, todos los token son almacenados en la parte de Aplicacion -> 
- Local Storage (permanece persistente en el equipo aunque reiniciemos la maquina): es totalmente manipulable por el cliente con JS.

- Session Storage (se elimina cuando se cierra el navegador)

### Agrego variables de entorno utilizadas

PORT=8080
MONGODB_CNN=mongodb+srv://diaf:jtIeDaH27byxQz9U@micluster.vkzc7gr.mongodb.net/cafeDB
SECRETORPRIVATEKEY=Est03sMyPubl1cK3y23@913

GOOGLE_CLIENT_ID=110779131529-6prh35mpdv5le8986mitp6ctai38v6vg.apps.googleusercontent.com
GOOGLE_SECRET_ID=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
