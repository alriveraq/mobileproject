import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interface-usuario/usuario';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-verperfil',
  templateUrl: './verperfil.page.html',
  styleUrls: ['./verperfil.page.scss'],
})
export class VerperfilPage implements OnInit {
  usuario: Usuario = {
    id: '',
    nombre: '',
    email: '',
    uid: '',
    password: '',
    password2: '',
    rol: 'USER_ROLE',
  }

  uid: any = '';

  constructor(private auth: AuthServiceService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    const uid = await this.auth.getuid();
    if (uid) {
      this.uid = uid;    
      console.log(this.uid);
    } else
      console.log('No existe usuario');
  }

}
