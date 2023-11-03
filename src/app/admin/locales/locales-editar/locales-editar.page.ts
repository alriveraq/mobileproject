  import { Component, OnInit } from '@angular/core';
  import { LoadingController, AlertController } from '@ionic/angular';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
  import { Local } from '../../interface-admin/local';
import { LocalService } from '../local.service';

  @Component({
    selector: 'app-locales-editar',
    templateUrl: './locales-editar.page.html',
    styleUrls: ['./locales-editar.page.scss'],
  })
  export class LocalesEditarPage implements OnInit {
    localForm!: FormGroup;
    local: Local = {
      id: '',
      nombre: '',
      direccion: '',
      comuna: '',
      region: '',
      telefono: '',
      img: ''
    };
    id: any = '';

    constructor(
      public firestore: LocalService,
      public loadingController: LoadingController,
      public alertController: AlertController,
      public route: ActivatedRoute,
      public router: Router,
      private formBuilder: FormBuilder
    ) { 
      
    }

    ngOnInit() {

      console.log("ngOnInit ID:" + this.route.snapshot.params['id']);

      this.actualizarlocal(this.route.snapshot.params['id']);

      this.localForm = this.formBuilder.group({
        nombre: [null, Validators.required],
        direccion: [null, Validators.required],
        comuna: [null, Validators.required],
        region: [null, Validators.required],
        telefono: [null, Validators.required],
      });
    }

    async onformSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();
    this.id = this.route.snapshot.params['id']
    await this.firestore.actualizarlocal(this.id, form)
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/admin/locales/']);
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

    async actualizarlocal(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getlocal(id + "")
    .subscribe({
      next: data => {
        console.log("getcategoria OK");
        console.log(data);
        this.id = data.id;
        this.localForm.patchValue({
          nombre: data.nombre,
          direccion: data.direccion,
          comuna: data.comuna,
          region: data.region,
          telefono: data.telefono,
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
              this.router.navigate(['admin/locales/']);
            }
          }
        ]
      });
      await alert.present();
    }

  }
