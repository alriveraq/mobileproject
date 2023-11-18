import { Component, OnInit } from '@angular/core';
import { CarroService } from '../carro.service';
import { AuthService } from 'src/app/servicio/auth.service';
import { Carro } from 'src/app/admin/interface-admin/carro';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carritoItems: Carro[] = [];
  
login = false;
  constructor(private car: CarroService,
    private auth: AuthService) {
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
  ngOnInit() {
    this.obtenerCarrito();
    this.obtenerCarritol();
    
  }
  //sin login
  obtenerCarrito(): any[] { 
    return this.car.getCarrito();
  }

  eliminarDelCarrito(index: number): void {
    this.car.eliminarDelCarrito(index);
  }
  calcularTotalNoAutenticado(carritoNoAutenticado: any[]): number {
    // La lógica para calcular el total en el carrito no autenticado
    return carritoNoAutenticado.reduce((total, item) => total + item.precio, 0);
  }

  //con login
  async obtenerCarritol() {
  try {
    const uid = await this.auth.getuid(); // Obtener el UID del usuario autenticado

    if (uid) {
      this.car.getCarritol(uid).subscribe((carritoItems) => {
        // Asignar el ID del documento a la propiedad 'id' de cada elemento
        this.carritoItems = carritoItems.map((item: any) => {
          return { id: item.itemid, ...item };  // Suponiendo que el campo en Firestore es 'itemid'
        });

        console.log('Carrito obtenido con éxito:', this.carritoItems);
      });
    } else {
      console.error('Usuario no autenticado');
    }
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
  }
}



  async eliminarDelCarritol(itemid: string) {
  try {
    const uid = await this.auth.getuid();

    if (uid) {
      // Utiliza el ID directamente en la lógica
      const item = this.carritoItems.find(carritoItem => carritoItem.id === itemid);
      console.log('Item a eliminar:', item);

      if (item) {
        item.id = itemid;
        console.log('Item ID asignado:', itemid);
        await this.car.eliminarDelCarritol(uid, item.id);
        console.log('Producto eliminado del carrito con éxito.');
        this.obtenerCarritol(); // Actualizar la lista después de eliminar
      } else {
        console.error('Item no encontrado en el carrito.');
      }
    } else {
      console.error('Usuario no autenticado');
    }
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
  }
  }
  calcularTotal(): number {
    return this.carritoItems.reduce((total, item) => total + item.producto.precio, 0);
  }

  formatNumber(value: number): string {
    // Lógica personalizada para agregar puntos como separadores de miles
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }



}
