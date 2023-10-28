import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface-usuario/usuario';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ServicioUsuarioService } from '../../servicio-usuario.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.page.html',
  styleUrls: ['./verperfil.page.scss'],
})
export class VerperfilPage implements OnInit {


  uid: string = '';
  info: Usuario = {
    id: '',
    nombre: '',
    email: '',
    uid: '',
    password: '',
    password2: '',
    rol: 'USER_ROLE',
    // add the remaining properties of the Usuario interface here
  };

  constructor(private auth: AuthServiceService,
    private firestore: ServicioUsuarioService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    this.presentLoading();
    this.auth.stateuser().subscribe(res => {
      console.log('Estado de autentificacion',res);
    });
      
    this.getUid();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...', // Mensaje que se muestra en el cargador
      duration: 2000 // Duración en milisegundos (ajusta según tus necesidades)
    });
    await loading.present();
  }

  async getUid() {
    const uid = await this.auth.getuid();
    if (uid) {
      this.uid = uid;
      console.log('uid -> ', this.uid);
      this.getInfoUser();
    } else {
      console.log('no existe uid');
      
    }

}
  //traer la informacion del usuario
  getInfoUser() {
    const path = 'usuario';
    const id = this.uid;
    this.firestore.getDoc<Usuario>(path, id).subscribe(res => {
      if (res) {
        this.info = res;
        console.log('datos son -> ', res);
      } else {
        console.log('El documento no se encontró en Firestore.');
      }
    });
  }

  async editAtributo(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar ' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingresa tu ' + name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (ev) => {
            console.log('Confirm Ok -> ', ev);
            this.saveAtributo(name, ev[name])
          }
        }
      ]
    });

    await alert.present();
  }

  async saveAtributo(name: string, input: any) {
    const path = 'usuario';
    const id = this.uid;
    const updateDoc: Partial<Usuario> = {}; // add type Partial<Usuario> to updateDoc
    updateDoc[name as keyof Usuario] = input; // cast name as keyof Usuario to fix the error
    await this.firestore.updateDoc(path, id, updateDoc).then(() => {
      console.log('Documento editado exitósamente!');
    });
  }
}
