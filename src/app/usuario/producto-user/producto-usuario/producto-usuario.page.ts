import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/admin/interface-admin/producto';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductouserServiceService } from '../productouser-service.service';
import { CarroService } from '../../carro/carro.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-producto-usuario',
  templateUrl: './producto-usuario.page.html',
  styleUrls: ['./producto-usuario.page.scss'],
})
export class ProductoUsuarioPage implements OnInit {
  uid: string = '';
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
  login = false;

  constructor(
    private navCtrl: NavController,
    private firestore: ProductouserServiceService,
    private car: CarroService,
    private loadingController: LoadingController,
    private auth: AuthServiceService,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
  ) { 
    this.auth.stateuser().subscribe(res => {
        if (res){
          console.log('loged');
          this.login = true;
        } else {
          console.log('not loged');
          this.login = false;
        }
        console.log(res);
      });
  }
  obtenerUidUsuario(): Promise<string | null> {
    return this.auth.getuid();
  }

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

  verproducto(productoId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarProducto **************** ID:" + productoId);
    this.navCtrl.navigateForward(`usuario/productodetail/${productoId}`);
  }

  agregaralcarro(producto: Producto) {
    this.car.agregarcarrito(producto);
    console.log('Producto agregado al carrito');
  }
  // ahora logeado
  async agregarAlCarrito(producto: Producto): Promise<void> {
    try {
      const uid = await this.auth.getuid(); // Obtener el UID del usuario autenticado

      if (uid) {
        await this.car.agregarAlCarritol('', uid, producto);
        console.log('Producto agregado al carrito con éxito.');
      } else {
        console.error('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  }

  formatNumber(value: number): string {
    // Lógica personalizada para agregar puntos como separadores de miles
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }


}
