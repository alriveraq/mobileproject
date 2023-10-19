import { Component, OnInit } from '@angular/core';
import { ServicioAdminService } from '../../servicio-admin.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Producto } from '../../interface-admin/producto';

@Component({
  selector: 'app-producto-agregar',
  templateUrl: './producto-agregar.page.html',
  styleUrls: ['./producto-agregar.page.scss'],
})
export class ProductoAgregarPage implements OnInit {
  productoform!: FormGroup;

  producto: Producto = {
    id: '',
    nombre: '',
    tipo_producto: '',
    img: '',
    gpu: '',
    memoria: '',
    frecuencia: '',
    bus: '',
    precio: 0,
    capacidad: '',
    tipo: '',
    formato: '',
    voltaje: ''
  };


  constructor(
    private formBuilder: FormBuilder,
    private restApi: ServicioAdminService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.productoform = this.formBuilder.group({
      'nombre': [null],
      'tipo_producto': [""],
      'img': [null],
      'gpu': [null],
      'memoria': [null],
      'frecuencia': [null],
      'bus': [null],
      'precio': [null],
      'capacidad': [null],
      'tipo': [null],
      'formato': [null],
      'voltaje': [null]
    });
  }

  async onFormSubmit(form: NgForm) {  
    console.log("onFormSubmit del Product ADD")
    this.producto = this.productoform.value;

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.agregarproducto(this.producto)
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
          this.router.navigate(['/admin/producto']);
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
