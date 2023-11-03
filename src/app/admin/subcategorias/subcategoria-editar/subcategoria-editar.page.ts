import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Subcategoria } from '../../interface-admin/subcategoria';
import { SubcServiceService } from '../subc-service.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subcategoria-editar',
  templateUrl: './subcategoria-editar.page.html',
  styleUrls: ['./subcategoria-editar.page.scss'],
})
export class SubcategoriaEditarPage implements OnInit {
  subcategoriaForm!: FormGroup;
  subcategoria: Subcategoria = {
    id: '',
    nombre: '',
    categoria: {
      id: '',
      nombre: '',
    }
  };
  id: any = '';

  constructor(
    public firestore: SubcServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);

    this.actualizarsubcategoria(this.route.snapshot.params['id']);

    this.subcategoriaForm = this.formBuilder.group({
      nombre: [null],
      categoria: [null],
    });
  }

  async onformSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();
    this.id = this.route.snapshot.params['id']
    await this.firestore.actualizarsubc(this.id, form)
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/admin/subcategoria/']);
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

  async actualizarsubcategoria(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getsubc(id + "")
    .subscribe({
      next: data => {
        console.log("getcategoria OK");
        console.log(data);
        this.id = data.id;
        this.subcategoriaForm.patchValue({
          nombre: data.nombre,
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

}
