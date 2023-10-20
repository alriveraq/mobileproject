import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Categoria } from '../../interface-admin/categoria';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
import { FirebaseService } from '../../servicio/firebase.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.page.html',
  styleUrls: ['./categoria-editar.page.scss'],
})
export class CategoriaEditarPage implements OnInit {
  categoriaForm!: FormGroup;

  categoria: Categoria = {
    id: '',
    nombre: ''
  };

  id: any = '';

  constructor(
    public restApi: ServicioAdminService,
    public firestore: FirebaseService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);

    this.actualizarcategoria(this.route.snapshot.params['id']);

    this.categoriaForm = this.formBuilder.group({
      categoria_nombre: [null, Validators.required]
    });
     
  }



  async onformSubmit(form: NgForm) {
    console.log("onformSubmit ID " + this.id);
    this.categoria.id = this.id;
    try {
      const data = await this.firestore.updatecagoria(this.id, this.categoria);
      console.log("actualizarcategoria OK");
      console.log(data);
      this.presentAlertConfirm("Actualizado correctamente");
    } catch (err) {
      console.log("actualizarcategoria ERROR");
      console.log(err);
    }
  }

  async actualizarcategoria(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getcategoria(id + "")
    .subscribe({
        next: data => {
          console.log("getcategoria OK" + id);
          console.log(data);
          if (data) {
            this.id = data.id;
            this.categoriaForm.setValue({
              categoria_nombre: data.nombre
            });
          }
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
            this.router.navigate(['/categoria/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
