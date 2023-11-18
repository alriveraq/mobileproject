import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interface-admin/producto';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoServiceService } from '../producto-service.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  tipoProductoSeleccionado: string = '';
  productos!: Producto[];
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
    stock: 0,
  };
  constructor(
    private navCtrl: NavController,
    private firestore: ProductoServiceService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getproductos();
  }

  getproductos() {
    this.firestore.getproductos().subscribe(data => {
      this.productos = [];
      data.forEach((element: any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.productos);
    });


  }

  editarProductos(productoId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarProducto **************** ID:" + productoId);
    this.navCtrl.navigateForward(`admin/producto-editar/${productoId}`);
  }

  async getproducto() {
    console.log("getProduct ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.firestore.getproducto(this.route.snapshot.paramMap.get('id')!)
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


  eliminarproducto(id: string) {
    this.firestore.eliminarProducto(id).then(() => {
      console.log('empelado eliminado con exito');
    }
    ).catch(error => {
      console.log(error);
    });
  }

  formatNumber(value: number): string {
    // Lógica personalizada para agregar puntos como separadores de miles
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  

  


}
