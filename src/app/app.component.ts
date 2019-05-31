import { Component, ViewChild } from '@angular/core';
import { Platform ,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AlumnoPage } from '../pages/alumno/alumno';
import { DbSchoolProvider } from '../providers/db-school/db-school';
import { UpdatealumnoPage } from '../pages/updatealumno/updatealumno';
import { TutoresPage } from '../pages/tutores/tutores';
import { UpdatetutoresPage } from '../pages/updatetutores/updatetutores';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;
 
  @ViewChild(Nav) nav:Nav;
  pages: Array<{title: string, component: any}>; 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private dbschool : DbSchoolProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      dbschool.createDatabase()
      .then(() => {
        // fechando a SplashScreen somente quando o banco for criado
        this.openLoginPage(splashScreen);
      })
      .catch(() => {
        // ou se houver erro na criação do banco
        this.openLoginPage(splashScreen);
      });
      
     //this.rootPage = LoginPage;

    });
    
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Alumno', component: AlumnoPage },
      { title: 'UpdateAlumno', component: UpdatealumnoPage },
      { title: 'Tutor', component: TutoresPage },
      { title: 'UpdateTutores', component: UpdatetutoresPage }

    /*  { title: 'Quejas', component: QuejasPage },
      { title: 'Login', component: LoginPage },*/
    ];
  }
  private openLoginPage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = LoginPage;
  }

  openPage( page ) {

    let setPage: object;

    switch ( page ) {
      case 'home':
            setPage = HomePage;
            break;
       case 'Alumno':
            setPage = AlumnoPage;
            break;
        case 'Tutor':
            setPage = TutoresPage;
            break;     
    /*   case 'Login':
            setPage = LoginPage;
            break;        */
    }

    this.nav.setRoot( setPage );
  }

}

