import { Component } from '@angular/core';
import { AuthServiceService } from './usuario/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Admin/principal', url: 'admin/principal', icon: 'mail' },
    { title: 'Login', url: 'usuario/login', icon: 'basket' },
    { title: 'Productos', url: 'usuario/productos', icon: 'basket' },

  ];

  constructor(private auth: AuthServiceService,
    private router: Router) {}

  logout() {
    this.auth.logut();
    console.log('logout');
    this.router.navigate(['/usuario/login']);
  }

}
