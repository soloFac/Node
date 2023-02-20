/**
 * _listado:
 *  { 'uuid-123712-123123-2: { id:12, desc: asd, compleadoEn: 92231 } }
 *  { 'uuid-123712-123123-2: { id:12, desc: asd, compleadoEn: 92231 } } 
 *  { 'uuid-123712-123123-2: { id:12, desc: asd, compleadoEn: 92231 } }
 */

const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach( key => {
      listado.push(this._listado[key])
    } )

    return listado;
  }

  constructor () {
    this._listado = {};
  }

  borrarTarea( id = '' ) {
    if( this._listado[id] ) {
      delete this._listado[id]
    }
  }

  cargarTareasFromArray ( tareas = [] ) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea
    });
  }

  crearTarea( desc = '' ) {
    const tarea = new Tarea( desc )
    this._listado[tarea.id] = tarea
  }

  listadoCompleto( completadas  ) {
    console.log()
    this.listadoArr.forEach( (tarea, i) => {
      const idx = `${i + 1}`.green
      const { desc, completadoEn } = tarea
      const estado = (completadoEn)
                      ? 'Completada'.green
                      : 'Pendiente'.red
      const stringTarea = `${idx}. ${desc} :: ${estado}`

      console.log(stringTarea)
    })
  }

  listarPendientesCompletadas( completadas = true ) {
    console.log()
    let cont = 1;
    this.listadoArr.forEach( (tarea) => {
      const { desc, completadoEn } = tarea
      const estado = (completadoEn)
                      ? 'Completada'.green
                      : 'Pendiente'.red
      const stringTarea = `${cont}. ${desc} :: ${estado}`

      if ( completadoEn && completadas){
        console.log(stringTarea)
        cont ++;
      } else if ( !completadoEn && !completadas) {
        console.log(stringTarea)
        cont ++;
      }
    })
  }
}

const getStringTarea = (tarea, i) => {
  const idx = `${i + 1}`.green
  const { desc, completadoEn } = tarea
  const estado = (completadoEn)
                  ? 'Completada'.green
                  : 'Pendiente'.red
  return(`${idx}. ${desc} :: ${estado}`)
}

module.exports = Tareas;