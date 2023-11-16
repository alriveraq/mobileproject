import { Producto } from './producto';
export class Carro {
    id: string;
    uid: string;
    producto: Producto;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.uid = obj && obj.uid || null;
        this.producto = obj && obj.producto || null;
    }
}