import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomePage } from '../home/home';
import { DbalumnosProvider } from '../../providers/dbalumnos/dbalumnos';
import { UpdatealumnoPage } from '../updatealumno/updatealumno';


/**
 * Generated class for the AlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alumno',
  templateUrl: 'alumno.html',
})
export class AlumnoPage {
  public alumn: FormGroup;
  private students : any;  
  studentsitem : any;  
  
  private searchTerm : any="";


  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder, private studentProvider: DbalumnosProvider,private modalalumno : ModalController) {
    this.alumn = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(35)]]
    });

  }
 /* ionViewDidEnter() {
    this.getStudents();
  } */
  ionViewDidLoad() {    
    this.getStudents();
    this.setFilteredItems();

  }
  doYourStuff(){
    //alert('cowabonga');
    this.navCtrl.push(HomePage) ; // remember to put this to add the back button behavior
  }
  getStudents(){
   this.studentProvider.obtenerAlumnos().then((data:any) => {
     this.students = data;    
     this.studentsitem = data;

  });
  }
  CreateAlumn(){
    this.studentProvider.crearAlumno(this.alumn.value.name,0,"","","",0,"").then( (data) => {
      
      /* this.products = data;
 
       let alert = this.alertCtrl.create({
         title: 'id de producto : '+this.products[0].id,
         subTitle: 'Producto : '+this.products[0].name,
         buttons: ['Dismiss']
       });
       alert.present();*/
       this.alumn.setValue({
         name:""        
         });
     
       this.getStudents();
     }, (error) => {
       console.log(error);
     })
     
   }
   UpdateStudent(idalumno:number,namealumno:string){
    const updatealumnos = this.modalalumno.create(UpdatealumnoPage,{idstudent:idalumno,name:namealumno});
    updatealumnos.present();
   }
   DeleteStudent(idalumno:number){
     
   }
   setFilteredItems(){
      
    this.students = this.filterItems(this.searchTerm);

   }
   filterItems(searchTerm){
 
    return this.studentsitem.filter((item) => {
         return item.name.toLowerCase().includes(searchTerm.toLowerCase());
     });  

 }

 
  }



