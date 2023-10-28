import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Usuario } from './interface-usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {

  constructor(private db: AngularFirestore) {}

  createDoc(data: any, path: string, id: string) {

    const collection = this.db.collection(path);
    return collection.doc(id).set(data);

  }
  

  getUsuario(id: string): Observable<any> {
    return this.db.collection<Usuario>('usuario').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Usuario;
          const userId = changes.payload.id;
          return { userId, ...data };
        }),
        catchError(error => {
          // Manejo de errores aquí
          console.error('Error al obtener el usuario:', error);
          return of(null);
        })
      );
  }

  getDoc<tipo>(path: string, id: string) {
    return this.db.collection(path).doc<tipo>(id).valueChanges()
   }

  updateDoc(path: string, id: string, data: any) {
    return  this.db.collection(path).doc(id).update(data);
  }
}
