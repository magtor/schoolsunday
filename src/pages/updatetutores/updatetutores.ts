import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DbtutoresProvider } from '../../providers/dbtutores/dbtutores';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the UpdatetutoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatetutores',
  templateUrl: 'updatetutores.html',
})
export class UpdatetutoresPage {
  public tutor : {id: number, name: string,direccion: string,fechanacimiento:string,telefono:string,status:number,pathimage};
  public tutor_id: number;
  public tutor_name : string ;
  public buttonClicked: boolean = true;
  base64Image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dbTutor:DbtutoresProvider,private camera:Camera,public viewCtrl: ViewController) {
    this.tutor = {id: undefined, name: undefined,direccion:undefined,
      fechanacimiento:undefined,telefono:undefined,
      status:undefined,pathimage:undefined};
     
  }

  ionViewDidLoad() {
     this.tutor_id = this.navParams.get("id"); 
     this.tutor.id = this.navParams.get("id");
     this.tutor_name = this.navParams.get("name");
     this.tutor.name = this.navParams.get("name");
     this.ObtenerTutor();
  }
  ObtenerTutor(){
    this.dbTutor.ObtenerTutor(this.tutor.id).then((data:any) => {
      
       this.tutor_name =  data[0].name;
       this.tutor.id = data[0].id;
       this.tutor.name = data[0].name;
       this.tutor.direccion = data[0].direccion;
       this.tutor.fechanacimiento = data[0].fechanacimiento;
       this.tutor.telefono = data[0].telefono;
       this.tutor.status = data[0].status;
       this.tutor.pathimage = data[0].pathimage;
       if(this.tutor.pathimage)
        this.buttonClicked = false;

    });
  }
  ChangeImage(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.base64Image = 'data:image/jpeg;base64,'+imageData;
       this.tutor.pathimage = this.base64Image;
       
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
  cerrar(){
    this.viewCtrl.dismiss();
  }
}
