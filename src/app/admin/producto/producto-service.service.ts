import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Producto } from '../interface-admin/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(private db: AngularFirestore) { }

  getproductos(): Observable<any> {
    return this.db.collection<Producto>('producto').snapshotChanges();
  }

  agregarProducto(producto: Producto): Promise<any> {
    return this.db.collection<Producto>('producto').add(producto);
  }
  eliminarProducto(id: string): Promise<any> {
    return this.db.collection<Producto>('producto').doc(id).delete();
  }

  getproducto(id: string): Observable<any> {
    return this.db.collection<Producto>('producto').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Producto;
          const productoId = changes.payload.id;
          return { productoId, ...data };
        }),
        catchError(error => {
          // Manejo de errores aquí
          console.error('Error al obtener el producto:', error);
          return of(null);
        })
      );
  }

  actualizarProducto(id: string, data: any): Promise<any> {
    return this.db.collection<Producto>('producto').doc(id).update(data)
  }
}
