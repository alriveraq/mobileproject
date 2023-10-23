import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Usuario } from '../interface-user/user';
import { ServicioUserService } from '../servicio-user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  usuarioform!: FormGroup;

  usuario: Usuario = {
    id: '',
    nombre_usuario: '',
    email: '',
    contrasena: '',
    img: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private restApi: ServicioUserService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.usuarioform = this.formBuilder.group({
      'nombre_usuario': [null],
      'email': [null],
      'contrasena': [null],
      'img': [null]
    });
  }

  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Product ADD")

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.agregarusuario(this.usuario)
      .subscribe({
        next: (res) => {
          console.log("Usuario Agregado ",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Usuario no agregado, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['usuario/login']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
  }



}
