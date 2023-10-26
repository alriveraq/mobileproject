export class Usuario {
    id:string
    nombre:string;
    email:string;
    password:string | null; 
    password2:string | null;
    rol: 'ADMIN_ROLE' | 'USER_ROLE';
    imagen:string;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.nombre = obj && obj.nombre || null;
        this.email = obj && obj.email || null;
        this.password = obj && obj.password || null;
        this.password2 = obj && obj.password2 || null;
        this.rol = obj && obj.rol || null;
        this.imagen = obj && obj.imagen || null;
    }
}