//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbSchoolProvider } from '../db-school/db-school';
import { SQLiteObject } from '../../../node_modules/@ionic-native/sqlite';

/*
  Generated class for the DbtutoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbtutoresProvider {

  constructor(/*public http: HttpClient*/private dbProvider: DbSchoolProvider) {
 
  }
  public crearTutores(name : string,direccion:string,fechanac:string,telefono:string,status:number,pathimage:string) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO tutores (name,fechanacimiento,telefono,direccion,status,pathimage) VALUES (?,?,?,?,?,?)';
        let data = [name, direccion, fechanac,telefono,status,pathimage];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  public obtenerTutores() {
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
 
      return db.executeSql('SELECT * FROM tutores', [])
        .then((data) => {
          
          let arrayTutores = [];
          if (data.rows.length > 0) {            
            for (var i = 0; i < data.rows.length; i++) {            
              arrayTutores.push({
                id: data.rows.item(i).id,
                name : data.rows.item(i).name,
                fechanacimiento : data.rows.item(i).fechanacimiento,
                telefono : data.rows.item(i).telefono,
                direccion : data.rows.item(i).direccion,
                status : data.rows.item(i).status
              });            
            }
            return arrayTutores;
          } else {
            return [];
          }
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  UpdateTutor(name:string,direccion:string,fechanacimiento:string,telefono:string,status:number,pathimage:string,idtutor:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'update tutores set name = ?,direccion = ?, fechanacimiento = ?, telefono = ?, status = ?,pathimage = ?  where id = ?';
      let data = [name, direccion,fechanacimiento, telefono,status,pathimage,idtutor];

      return db.executeSql(sql, data)
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  }
  ObtenerTutor(idtutor:number){
   
      return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
   
        return db.executeSql('select * from tutores WHERE id=?', [idtutor])
          .then((data) => {
            
            let arrayTutor = [];
            if (data.rows.length > 0) {            
                         
              arrayTutor.push({
                  id: data.rows.item(0).id,
                  name : data.rows.item(0).name,   
                  direccion : data.rows.item(0).direccion,               
                  fechanacimiento : data.rows.item(0).fechanacimiento,
                  telefono : data.rows.item(0).telefono,                 
                  status : data.rows.item(0).status,
                  pathimage : data.rows.item(0).pathimage
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
