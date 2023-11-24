export class Factura {
    id: string;
    uid: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    rut: string;
    total: number;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.uid = obj && obj.uid || null;
        this.nombre = obj && obj.nombre || null;
        this.apellido = obj && obj.apellido || null;
        this.correo = obj && obj.correo || null;
        this.telefono = obj && obj.telefono || null;
        this.rut = obj && obj.rut || null;
        this.total = obj && obj.total || null;
    }
}