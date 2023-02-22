const http = require('http')

// request es lo que estan solicitando toda la informacion del url de la peticion, headers, argumentos, etc
// response es lo que va a responder al cliente
http.createServer( ( req, res ) => {

  res.write('Hola Mundo')
  res.end()

})
.listen( 8080 );

console.log('Escuchando en el puerto', 8080)