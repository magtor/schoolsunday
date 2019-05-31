import { Component, ViewChild } from '@angular/core';
import { IonicPage,  NavParams, ViewController } from 'ionic-angular';
import { DbalumnosProvider } from '../../providers/dbalumnos/dbalumnos';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { DbtutoresProvider } from '../../providers/dbtutores/dbtutores';
import { Camera } from '@ionic-native/camera';
import { AlumnoPage } from '../alumno/alumno';


/**
 * Generated class for the UpdatealumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatealumno',
  templateUrl: 'updatealumno.html',
})
export class UpdatealumnoPage {
  
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  
  showProfile: boolean;
  base64Image:any;
  public buttonClicked: boolean = true;
  private tutores : any;
  public tutor_id: number;
  public tutor_name : string ;
  private showtutores : boolean;
  public alumno: {id: number,name : string,idtutor:number,fechanacimiento:string,telefono:string,direccion:string,status:number,pathimage:string};

  constructor(public viewCtrl: ViewController, public navParams: NavParams,view:ViewController,private dbAlumno :DbalumnosProvider,
    private dbTutor : DbtutoresProvider,public camera:Camera) {
    this.alumno = {id: undefined, name: undefined,idtutor:undefined,
      fechanacimiento:undefined,telefono:undefined,direccion:undefined,
      status:undefined,pathimage:undefined};
     this.showtutores = true; 
  }
  ionViewDidLoad() {     
    this.alumno.id = this.navParams.get("idstudent");   
    this.alumno.name =  this.navParams.get("name");
    this.ObtenerTutores();
    this.ObtenerAlumno();
    this.ObtenerTutor();

  }
  UpdateAlumno(){
   
    this.dbAlumno.update(this.alumno.id,this.alumno.name,this.tutor_id,
      this.alumno.fechanacimiento,this.alumno.telefono,
      this.alumno.direccion,this.alumno.status,this.alumno.pathimage).then( (data) => {
      
      /* this.products = data;
 
       let alert = this.alertCtrl.create({
         title: 'id de producto : '+this.products[0].id,
         subTitle: 'Producto : '+this.products[0].name,
         buttons: ['Dismiss']
       });
       alert.present();*/
      
     }, (error) => {
       console.log(error);
     })
  }
  ObtenerTutores(){
    this.dbTutor.obtenerTutores().then((data:any) => {
      this.tutores = data;
    });
    
  }
  
  tutorChanged(event: { component: SelectSearchableComponent, value: any}) {
    // User was selected
   /* let alert = this.alertCtrl.create({
      title: 'id de producto : '+ event.value.id,
      subTitle: 'Producto : '+ event.value.name,
      buttons: ['Dismiss']
    });
    alert.present();*/
    this.tutor_id =  event.value.id;
    this.tutor_name = event.value.name ;
    
  }
  ObtenerAlumno(){
    this.dbAlumno.obtenerAlumno(this.alumno.id).then((data:any) => {
      this.alumno.id = data[0].id;
      this.alumno.name = data[0].name;
      this.alumno.fechanacimiento= data[0].fechanacimiento;
      this.alumno.idtutor= data[0].idtutor;
      this.alumno.direccion= data[0].direccion;
      this.alumno.telefono = data[0].telefono;     
      this.alumno.status = data[0].status;
      this.alumno.pathimage = data[0].pathimage;      
      this.base64Image = this.alumno.pathimage;

      if(this.alumno.pathimage)
        this.buttonClicked = false;

    });
  }
  ObtenerTutor(){
    this.dbAlumno.obtenerTutor(this.alumno.id).then((data:any) => {
       this.tutor_name =  data[0].name;
    });
  }
  ShowTutors(){
    this.showtutores = false;
    this.ObtenerTutor();
  }
  
  ChangeImage(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
       this.alumno.pathimage = this.base64Image;
       
       /*var namePath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
       var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);*/
       //camino del archivo de imagen 
       //alert(this.base64Image);

      }, (err) => {
       console.log(err);
     });
     if(this.buttonClicked){
      this.buttonClicked = !this.buttonClicked;
     }
  }
 /* doYourStuff(){
    //alert('cowabonga');
    this.navCtrl.push(AlumnoPage) ; // remember to put this to add the back button behavior
  }*/
  
  cerrar(){
    this.viewCtrl.dismiss();
  }



}
