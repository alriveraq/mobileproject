import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { Categoria } from '../interface-admin/categoria';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  constructor(private db: AngularFirestore) { }

  getcategorias(): Observable<any> {
    return this.db.collection<Categoria>('categorias').snapshotChanges();
  }

  agregarCategoria(categoria: Categoria): Promise<Categoria> {
    return this.db.collection<Categoria>('categorias').add(categoria);
  }
  eliminarCategoria(id: string): Promise<any> {
    return this.db.collection<Categoria>('categorias').doc(id).delete();
  }

  getcategoria(id: string): Observable<any> {
    return this.db.collection<Categoria>('categorias').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Categoria;
          const categoryId = changes.payload.id;
          return { categoryId, ...data };
        }),
        catchError(error => {
          // Manejo de errores aquí
          console.error('Error al obtener la categoría:', error);
          return of(null);
        })
      );
  }

  actualizarCategoria(id: string, data: any): Promise<any> {
    return this.db.collection<Categoria>('categorias').doc(id).update(data)
  }
}
