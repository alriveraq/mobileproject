import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServicioAdminService } from '../../servicio/servicio-admin.service';
import { Producto } from '../../interface-admin/producto';
@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.page.html',
  styleUrls: ['./producto-editar.page.scss'],
})
export class ProductoEditarPage implements OnInit {
  productoForm!: FormGroup;
  producto: Producto = {
    id: '',
    nombre: '',
    tipo_producto: '',
    img: '',
    gpu: '',
    memoria: '',
    frecuencia: '',
    bus: '',
    precio: 1,
    capacidad: '',
    tipo: '',
    formato: '',
    voltaje: ''
  };
  tipoProductoSeleccionado: string = '';
  id: any = '';

  constructor(
    public restApi: ServicioAdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);

    this.actualizarproducto(this.route.snapshot.params['id']);

    this.productoForm = this.formBuilder.group({
      'nombre': [null],
      'img': [null],
      'gpu': [null],
      'memoria': [null],
      'frecuencia': [null],
      'bus': [null],
      'precio': [null],
      'capacidad': [null], // Elimin si está presente
      'tipo': [null],
      'formato': [null],
      'voltaje': [null],
      'tipo_producto': [this.tipoProductoSeleccionado]
    });
  }

  async onformSubmit() {
    console.log("onformSubmit ID " + this.id);
    const formData = this.productoForm.value; // Obtén el valor del formulario
    formData.id = this.id;
    formData.tipo_producto = this.tipoProductoSeleccionado;
  
    await this.restApi.actualizarproducto(this.id, formData)
      .subscribe({
        next: data => {
          console.log("actualizarcategoria OK");
          console.log(data);
          this.presentAlertConfirm("Actualizado correctamente");
        },
        complete: () => {},
        error: (err) => {
          console.log("actualizarcategoria ERROR");
          console.log(err);
        }
      });
  }

  async actualizarproducto(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.restApi.getproducto(id + "")
    .subscribe({
      next: data => {
        console.log('Tipo de Producto seleccionado:'+ data.tipo_producto);
        console.log("getcategoria OK");
        console.log(data);
        this.id = data.id;
        this.tipoProductoSeleccionado = data.tipo_producto;
        this.productoForm.patchValue({
          nombre: data.nombre,
          tipo_producto: data.tipo_producto,
          img: data.img,
          gpu: data.gpu,
          memoria: data.memoria,
          frecuencia: data.frecuencia,
          bus: data.bus,
          precio: data.precio,
          capacidad: data.capacidad,
          tipo: data.tipo,
          formato: data.formato,
          voltaje: data.voltaje
        });
        loading.dismiss();
    }
    , complete: () => {}
    , error: (err) => {
      console.log("getcategoria ERROR");
      console.log(err);
      loading.dismiss();
    }
    })
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/producto/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
