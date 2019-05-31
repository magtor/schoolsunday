//mport { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbSchoolProvider } from '../db-school/db-school';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/*
  Generated class for the DbalumnosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbalumnosProvider {

  constructor(/*public http: HttpClient*/private dbProvider: DbSchoolProvider) {
    
  }
  public crearAlumno(name : string, idtutor : number,fechanac : string,telefono: string,direccion:string,status:number,pathimage:string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into alumnos (name, idtutor, fechanacimiento,telefono,direccion,status,pathimage) values (?,?,?,?,?,?,?)';
        let data = [name, idtutor, fechanac,telefono,direccion,status,pathimage];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public update(idalumno:number,name:string,idtutor:number,fechanacimiento:string,telefono:string,direccion: string,status:number,pathimage:string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update alumnos set name = ?, idtutor = ?,fechanacimiento = ?, telefono = ?, direccion = ? ,status = ?,pathimage = ?  where id = ?';
        let data = [name, idtutor,fechanacimiento, telefono, direccion,status,pathimage,idalumno];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public updatestatus(idalumno : number,status: string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update alumnos  status = ?   where id = ?';
        let data = [idalumno,status];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public obtenerAlumnos() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from alumnos', [])
        .then((data) => {
          
          let arrayAlumnos = [];
          if (data.rows.length > 0) {            
            for (var i = 0; i < data.rows.length; i++) {            
              arrayAlumnos.push({
                id: data.rows.item(i).id,
                name : data.rows.item(i).name,
                idtutor: data.rows.item(i).idtutor,
                fechanacimiento : data.rows.item(i).fechanacimiento,
                telefono : data.rows.item(i).telefono,
                direccion : data.rows.item(i).direccion,
                status : data.rows.item(i).status,
                pathimage : data.rows.item(i).pathimage
              });            
            }
            return arrayAlumnos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  obtenerAlumno(idalumno : number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('select * from alumnos WHERE id=?', [idalumno])
        .then((data) => {
          
          let arrayAlumnos = [];
          if (data.rows.length > 0) {            
                       
              arrayAlumnos.push({
                id: data.rows.item(0).id,
                name : data.rows.item(0).name,
                idtutor: data.rows.item(0).idtutor,
                fechanacimiento : data.rows.item(0).fechanacimiento,
                telefono : data.rows.item(0).telefono,
                direccion : data.rows.item(0).direccion,
                status : data.rows.item(0).status,
                pathimage : data.rows.item(0).pathimage
              });            
            
            return arrayAlumnos;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  obtenerTutor(idalumno:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
       let sql = "SELECT tutores.name from tutores";
        sql = sql + " INNER JOIN alumnos  ON  tutores.id = alumnos.idtutor  ";
        sql = sql + " WHERE alumnos.id =?"
      return db.executeSql(sql, [idalumno])
        .then((data) => {
          
          let arrayTutor = [];
          if (data.rows.length > 0) {            
                       
            arrayTutor.push({                
                name : data.rows.item(0).name                
              });          
            
            return arrayTutor;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }

}



