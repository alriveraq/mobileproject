import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Empleados } from '../../interface-admin/empleados';
import { EmpleadoService } from '../empleado.service';

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
    public firestore: EmpleadoService,
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
      nombre: [null, Validators.required],
      apellidos: [null, Validators.required],
      fecha_nacimiento: [null, Validators.required],
      rut: [null, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, Validators.required],
      turno: [null, Validators.required],
    });
  }

  async onformSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();
    this.id = this.route.snapshot.params['id']
    await this.firestore.actualizarempleado(this.id, form)
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/admin/empleados/']);
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

  async actualizarempleado(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getempleado(id + "")
    .subscribe({
      next: data => {
        console.log('Tipo de Producto seleccionado:');
        console.log("getcategoria OK");
        console.log(data);
        this.id = data.id;
        this.empleadoForm.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          fecha_nacimiento: data.fecha_nacimiento,
          rut: data.rut,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          turno: data.turno,

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
          handler: () => {
            this.router.navigate(['/admin/empleados/']);
          }
        }
      ]
    });
    await alert.present();
  }
}


