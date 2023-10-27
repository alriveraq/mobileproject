import { Producto } from "./producto";

export class Comentario
{
    id: string;
    comentario: string;
    producto: Producto;

    
    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.comentario = obj && obj.comentario || null;
        this.producto = obj && obj.producto || null;
    }
}