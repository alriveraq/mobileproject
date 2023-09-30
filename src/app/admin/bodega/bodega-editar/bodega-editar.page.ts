import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Bodega } from '../../interface-admin/bodega';
import { ServicioAdminService } from '../../servicio-admin.service';
@Component({
  selector: 'app-bodega-editar',
  templateUrl: './bodega-editar.page.html',
  styleUrls: ['./bodega-editar.page.scss'],
})
export class BodegaEditarPage implements OnInit {
  bodegaform!: FormGroup;

  bodega: Bodega = {
    id: '',
    nombre: '',
    direccion: '',
    comuna: '',
    region: '',
    telefono: '',
    img: ''
  
  };
  
  id: any= '';

  constructor(
    private formBuilder: FormBuilder,
    private restApi: ServicioAdminService,
    public route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);

    this.actualizarbodega(this.route.snapshot.params['id']);

    this.bodegaform = this.formBuilder.group({
      bodega_nombre: [null, Validators.required],
      bodega_direccion: [null, Validators.required],
      bodega_comuna: [null, Validators.required],
      bodega_region: [null, Validators.required],
      bodega_telefono: [null, Validators.required],
      bodega_img: [null, Validators.required]
    });
  }

  async onformSubmit(form: NgForm) {
    console.log("onformSubmit ID " + this.id);
    this.bodega.id = this.id;
    await this.restApi.actualizarbodega(this.id, this.bodega)
    .subscribe({
      next: data => {
        console.log("actualizarbodega OK");
        console.log(data);
        this.presentAlertConfirm("Actualizado correctamente");
    }
    , complete: () => {}
    , error: (err) => {
      console.log("actualizarbodega ERROR");
      console.log(err);
    }
    })
  }

  async actualizarbodega(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getbodega(id + "")
    .subscribe({
      next: data => {
        console.log("getbodega OK");
        console.log(data);
        this.id = data.id;
        this.bodegaform.setValue({
          bodega_nombre: data.nombre,
          bodega_direccion: data.direccion,
          bodega_comuna: data.comuna,
          bodega_region: data.region,
          bodega_telefono: data.telefono,
          bodega_img: data.img
        });
        loading.dismiss();
    }
    , complete: () => {}
    , error: (err) => {
      console.log("getbodega ERROR");
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
            this.router.navigate(['/bodega/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
