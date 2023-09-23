export class subcategoria
{
    id: string;
    nombre: string;
    categoria: string;

    
    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.categoria = obj && obj.categoria || null;
    }
}