import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, of} from 'rxjs';
import { Empleados } from '../interface-admin/empleados';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private db: AngularFirestore) { }

   getempleados(): Observable<any> {
    return this.db.collection<Empleados>('empleados').snapshotChanges();
  }

  agregarempleado(empleados: Empleados): Promise<Empleados> {
    return this.db.collection<Empleados>('empleados').add(empleados);
  }
  eliminarempleado(id: string): Promise<any> {
    return this.db.collection<Empleados>('empleados').doc(id).delete();
  }

  getempleado(id: string): Observable<any> {
    return this.db.collection<Empleados>('empleados').doc(id).snapshotChanges()
      .pipe(
        map(changes => {
          const data = changes.payload.data() as Empleados;
          const empleadoId = changes.payload.id;
          return { empleadoId, ...data };
        }),
        catchError(error => {
          // Manejo de errores aquí
          console.error('Error al obtener la categoría:', error);
          return of(null);
        })
      );
  }

  actualizarempleado(id: string, data: any): Promise<any> {
    return this.db.collection<Empleados>('empleados').doc(id).update(data)
  }

  geteref(id: string): DocumentReference<Empleados> { // Change the return type to DocumentReference<Subcategoria>
    return this.db.collection<Empleados>('empleados').doc(id).ref; // Return the reference directly
  }
}
