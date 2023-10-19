import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Admin/principal', url: 'admin/principal', icon: 'mail' },
    { title: 'sadfasdsad', url: 'admin/bodega', icon: 'basket' },

  ];

}
