const fs = require('fs')

const axios = require('axios')

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

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

  paramsOpenWeather(lat, lon) {
    return {
      lat,
      lon,
      'appid': process.env.OPENWEATHER_KEY, 
      'units': 'metric',
      'lang': 'es'
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

      return resp.data.features.map( lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }))

    } catch (error) {
      console.log(error)
      return []
    }

    return []; // retornar los lugares que coincidan
  }

  async climaLugar( lat, lon ) {
    try {
      // instance axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: this.paramsOpenWeather( lat, lon )
      })

      // resp.data
      const resp = await instance.get()
      const { weather, main } = resp.data

      const { description: desc } = weather[0]
      const { temp, temp_min: min, temp_max: max } = main

      return {
        desc, // description: 'algo de nubes'
        min,
        max,
        temp
      }
    } catch (err) {
      console.log(err)
    }
  }

  agregarHistorial( lugar = '' ) {
    // Todo: prevenir duplicado


    this.historial.unshift( lugar )
    this.guardarDB()
    // Grabar en DB
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB() {

  }
}


module.exports = Busquedas;