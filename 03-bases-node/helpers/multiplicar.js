const fs = require('fs')

const crearArchivo = async (base = 5) => {  
  try {
    let salida = '';
  
    // imprimir la tabla del 5
    for (let i = 1; i <= 10; i++) {
      salida += `${base} x ${i} = ${i*base}\n`
    }
  
    console.log(salida)
    fs.writeFileSync(`tabla-${base}.txt`, salida)
    return `tabla-${base}.txt creado`
  } catch (err) {
    throw err    
  }

}

module.exports = {
  crearArchivo
}