import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Admin/principal', url: 'admin/principal', icon: 'mail' },
    { title: 'Login', url: 'usuario/login', icon: 'basket' },

  ];

}
