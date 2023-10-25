import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credenciales = {
    email: '',
    password: ''
  }
  constructor(private auth: AuthServiceService) { }

  ngOnInit() {
  }

  async login() {
    console.log(this.credenciales);
    const res = await this.auth.login(this.credenciales.email, this.credenciales.password)
    if (res !== undefined) {
      console.log('Logueado correctamente'); 
    }

  }

}
