import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { AuthServiceService } from '../auth-service.service';
import { Usuario } from '../interface-usuario/usuario';
import { ServicioUsuarioService } from '../servicio-usuario.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;
  usuario: Usuario = {
    id: '',
    nombre: '', // Add the 'nombre' property
    email: '',
    uid: '',
    password: null,
    password2: null,
    rol: 'USER_ROLE',
  };

  id: any = '';
  
  constructor(
    private auth: AuthServiceService,
    private firebase: ServicioUsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private aroute: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
    this.id = this.aroute.snapshot.paramMap.get('id');
    console.log(this.id);;
  }

  async registro() {
    if (this.registroForm.valid) {
      const user: any = {
        nombre: this.registroForm.value.nombre,
        email: this.registroForm.value.email,
        password: this.registroForm.value.password,
        password2: this.registroForm.value.password2,
        rol: 'USER_ROLE',
        imagen: '',
      };
  
      console.log(this.usuario);
  
      const res = await this.auth.register(user).catch((error) => {
        console.log(error);
      });
  
      if (res != null && res.user != null) {
        console.log('Registro exitoso');
        this.usuario.password = null;
        this.usuario.password2 = null
        this.usuario.email = this.registroForm.value.email;
        this.usuario.nombre = this.registroForm.value.nombre;
        this.usuario.uid = res.user.uid;  
        this.router.navigate(['/usuario/login']);
        await this.firebase.agregarUsuario(this.usuario).then(() => {
          console.log('Usuario agregado');
        });
      }
    } else {
      console.log('Por favor, complete todos los campos del formulario.');
    }
  }

}
