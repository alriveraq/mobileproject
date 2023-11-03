import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Categoria } from '../../interface-admin/categoria';
import { CategoriaServiceService } from '../categoria-service.service';

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
    public firestore: CategoriaServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,
    
  ) {}

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    this.actualizarcategoria(this.route.snapshot.params['id']);

    this.categoriaForm = this.formBuilder.group({
      categoria_nombre: [null, Validators.required]
    });
  }

  async onformSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();
    this.id = this.route.snapshot.params['id']
    await this.firestore.actualizarCategoria(this.id, form)
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/admin/categoria/']);
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

  async actualizarcategoria(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getcategoria(id + "")
    .subscribe({
      next: data => {
        console.log("getcategoria OK");
        console.log(data);
        this.id = data.id;
        this.categoriaForm.patchValue({
          categoria_nombre: data.nombre
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
            this.router.navigate(['/admin/categoria/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
