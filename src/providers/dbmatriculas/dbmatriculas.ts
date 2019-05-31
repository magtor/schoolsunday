//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbSchoolProvider } from '../db-school/db-school';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';
import { NumberValueAccessor } from '../../../node_modules/@angular/forms/src/directives';

/*
  Generated class for the DbmatriculasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbmatriculasProvider {

  constructor(/*public http: HttpClient*/private dbProvider: DbSchoolProvider) {
  
  }
  public crearMriculas(descripcion:string,aniolectivo:string,fechainicio:string,cantidad:number,status:number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO anioslectivos (descripcion,aniolectivo,fechainicio,cantidaddomingos,status) VALUES (?,?,?,?,?)';
        let data = [descripcion,aniolectivo,fechainicio,cantidad,status];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public crearAlumnoMatriculas(idmatricula:number,idalumno:number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO alumnomatricula (idmatricula,idalumno) VALUES (?,?)';
        let data = [idmatricula,idalumno];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
