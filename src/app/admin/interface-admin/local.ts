export class Local {
    id: string;
    nombre: string;
    direccion: string;
    comuna: string;
    region: string;
    telefono: string;
    img: string;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.name || null;
        this.direccion = obj && obj.direccion || null;
        this.comuna = obj && obj.comuna || null;
        this.region = obj && obj.region || null;
        this.telefono = obj && obj.telefono || null;
        this.img = obj && obj.img || null;
    }
    }
