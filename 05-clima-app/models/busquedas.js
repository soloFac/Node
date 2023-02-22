require('dotenv').config()
const axios = require('axios')

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'language': 'es',
      'limit': 5
    }
  }

  async ciudad( lugar = '' ) {

    try {
      // peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
        params: this.paramsMapbox
      })

      const resp = await instance.get()

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