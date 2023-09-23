  import { Component, OnInit } from '@angular/core';
  import { LoadingController, AlertController } from '@ionic/angular';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
  import { Local } from '../../interface-admin/local';
  import { ServicioAdminService } from '../../servicio-admin.service';

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
      public restApi: ServicioAdminService,
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
        local_nombre: [null, Validators.required],
        local_direccion: [null, Validators.required],
        local_comuna: [null, Validators.required],
        local_region: [null, Validators.required],
        local_telefono: [null, Validators.required],
        local_img: [null, Validators.required]
      });
    }

    async onformSubmit(form: NgForm) {
      console.log("onformSubmit ID " + this.id);
      this.local.id = this.id;
      await this.restApi.actualizarlocal(this.id, this.local)
      .subscribe({
        next: data => {
          console.log("actualizarlocal OK");
          console.log(data);
          this.presentAlertConfirm("Actualizado correctamente");
      }
      , complete: () => {}
      , error: (err) => {
        console.log("actualizarlocal ERROR");
        console.log(err);
      }
      })
    }

    async actualizarlocal(id: string) {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();
      await this.restApi.getlocal(id + "")
      .subscribe({
        next: data => {
          console.log("getlocal OK");
          console.log(data);
          this.id = data.id;
          this.localForm.setValue({
            local_nombre: data.nombre,
            local_direccion: data.direccion,
            local_comuna: data.comuna,
            local_region: data.region,
            local_telefono: data.telefono,
            local_img: data.img
          });
          loading.dismiss();
      }
      , complete: () => {}
      , error: (err) => {
        console.log("getlocal ERROR");
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
              this.router.navigate(['/locales/']);
            }
          }
        ]
      });
      await alert.present();
    }

  }
