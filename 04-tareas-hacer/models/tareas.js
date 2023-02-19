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

  cargarTareasFromArray ( tareas = [] ) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea
    });
  }

  crearTarea( desc = '' ) {
    const tarea = new Tarea( desc )
    this._listado[tarea.id] = tarea
  }

  listadoCompleto() {
    console.log()
    this.listadoArr.forEach( (tarea, i) => {
      const idx = `${i + 1}`.green
      const { desc, completadaEn } = tarea
      const estado = (completadaEn)
                      ? 'Completada'.green
                      : 'Pendiente'.red
      console.log(`${idx}. ${desc} :: ${estado}`)
    })
  }
}

module.exports = Tareas;