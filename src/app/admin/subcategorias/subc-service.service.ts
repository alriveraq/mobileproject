import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Subcategoria } from '../interface-admin/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcServiceService {

  constructor(private db: AngularFirestore) { }

  getsubcs(): Observable<any> {
    return this.db.collection<Subcategoria>('subcategoria').snapshotChanges();
  }

  agregarsubc(subcategoria: Subcategoria): Promise<any> {
    return this.db.collection<Subcategoria>('subcategoria').add(subcategoria);
  }
  eliminarsubc(id: string): Promise<any> {
    return this.db.collection<Subcategoria>('subcategoria').doc(id).delete();
  }

  getsubc(id: string): Observable<any> {
    return this.db.collection<Subcategoria>('subcategoria').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Subcategoria;
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
  // obtenemos la referencia del documento
  getsubcref(id: string): DocumentReference<Subcategoria> { // Change the return type to DocumentReference<Subcategoria>
    return this.db.collection<Subcategoria>('subcategoria').doc(id).ref; // Return the reference directly
  }

  actualizarsubc(id: string, data: any): Promise<any> {
    return this.db.collection<Subcategoria>('subcategoria').doc(id).update(data)
  }
}
