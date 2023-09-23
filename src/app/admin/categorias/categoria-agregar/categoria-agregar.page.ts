import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Categoria } from '../../interface-admin/categoria';
import { ServicioAdminService } from '../../servicio-admin.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categoria-agregar',
  templateUrl: './categoria-agregar.page.html',
  styleUrls: ['./categoria-agregar.page.scss'],
})
export class CategoriaAgregarPage implements OnInit {

  categoriaform!: FormGroup;

  categoria: Categoria = {
    id: '',
    nombre: ''
  };

  constructor(private formBuilder: FormBuilder,
    private restApi: ServicioAdminService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.categoriaform = this.formBuilder.group({
      'categoria_nombre': [null]
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
    await this.restApi.agregarcategoria(this.categoria)
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
          this.router.navigate(['/categoria']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error AddProduct Página",err);
          loading.dismiss(); //Elimina la espera
        }
      });
  }
}
