import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Usuario } from '../interface-user/user';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  credenciales = {
    email: '',
    password: ''
  }

  constructor(
    private auth: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async registro() {
    console.log(this.credenciales);
    const res = await this.auth.register(this.credenciales.email, this.credenciales.password)
    if (res !== undefined) {
      console.log('Logueado correctamente');
      this.router.navigate(['/home']);
    }

  }


}
