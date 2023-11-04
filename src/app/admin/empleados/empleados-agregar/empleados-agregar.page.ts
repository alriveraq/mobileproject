import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Empleados } from '../../interface-admin/empleados';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-empleados-agregar',
  templateUrl: './empleados-agregar.page.html',
  styleUrls: ['./empleados-agregar.page.scss'],
})
export class EmpleadosAgregarPage implements OnInit {

  empleadoform!: FormGroup;
  submitted = false;
  loading = false;
  public imgcargando = false;
  public img64 = '';
  empleado: Empleados = {
    id: '',
    nombre: '',
    apellidos: '',
    fecha_nacimiento: '',
    rut: '',
    direccion: '',
    telefono: '',
    email: '',
    turno: '',
    img: ''
  };

  id: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private firestore: EmpleadoService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private aroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.empleadoform = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      turno: ['', Validators.required],
      img: ['', Validators.required]
    });
    this.id = this.aroute.snapshot.paramMap.get('id');
  }

  public cfoto(evento: Event){
    this.imgcargando = true;
    const elemento = evento.target as HTMLInputElement;
    const img = elemento.files?.[0];
    console.log(img);
    if (img) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.imgcargando = false;
        this.img64 = reader.result as string;
      }
    }
  }

  agregarempleado() {

    const empleado: any = {
      nombre: this.empleadoform.value.nombre,
      apellidos: this.empleadoform.value.apellidos,
      fecha_nacimiento: this.empleadoform.value.fecha_nacimiento,
      rut: this.empleadoform.value.rut,
      direccion: this.empleadoform.value.direccion,
      telefono: this.empleadoform.value.telefono,
      email: this.empleadoform.value.email,
      turno: this.empleadoform.value.turno,
      img: this.img64
    };
    this.firestore.agregarempleado(empleado).then(() => {
      this.loading = false;
      this.router.navigate(['/admin/empleados']);
    });
  }

}
