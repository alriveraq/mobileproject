export class Proveedores {
    id: string;
    nombre: string;
    rut_empresa: string;
    direccion: string;
    telefono: string;
    email: string;

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.rut_empresa = obj && obj.rut_empresa || null;
        this.direccion = obj && obj.direccion || null;
        this.telefono = obj && obj.telefono || null;
        this.email = obj && obj.email || null;
    }
}