import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Local } from '../interface-admin/local';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private db: AngularFirestore) { }
  getlocales(): Observable<any> {
    return this.db.collection<Local>('locales').snapshotChanges();
  }

  agregarlocal(locales: Local): Promise<Local> {
    return this.db.collection<Local>('locales').add(locales);
  }
  eliminarlocal(id: string): Promise<any> {
    return this.db.collection<Local>('locales').doc(id).delete();
  }

  getlocal(id: string): Observable<any> {
    return this.db.collection<Local>('locales').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Local;
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

  actualizarlocal(id: string, data: any): Promise<any> {
    return this.db.collection<Local>('locales').doc(id).update(data)
  }

  getloref(id: string): DocumentReference<Local> { // Change the return type to DocumentReference<Subcategoria>
    return this.db.collection<Local>('locales').doc(id).ref; // Return the reference directly
  }
}
