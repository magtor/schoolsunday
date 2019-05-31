//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DbSchoolProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbSchoolProvider {

  constructor(/*public http: HttpClient*/private sqlite: SQLite) {
    
  }
  public getDB() {
    return this.sqlite.create({
      name: 'school.db',
      location: 'default'
    });
  }
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
       
 
      })
      .catch(e => console.log(e));
  }
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    //el status en el caso del año lectivo se refiere si ese año esta cerrado o si es el año en curso
    //en el caso de alumnos, maestros o tutores se debe a que esos alumnos ya dejaron o se fueron de la iglesia 
    //o ya dejaron la escuela
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS alumnos (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT,idtutor INTEGER,fechanacimiento TEXT,telefono TEXT,direccion TEXT,status INTEGER,pathimage TEXT)'],
      ['CREATE TABLE IF NOT EXISTS tutores (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT,direccion TEXT,fechanacimiento TEXT,telefono TEXT,status INTEGER,pathimage TEXT)'],
      ['CREATE TABLE IF NOT EXISTS maestros (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT,direccion TEXT,fechanacimiento TEXT,telefono TEXT,status INTEGER)'],
      ['CREATE TABLE IF NOT EXISTS anioslectivos (id INTEGER PRIMARY KEY AUTOINCREMENT , descripcion TEXT,aniolectivo TEXT,fechainicio TEXT,cantidaddomingos INTEGER,status INTEGER)'],
      ['CREATE TABLE IF NOT EXISTS alumnomatriculas (id INTEGER PRIMARY KEY AUTOINCREMENT , idmatricula INTEGER,idalumno INTEGER)'],
      ['CREATE TABLE IF NOT EXISTS asistencias (id INTEGER PRIMARY KEY AUTOINCREMENT , presente TEXT,idalumno INTEGER,fecha TEXT)']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }
 


}
