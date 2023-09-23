import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interface-admin/categoria';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAdminService } from '../../servicio-admin.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categorias?: Categoria[]; // Propiedad para almacenar los datos
  categoria: Categoria = {
    id: '',
    nombre: ''
  };
  constructor(
    private navCtrl: NavController,
    private restApi: ServicioAdminService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getcategorias();
  }

  async getcategorias() {
    console.log("Entrando :getcategorias");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getcategorias()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.categorias = res;
          console.log("thisProductos:",this.categorias);
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

  editarCategoria(categoriaId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarCategoria **************** ID:" + categoriaId);
    this.navCtrl.navigateForward(`/categoria-editar/${categoriaId}`);
  }


  async getcategoria() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getcategoria(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.categoria = res;
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
    await this.restApi.eliminarcategoria(id)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          loading.dismiss();
          this.getcategorias();
        },
        complete: () => { },
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        }
      });
    }

    async eliminarCategoria(id: string) {
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
      this.eliminarCategoria(id);
    }
}
