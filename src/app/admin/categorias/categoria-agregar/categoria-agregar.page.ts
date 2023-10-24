import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Categoria } from '../../interface-admin/categoria';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirebaseService } from '../../servicio/firebase.service';

@Component({
  selector: 'app-categoria-agregar',
  templateUrl: './categoria-agregar.page.html',
  styleUrls: ['./categoria-agregar.page.scss'],
})
export class CategoriaAgregarPage implements OnInit{

  crearCategoriaForm!: FormGroup;
  submitted = false;
  loading= false;
  categoria: Categoria = {
    id: '',
    nombre: ''
  };

  id: any = '';


  constructor(private firebase: FirebaseService,
    private frombuilder: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute) {
  }

  ngOnInit(){
    this.crearCategoriaForm = this.frombuilder.group({
      nombre: ['', Validators.required]
  })
  this.id = this.aRoute.snapshot.paramMap.get('id');
  console.log(this.id);
  }

  agregarcategoria() {
    const empleado: any = {
      nombre: this.crearCategoriaForm.value.nombre,
    }
    this.loading = true;
    this.firebase.agregarCategoria(empleado).then(() => {
      this.loading = false;
      this.router.navigate(['/admin/categoria']);
    })
  }
}
