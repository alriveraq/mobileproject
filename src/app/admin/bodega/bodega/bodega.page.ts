import { Component, OnInit } from '@angular/core';
import { Bodega } from '../../interface-admin/bodega';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAdminService } from '../../servicio-admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.page.html',
  styleUrls: ['./bodega.page.scss'],
})
export class BodegaPage implements OnInit {
  bodegas?: Bodega[];
  bodega: Bodega = {
    id: '',
    nombre: '',
    direccion: '',
    comuna: '',
    region: '',
    telefono: '',
    img: ''
  };

  constructor(private navCtrl: NavController,
    private restApi: ServicioAdminService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController) { 
    
  }

  ngOnInit() {
    this.getbodegas();
  }

  async getbodegas() {
    console.log("Entrando :getbodegas");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getbodegas()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.bodegas = res;
          console.log("thisProductos:",this.bodegas);
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

  editarbodega(localId: string) {
    // Redirige a la página "local-editar" con el ID de la categoría como parámetro
    console.log("editarbodega **************** ID:" + localId);
    this.navCtrl.navigateForward(`/bodega-editar/${localId}`);
  }


  async getbodega() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getlocal(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.bodega = res;
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
    await this.restApi.eliminarlocal(id)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          loading.dismiss();
          this.getbodegas();
        },
        complete: () => { },
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        }
      });
    }

    async eliminarbodega(id: string) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¿Está seguro de eliminar la bodega?',
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
      this.eliminarbodega(id);
    }


}
