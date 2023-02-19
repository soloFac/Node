/**
 * _listado:
 *  { 'uuid-123712-123123-2: { id:12, desc: asd, compleadoEn: 92231 } }
 *  { 'uuid-123712-123123-2: { id:12, desc: asd, compleadoEn: 92231 } } 
 *  { 'uuid-123712-123123-2: { id:12, desc: asd, compleadoEn: 92231 } }
 */

const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor () {
    this._listado = {};
  }

  crearTarea( desc = '' ) {
    const tarea = new Tarea( desc )
    this._listado[tarea.id] = tarea
  }
}

module.exports = Tareas;