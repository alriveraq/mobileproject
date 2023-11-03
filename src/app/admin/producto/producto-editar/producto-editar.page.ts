import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Producto } from '../../interface-admin/producto';
import { ProductoServiceService } from '../producto-service.service';
@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.page.html',
  styleUrls: ['./producto-editar.page.scss'],
})
export class ProductoEditarPage implements OnInit {
  productoForm!: FormGroup;
  public imgcargando = false;
  public img64 = '';
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
    voltaje: '',
    stock: 1,
  };
  tipoProductoSeleccionado: string = '';
  id: any = '';

  constructor(
    public firestore: ProductoServiceService,
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
      nombre: [null, Validators.required],
      tipo_producto: [null, Validators.required],
      gpu: [null],
      memoria: [null],
      frecuencia: [null, Validators.required],
      bus: [null],
      precio: [null, Validators.required],
      capacidad: [null],
      tipo: [null],
      formato: [null],
      voltaje: [null]
    });
  }



  async onformSubmit(form: NgForm) {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();
    this.id = this.route.snapshot.params['id']
    await this.firestore.actualizarProducto(this.id, form)
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/admin/producto/']);
      }, (error) => {
        console.log(error);
        loading.dismiss();
      });
  }

  async actualizarproducto(id: string) {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    await this.firestore.getproducto(id + "")
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
            this.router.navigate(['/admin/producto/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
