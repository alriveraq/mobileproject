import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interface-admin/producto';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAdminService } from '../../servicio-admin.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  tipoProductoSeleccionado: string = '';
  productos!: Producto[];
  productosFiltrados: Producto[] = [];
  producto: Producto = {
    id: '',
    nombre: '',
    tipo_producto: '',
    img: '',
    gpu: '',
    memoria: '',
    frecuencia: '',
    bus: '',
    precio: 0,
    capacidad: '',
    tipo: '',
    formato: '',
    voltaje: '',
  };
  constructor(
    private navCtrl: NavController,
    private restApi: ServicioAdminService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getproductos();
  }

  async getproductos() {
    console.log("Entrando :getProducts");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando... '
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getproductos()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.productos = res;
          console.log("thisProductos:",this.productos);
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

  editarProductos(productoId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarProducto **************** ID:" + productoId);
    this.navCtrl.navigateForward(`admin/producto-editar/${productoId}`);
  }

  async getproducto() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getproducto(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.producto = res;
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
    await this.restApi.eliminarproducto(id)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          loading.dismiss();
          this.getproductos();
        },
        complete: () => { },
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        }
      });
    }


    async eliminarProducto(id: string) {
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
      this.eliminarProducto(id);
    }


  filtrarProductos() {
    if (!this.tipoProductoSeleccionado || this.tipoProductoSeleccionado === '') {
      // Si no se selecciona ningún tipo o se selecciona "Todos", mostrar todos los productos.
      this.productosFiltrados = this.productos;
    } else {
      // Filtrar productos basados en el tipo de producto seleccionado.
      this.productosFiltrados = this.productos.filter(
        (producto) => producto.tipo_producto === this.tipoProductoSeleccionado
      );
    }
  }
  

  

  


}
