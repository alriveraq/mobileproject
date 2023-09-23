export class Empleados {
    id: string;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    rut: string;
    direccion: string;
    telefono: string;
    email: string;
    turno: string;
    img: string;

    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.apellidos = obj && obj.apellidos || null;
        this.fecha_nacimiento = obj && obj.fecha_nacimiento || null;
        this.rut = obj && obj.rut || null;
        this.direccion = obj && obj.direccion || null;
        this.telefono = obj && obj.telefono || null;
        this.email = obj && obj.email || null;
        this.turno = obj && obj.turno || null;
        this.img = obj && obj.img || null;
    }
}