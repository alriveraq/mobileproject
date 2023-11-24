import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Factura } from 'src/app/admin/interface-admin/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private db: AngularFirestore
  ) { }


  agregarfactura(factura: Factura): Promise<any> {
    return this.db.collection<Factura>('factura').add(factura);
  }
}
