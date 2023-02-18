console.log('Inicio de programa')  // 1

setTimeout( () => {
  console.log('Primer Timeout')  // 5
}, 3000)

// - El segundo y tercer timeout aparece despues del ultimo clg es porque establece estas funciones o callbacks en una pilla de ejecución,
// - cae a un stack de procedimiento que tiene que ejecutar
// - Registra: ok en tanto tiempo tengo que ejecutar esto; cuando ya se tiene alguna resolucion eso cae en un Stack, por ello tenemos este resultado
setTimeout( () => {
  console.log('Segundo Timeout') // 3
}, 0)

setTimeout( () => {
  console.log('Tercer Timeout')  // 4
}, 0)

console.log('Fin de programa')  // 2

// Explicación: Los setTimeout son enviados a una Cola de Callbacks y esperan ahi hasta que 
// el Call Stack termina de ejecutar todo el resto de las tareas. Una vez finaliza
// se ejecuta la Cola de Callbacks