//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbSchoolProvider } from '../db-school/db-school';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/*
  Generated class for the DbasistenciasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbasistenciasProvider {

  constructor(/*public http: HttpClient*/private dbProvider: DbSchoolProvider) {
   
  }
  public crearAsistencias(asiste:string,idalumno:number,fechaasis:string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO asistencias (asistencia,idalumno,fecha) VALUES (?,?,?)';
        let data = [asiste,idalumno,fechaasis];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public obtenerAsistencias() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from asistencias', [])
        .then((data) => {
          
          let arrayAsistencias = [];
          if (data.rows.length > 0) {            
            for (var i = 0; i < data.rows.length; i++) {            
              arrayAsistencias.push({
                id: data.rows.item(i).id,
                presente : data.rows.item(i).presente,
                idalumno: data.rows.item(i).idalumno,
                fecha : data.rows.item(i).fecha
              });            
            }
            return arrayAsistencias;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  //crear reporte de porcentaje de asistencia por alumnos
  //se tiene que guardar en la tabla matricla cuantos domingos tiene el año lectivo para asi saber
  //el porcentaje de asistencia el cual es porcentajeasistencia = la cantidad de asistencia / cantidad de domingos del año

}
