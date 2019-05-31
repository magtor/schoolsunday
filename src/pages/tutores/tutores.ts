import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DbtutoresProvider } from '../../providers/dbtutores/dbtutores';
import { HomePage } from '../home/home';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UpdatetutoresPage } from '../updatetutores/updatetutores';

/**
 * Generated class for the TutoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutores',
  templateUrl: 'tutores.html',
})
export class TutoresPage {
  public tutor: FormGroup;
  private tutores : any;
  private tutoresitem : any;
  private searchTerm : any="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private dbTutores:DbtutoresProvider,private formBuilder: FormBuilder,private modaltutor : ModalController) {
    this.tutor = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(35)]]
    });
  }
  ionViewDidEnter() {
    this.ObtenerTutores();
  } 
  ionViewDidLoad() {
    this.ObtenerTutores();
    this.setFilteredItems();
  }
  ObtenerTutores(){
    this.dbTutores.obtenerTutores().then((data:any) => {
      this.tutores = data;
      this.tutoresitem = data;
    });
  }
  doYourStuff(){
    //alert('cowabonga');
    this.navCtrl.push(HomePage) ; // remember to put this to add the back button behavior
  }
  CreateTutor(){
    this.dbTutores.crearTutores(this.tutor.value.name,"","","",0,"").then( (data) => {
      
      /* this.products = data;
 
       let alert = this.alertCtrl.create({
         title: 'id de producto : '+this.products[0].id,
         subTitle: 'Producto : '+this.products[0].name,
         buttons: ['Dismiss']
       });
       alert.present();*/
       this.tutor.setValue({
         name:""        
         });
     
       this.ObtenerTutores();
     }, (error) => {
       console.log(error);
     })
     
  }
  setFilteredItems(){
      
    this.tutores = this.filterItems(this.searchTerm);

   }
   filterItems(searchTerm){
 
    return this.tutoresitem.filter((item) => {
         return item.name.toLowerCase().includes(searchTerm.toLowerCase());
     });  

 }
 UpdateTutor(idtutor:number,nametutor:string){
  const updatealumnos = this.modaltutor.create(UpdatetutoresPage,{id:idtutor,name:nametutor});
  updatealumnos.present();
 }

}
