import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Local } from '../../interface-admin/local';

@Component({
  selector: 'app-locales-agregar',
  templateUrl: './locales-agregar.page.html',
  styleUrls: ['./locales-agregar.page.scss'],
})
export class LocalesAgregarPage implements OnInit {

  localform!: FormGroup;

  local: Local = {
    id: '',
    nombre: '',
    direccion: '',
    comuna: '',
    region: '',
    telefono: '',
    img: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private restApi: ServicioAdminService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.localform = this.formBuilder.group({
      'local_nombre': [null],
      'local_direccion': [null],
      'local_comuna': [null],
      'local_region': [null],
      'local_telefono': [null],
      'local_img': [null]
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
    await this.restApi.agregarlocal(this.local)
      .subscribe({
        next: (res) => {
          console.log("Next AddProduct Page",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Next No Agrego, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['/locales']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
    console.log("Observe que todo lo del suscribe sale después de este mensaje")
  }

}
