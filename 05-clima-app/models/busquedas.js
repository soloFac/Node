const fs = require('fs')

const axios = require('axios')

class Busquedas {
  historial = [];
  dbPath = './db/database.json'

  constructor() {
    // TODO: leer DB si existe
    this.leerDB()
  }

  get historialCapitalizado() {
    return this.historial.map( lugar => {
      let palabras = lugar.split(' ')
      palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) )

      return palabras.join(' ')
    })
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
    if( this.historial.includes( lugar.toLocaleLowerCase() )){
      return;
    }

    this.historial = this.historial.slice(0, 5);

    this.historial.unshift( lugar.toLocaleLowerCase() );
    this.guardarDB();
    // Grabar en DB
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB() {
    // Debe de existir
    let info;
    if( fs.existsSync(this.dbPath) ) {
      info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    }
    console.log('info: ', info)

    const data = JSON.parse(info)
    
    this.historial = data.historial
  }
}


module.exports = Busquedas;