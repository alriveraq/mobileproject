import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/admin/interface-admin/producto';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductouserServiceService } from '../productouser-service.service';

@Component({
  selector: 'app-producto-usuario',
  templateUrl: './producto-usuario.page.html',
  styleUrls: ['./producto-usuario.page.scss'],
})
export class ProductoUsuarioPage implements OnInit {
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
    private firestore: ProductouserServiceService,
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

  verproducto(productoId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarProducto **************** ID:" + productoId);
    this.navCtrl.navigateForward(`usuario/productodetail/${productoId}`);
  }

}
