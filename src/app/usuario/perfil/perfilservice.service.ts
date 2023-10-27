import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../interface-usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class PerfilserviceService {

  constructor(private db: AngularFirestore) { }

  getuser(id: string): Observable<any> {
    return this.db.collection<Usuario>('usuario').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Usuario;
          const userId = changes.payload.id;
          return { userId, ...data };
        }),
        catchError(error => {
          // Manejo de errores aquí
          console.error('Error al obtener el producto:', error);
          return of(null);
        })
      );
  }

  actualizaruser(id: string, data: any): Promise<any> {
    return this.db.collection<Usuario>('usuario').doc(id).update(data)
  }
}
