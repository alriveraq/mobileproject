export class Usuario {
    id: string;
    nombre_usuario: string;
    email: string;
    contrasena: string;
    img: string;

    constructor(obj:any)
    {
        this.id = obj && obj.id || null;
        this.nombre_usuario = obj && obj.nombre_usuario || null;
        this.email = obj && obj.email || null;
        this.contrasena = obj && obj.contrasena || null;
        this.img = obj && obj.img || null;
    }
    }
