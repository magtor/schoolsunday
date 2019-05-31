import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AlumnoPage } from '../alumno/alumno';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public menu: MenuController) {
   this.menu1Active();
  }
  menu1Active() {
    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
  }
 openPageAlumno(){
  this.navCtrl.push(AlumnoPage);

 }

}
