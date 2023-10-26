import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  constructor(private auth: AuthServiceService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async login() {
    console.log(this.credenciales);
    const res = await this.auth.login(this.credenciales.email, this.credenciales.password)
    if (res !== undefined) {
      console.log('Logueado correctamente'); 
      this.router.navigate(['/admin/producto']);
    }

  }

}
