import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Empleados } from '../../interface-admin/empleados';

@Component({
  selector: 'app-empleados-agregar',
  templateUrl: './empleados-agregar.page.html',
  styleUrls: ['./empleados-agregar.page.scss'],
})
export class EmpleadosAgregarPage implements OnInit {

  empleadoform!: FormGroup;

  empleado: Empleados = {
    id: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: '',
    rut: '',
    direccion: '',
    telefono: '',
    email: '',
    turno: '',
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
    this.empleadoform = this.formBuilder.group({
      'empleado_nombre': [null],
      'empleado_apellidos': [null],
      'empleado_fecha_nacimiento': [null],
      'empleado_rut': [null],
      'empleado_direccion': [null],
      'empleado_telefono': [null],
      'empleado_email': [null],
      'empleado_turno': [null],
      'empleado_img': [null]
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
    await this.restApi.agregarempleado(this.empleado)
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
          this.router.navigate(['/empleados']);
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
