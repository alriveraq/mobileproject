import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comentario } from 'src/app/admin/interface-admin/comentario';
import { Producto } from 'src/app/admin/interface-admin/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductouserServiceService {

  constructor(private db: AngularFirestore) {}

  getproductos(): Observable<any> {
    return this.db.collection<Producto>('producto').snapshotChanges();
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
  getproducref(id: string): DocumentReference {
    return this.db.collection<Producto>('producto').doc(id).ref;
  }
  

  getcomentariosporproducto(id: string): Observable<Comentario[]> {
    const productRef = this.db.collection<Producto>('producto').doc(id).ref; // Obtén la referencia al producto
    return this.db.collection<Comentario>('comentario', ref => ref.where('producto', '==', productRef))
      .valueChanges() as Observable<Comentario[]>;
  }

  agregarcomentario(comentario: Comentario): Promise<any> {
    return this.db.collection<Comentario>('comentario').add(comentario);
  }
}
