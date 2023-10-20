import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Categoria } from '../interface-admin/categoria';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private firestore: AngularFirestore) { }

  getCategories() {
    return this.firestore.collection<Categoria>('categorias').valueChanges();
  }


  getcategoria(id: string){
    return this.firestore.collection<Categoria>('categorias').doc(id).valueChanges();
  }

  updatecagoria(id: string, data: Categoria): Promise<void> {
    return this.firestore.collection<Categoria>('categorias').doc(id).update(data);
  }
}


