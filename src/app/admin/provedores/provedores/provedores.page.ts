import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../../interface-admin/provedores';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAdminService } from '../../servicio-admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.page.html',
  styleUrls: ['./provedores.page.scss'],
})
export class ProvedoresPage implements OnInit {
  proveedores?: Proveedores[];
  proveedor: Proveedores ={
    direccion: '',
    email: '',
    id: '',
    nombre: '',
    rut_empresa: '',
    telefono: ''
  } 

  constructor(
    private navCtrl: NavController,
    private restApi: ServicioAdminService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getproveedores();
  }

  async getproveedores() {
    console.log("Entrando :getproveedores");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getproveedores()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.proveedores = res;
          console.log("thisProductos:",this.proveedores);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  editarproveedor(proveedorId: string) {
    // Redirige a la página "local-editar" con el ID de la categoría como parámetro
    console.log("editarlocal **************** ID:" + proveedorId);
    this.navCtrl.navigateForward(`/provedores-editar/${proveedorId}`);
  }


  async getproveedor() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getproveedor(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.proveedor = res;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          //Si no funcion desplegamos en consola el error
          console.log("Error DetailProduct Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }

  async confirmarEliminacion(id: string) {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    await this.restApi.eliminarproveedor(id)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          loading.dismiss();
          this.getproveedores();
        },
        complete: () => { },
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        }
      });
    }

    async eliminarproveedor(id: string) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¿Está seguro de eliminar la categoría?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Confirm Cancel');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Confirm Ok');
              this.confirmarEliminacion(id);
            }
          }
        ]
      });
      await alert.present();
    }

    async eliminar(id: string) {
      this.eliminarproveedor(id);
    }

}
