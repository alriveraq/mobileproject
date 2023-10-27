import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface-usuario/usuario';
import { PerfilserviceService } from '../perfilservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  usuarioform!: FormGroup;
  usuario: Usuario = {
    id: '',
    nombre: '',
    email: '',
    uid: '',
    password: '',
    password2: '',
    rol: 'USER_ROLE',
  }

  id: any = '';

  constructor(private firestore: PerfilserviceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarioform = this.formBuilder.group({
      nombre: [''],
      email: [''],
      password: [''],
      password2: [''],
    });
  }

  async onformSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();
    this.id = this.route.snapshot.params['id']
    await this.firestore.actualizaruser(this.id, form)
      .then(() => {
        loading.dismiss();
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

  async actualizaruser(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getuser(id + "")
    .subscribe({
      next: data => {
        console.log("getcategoria OK");
        console.log(data);
        this.id = data.id;
        this.usuarioform.setValue({
          nombre: data.nombre,
          email: data.email,
          password: data.password,
          password2: data.password2,
        });
        loading.dismiss();
    }
    , complete: () => {}
    , error: (err) => {
      console.log("getcategoria ERROR");
      console.log(err);
      loading.dismiss();
    }
    })
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msg,
      buttons: [
        {
          text: 'Okay',
        }
      ]
    });
    await alert.present();
  }

}
