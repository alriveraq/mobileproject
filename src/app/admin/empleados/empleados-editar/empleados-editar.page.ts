import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
import { Empleados } from '../../interface-admin/empleados';

@Component({
  selector: 'app-empleados-editar',
  templateUrl: './empleados-editar.page.html',
  styleUrls: ['./empleados-editar.page.scss'],
})
export class EmpleadosEditarPage implements OnInit {
  empleadoForm!: FormGroup;

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

  id: any = '';

  constructor(
    public restApi: ServicioAdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);

    this.actualizarempleado(this.route.snapshot.params['id']);

    this.empleadoForm = this.formBuilder.group({
      empleado_nombre: [null, Validators.required],
      empleado_apellidos: [null, Validators.required],
      empleado_fecha_nacimiento: [null, Validators.required],
      empleado_rut: [null, Validators.required],
      empleado_direccion: [null, Validators.required],
      empleado_telefono: [null, Validators.required],
      empleado_email: [null, Validators.required],
      empleado_turno: [null, Validators.required],
      empleado_img: [null, Validators.required]
    });
  }

  async onformSubmit(form: NgForm) {
    console.log("onformSubmit ID " + this.id);
    this.empleado.id = this.id;
    await this.restApi.actualizarempleado(this.id, this.empleado)
    .subscribe({
      next: data => {
        console.log("actualizarempleado OK");
        console.log(data);
        this.presentAlertConfirm("Actualizado correctamente");
    }
    , complete: () => {}
    , error: (err) => {
      console.log("actualizarempleado ERROR");
      console.log(err);
    }
    })
  }

  async actualizarempleado(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getempleado(id + "")
    .subscribe({
      next: data => {
        console.log("getempleado OK");
        console.log(data);
        this.id = data.id;
        this.empleadoForm.setValue({
          empleado_nombre: data.nombre,
          empleado_apellidos: data.apellidos,
          empleado_fecha_nacimiento: data.fecha_nacimiento,
          empleado_rut: data.rut,
          empleado_direccion: data.direccion,
          empleado_telefono: data.telefono,
          empleado_email: data.email,
          empleado_turno: data.turno,
          empleado_img: data.img
        });
        loading.dismiss();
    }
    , complete: () => {}
    , error: (err) => {
      console.log("getempleado ERROR");
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
          handler: () => {
            this.router.navigate(['/empleados/']);
          }
        }
      ]
    });
    await alert.present();
  }
}


