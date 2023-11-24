import { Injectable } from '@angular/core';
import { Producto } from '../../admin/interface-admin/producto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { catchError, map } from 'rxjs/operators';
import { Carro } from 'src/app/admin/interface-admin/carro';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private carrito: any[] = [];

  constructor(
    private db: AngularFirestore,
    private auth: AuthServiceService
  ) {
    const carritoGuardado = localStorage.getItem('carrito');
    if(carritoGuardado){
      this.carrito = JSON.parse(carritoGuardado);
    }
  }
  
  
  // Carrito sin login
  getCarrito(): any[]{
    return this.carrito
  }

  agregarcarrito(Producto: any): void{
    this.carrito.push(Producto);
    this.actualizarcarrito();
  }

  eliminarDelCarrito(index: number): void{
    this.carrito.splice(index, 1);
    this.actualizarcarrito();
  }

  private actualizarcarrito(): void{
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  eliminarCarrito(): void{
    this.carrito = [];
    this.actualizarcarrito();
  }

  //carrito con login
  //conseguimos la uid del usuario
 getCarritol(uid: string): Observable<Carro[]> {
  return this.db.collection<Carro>(`carritos/${uid}/items`).snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Carro;
        const itemid = a.payload.doc.id;
        return { itemid, ...data };
      });
    })
  );
}

  agregarAlCarritol(id: string, uid: string, item: any): Promise<any> {
  // Eliminar la propiedad id si es nulo o vacío
  if (!id) {
    const { id: _, ...newItemWithoutId } = { id, uid, producto: { ...item } };
    return this.db.collection(`carritos/${uid}/items`).add(newItemWithoutId);
  }

  // Agregar el elemento con la propiedad id
  const newItem: Carro = { id, uid, producto: { ...item } };
  return this.db.collection(`carritos/${uid}/items`).add(newItem);
}


 eliminarDelCarritol(uid: string, itemid: string): Promise<void> {
  if (!itemid) {
    // Manejar el caso donde itemId es undefined, null o una cadena vacía
    console.error('Error: itemId no válido');
    return Promise.reject('Error: itemId no válido');
  }

  return this.db.collection(`carritos/${uid}/items`).doc(itemid).delete();
 }
  
  eliminarCarritol(uid: string): Promise<void> {
    return this.db.collection(`carritos/${uid}/items`).ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  }

}
