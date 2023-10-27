import { Categoria } from "./categoria";

export class Subcategoria
{
    id: string;
    nombre: string;
    categoria: Categoria;

    
    constructor(obj: any) {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.categoria = obj && obj.categoria || null;
    }
}