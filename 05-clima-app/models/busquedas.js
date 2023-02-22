const axios = require('axios')

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad( lugar = '' ) {

    // peticion http
    try {
      const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Otaw.json?language=es&access_token=pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja2tvZHh4Y3YwMDhnMnBvY3ozbHUxdGJvIn0.3zptKSSxJrM5VmfjnkKMYA&limit=5')
      console.log(resp.data)
      return []
    } catch (error) {
      console.log(error)
      return []
    }

    return []; // retornar los lugares que coincidan
  }

}


module.exports = Busquedas;