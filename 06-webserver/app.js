const http = require('http')

// request es lo que estan solicitando toda la informacion del url de la peticion, headers, argumentos, etc
// response es lo que va a responder al cliente
http.createServer( ( req, res ) => {

  // res.writeHead(200, { 'Content-Type': 'aplication/json'})
  res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
  res.writeHead(200, { 'Content-Type': 'aplication/csv'})

  const persona = {
    id: 1,
    nombre: 'Franco'
  }

  // res.write( JSON.stringify( persona ) )
  res.write( 'id, nombre\n' )
  res.write( '1, Fernando\n' )
  res.write( '2, Maria\n' )
  res.write( '3, Jose\n' )
  res.end()

})
.listen( 8080 );

console.log('Escuchando en el puerto', 8080)