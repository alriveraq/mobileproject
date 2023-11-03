import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getid(){
    return this.firestore.createId();
  }

  getcolecction<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getdoc<tipo>(path: string, id: string){
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  updatedoc(data: any, path: string, id: string){
    return this.firestore.collection(path).doc(id).update(data);
  }
}
