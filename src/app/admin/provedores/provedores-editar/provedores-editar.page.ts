import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Proveedores } from '../../interface-admin/provedores';
import { ServicioAdminService } from '../../servicio-admin.service';

@Component({
  selector: 'app-provedores-editar',
  templateUrl: './provedores-editar.page.html',
  styleUrls: ['./provedores-editar.page.scss'],
})
export class ProvedoresEditarPage implements OnInit {
  proveedorForm!: FormGroup

  proveedor: Proveedores = {
    direccion: '',
    email: '',
    id: '',
    nombre: '',
    rut_empresa: '',
    telefono: '',
  }
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

    console.log("ngOninit ID" + this.route.snapshot.params['id']);

    this.actualizarproveedor(this.route.snapshot.params['id']);

    this.proveedorForm = this.formBuilder.group({
      proveedor_nombre: [null,Validators.required],
      proveedor_direccion: [null,Validators.required],
      proveedor_email: [null,Validators.required],
      proveedor_rut_empresa: [null,Validators.required],
      proveedor_telefono: [null,Validators.required],
    })
  }

  async onformSubmit(form: NgForm) {
    console.log("onformSubmit ID " + this.id);
    this.proveedor.id = this.id;
    await this.restApi.actualizarproveedor(this.id, this.proveedor)
    .subscribe({
      next: data => {
        console.log("actualizarproveedor OK");
        console.log(data);
        this.presentAlertConfirm("Actualizado correctamente");
    }
    , complete: () => {}
    , error: (err) => {
      console.log("actualizarproveedor ERROR");
      console.log(err);
    }
    })
  }

  async actualizarproveedor(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getproveedor(id + "")
    .subscribe({
      next: data => {
        console.log("getproveedor OK");
        console.log(data);
        this.id = data.id;
        this.proveedorForm.setValue({
          
          proveedor_nombre: data.nombre,
          proveedor_direccion: data.direccion,
          proveedor_telefono: data.telefono,
          proveedor_email: data.email,
          proveedor_rut_empresa: data.rut_empresa,
        });
        loading.dismiss();
    }
    , complete: () => {}
    , error: (err) => {
      console.log("getproveedor ERROR");
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
            this.router.navigate(['/proveedores/']);
          }
        }
      ]
    });
    await alert.present();
  }

}
