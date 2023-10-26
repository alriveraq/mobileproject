import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/usuario/auth-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() titulo: string = 'Nombre página';

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private toastController: ToastController
  ) {}

  public toastButtons = [
    {
      text: 'Cerrar sesión',
      role: 'Cerrar sesión',
      handler: () => {
        this.logout();
      },
    },
  ];

  logout() {
    this.auth.logut();
    this.router.navigate(['/usuario/login']);
  }
}
