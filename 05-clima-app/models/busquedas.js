class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad( lugar = '' ) {
    
    // peticion http
    console.log( lugar );

    return []; // retornar los lugares que coincidan
  }

}


module.exports = Busquedas;