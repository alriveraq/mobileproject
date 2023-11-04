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

<<<<<<< HEAD
  async registro() {
    if (this.registroForm.valid) {
      const user: any = {
        nombre: this.registroForm.value.nombre,
        email: this.registroForm.value.email,
        password: this.registroForm.value.password,
        password2: this.registroForm.value.password2,
        rol: 'USER_ROLE',
      };
  
      console.log(this.usuario);
  
      const res = await this.auth.register(user).catch((error) => {
        console.log(error);
=======
  async onFormSubmit(form: NgForm) {
    console.log("onFormSubmit del Product ADD")

    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Muestra el Loading Controller
    await loading.present();

    // Ejecuta el método del servicio y los suscribe
    await this.restApi.agregarusuario(this.usuario)
      .subscribe({
        next: (res) => {
          console.log("Usuario Agregado ",res)
          loading.dismiss(); //Elimina la espera
          if (res== null){ // No viene respuesta del registro
            console.log("Usuario no agregado, Ress Null ");
            return
          }
          // Si viene respuesta
          console.log("Next Agrego SIIIIII Router saltaré ;",this.router);
          this.router.navigate(['usuario/login']);
        }
        , complete: () => { }
        , error: (err) => {
          console.log("Error Página",err);
          loading.dismiss(); //Elimina la espera
        }
>>>>>>> 289cfbfc14642033faa159edb58f71fac81de0e3
      });
  
      if (res != null && res.user != null) {
        console.log('Registro exitoso');
        const path = 'usuario';
        const id = res.user.uid;
        this.usuario.password = null;
        this.usuario.password2 = null
        this.usuario.email = this.registroForm.value.email;
        this.usuario.nombre = this.registroForm.value.nombre;
        this.usuario.uid = id;  
        this.router.navigate(['/usuario/productos']);
        await this.firebase.createDoc(this.usuario, path, id).then(() => {
          console.log('Usuario agregado');
        });
      }
    } else {
      console.log('Por favor, complete todos los campos del formulario.');
    }
  }

}
