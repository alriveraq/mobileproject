export class Producto {
    id: string;
    nombre: string;
    tipo_producto: string;
    img: string;
    gpu?: string;
    memoria?: string;
    frecuencia: string;
    bus?: string;
    precio: number;
    capacidad?: string;
    tipo?: string;
    formato?: string;
    voltaje?: string;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.tipo_producto = obj && obj.tipo_producto || null;
        this.img = obj && obj.img || null;
        this.gpu = obj && obj.gpu || null;
        this.memoria = obj && obj.memoria || null;
        this.frecuencia = obj && obj.frecuencia || null;
        this.bus = obj && obj.bus || null;
        this.precio = obj && obj.precio || null;
        this.capacidad = obj && obj.capacidad || null;
        this.tipo = obj && obj.tipo || null;
        this.formato = obj && obj.formato || null;
        this.voltaje = obj && obj.voltaje || null;
    }
}