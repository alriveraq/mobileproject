export class Categoria {
    id: string;
    nombre?: string;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.id || null;
    }
}

