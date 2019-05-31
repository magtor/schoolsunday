import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlumnoPage } from '../pages/alumno/alumno';
import { SQLite } from '@ionic-native/sqlite';
import { DbSchoolProvider } from '../providers/db-school/db-school';
import { DbalumnosProvider } from '../providers/dbalumnos/dbalumnos';
import { DbtutoresProvider } from '../providers/dbtutores/dbtutores';
import { DbmatriculasProvider } from '../providers/dbmatriculas/dbmatriculas';
import { DbasistenciasProvider } from '../providers/dbasistencias/dbasistencias';
import { UpdatealumnoPage } from '../pages/updatealumno/updatealumno';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { TutoresPage } from '../pages/tutores/tutores';
import { Camera } from '@ionic-native/camera';
import { UpdatetutoresPage } from '../pages/updatetutores/updatetutores';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AlumnoPage,
    UpdatealumnoPage,
    TutoresPage,
    UpdatetutoresPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AlumnoPage,
    UpdatealumnoPage,
    TutoresPage,
    UpdatetutoresPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Camera,
    DbSchoolProvider,
    DbalumnosProvider,
    DbtutoresProvider,
    DbmatriculasProvider,
    DbasistenciasProvider
  ]
})
export class AppModule {}
