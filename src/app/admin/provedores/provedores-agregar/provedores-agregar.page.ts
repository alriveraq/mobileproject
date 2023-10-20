import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Proveedores } from '../../interface-admin/provedores';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
@Component({
  selector: 'app-provedores-agregar',
  templateUrl: './provedores-agregar.page.html',
  styleUrls: ['./provedores-agregar.page.scss'],
})
export class ProvedoresAgregarPage implements OnInit {
  proveedorForm!: FormGroup

  proveedor: Proveedores = {
    direccion: '',
    email: '',
    id: '',
    nombre: '',
    rut_empresa: '',
    telefono: '',
  }

  constructor(
    public restApi: ServicioAdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.proveedorForm = this.formBuilder.group({
      proveedor_nombre: [null,Validators.required],
      proveedor_direccion: [null,Validators.required],
      proveedor_email: [null,Validators.required],
      proveedor_rut_empresa: [null,Validators.required],
      proveedor_telefono: [null,Validators.required],
    })
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
    await this.restApi.agregarproveedor(this.proveedor)
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
          this.router.navigate(['/proveedores']);
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
