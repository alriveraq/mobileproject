import { Component } from '@angular/core';
import { AuthServiceService } from './usuario/auth-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
login = false;
  constructor(private auth: AuthServiceService,
    private router: Router,
    private navCtrl: NavController) {
      this.auth.stateuser().subscribe(res => {
        if (res){
          console.log('loged');
          this.login = true;
        } else {
          console.log('not loged');
          this.login = false;
        }
        console.log(res);
      });
    }

  logout() {
    this.auth.logut();
    console.log('logout');
    this.router.navigate(['/usuario/login']);
  }
}
