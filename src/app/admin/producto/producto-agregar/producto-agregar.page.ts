import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController, NavController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../interface-admin/producto';
import { ProductoServiceService } from '../producto-service.service';
import { Subcategoria } from '../../interface-admin/subcategoria';
import { SubcServiceService } from '../../subcategorias/subc-service.service';

@Component({
  selector: 'app-producto-agregar',
  templateUrl: './producto-agregar.page.html',
  styleUrls: ['./producto-agregar.page.scss'],
})
export class ProductoAgregarPage implements OnInit {
  productoform!: FormGroup;
  submitted = false;
  loading = false;
  public imgcargando = false;
  public img64 = '';
  subcategorias!: Subcategoria[];
  subcategoria: Subcategoria = {
    id: '',
    nombre: '',
    categoria: {
      id: '',
      nombre: ''
    }
  };
  producto: Producto = {
    id: '',
    nombre: '',
    tipo_producto: '',
    img: '',
    gpu: '',
    memoria: '',
    frecuencia: '',
    bus: '',
    precio: 0,
    capacidad: '',
    tipo: '',
    formato: '',
    voltaje: '',
    subcategoria: {
      id: '',
      nombre: '',
      categoria: {
        id: '',
        nombre: ''
      }
    },
    stock: 0
  };
  id: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private firebase: ProductoServiceService,
    private subcate: SubcServiceService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private aroute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getsubc();
    this.productoform = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo_producto: ['', Validators.required],
      gpu: [''],
      memoria: [''],
      frecuencia: [''],
      bus: [''],
      precio: ['', Validators.required],
      capacidad: [''],
      tipo: [''],
      formato: [''],
      voltaje: [''],
      subcategoria: ['', Validators.required],
      stock: ['', Validators.required],
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

  getsubc() {
    this.subcate.getsubcs().subscribe(data => {
      this.subcategorias = [];
      data.forEach((element: any) => {
        this.subcategorias.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.subcategorias);
    });
  }


  agregarproducto() {

    const subcategoriaRef = this.subcate.getsubcref(this.productoform.value.subcategoria);
    const producto: any = {
      nombre: this.productoform.value.nombre,
      tipo_producto: this.productoform.value.tipo_producto,
      img: this.img64,
      gpu: this.productoform.value.gpu,
      memoria: this.productoform.value.memoria,
      frecuencia: this.productoform.value.frecuencia,
      bus: this.productoform.value.bus,
      precio: this.productoform.value.precio,
      capacidad: this.productoform.value.capacidad,
      tipo: this.productoform.value.tipo,
      formato: this.productoform.value.formato,
      voltaje: this.productoform.value.voltaje,
      stock: this.productoform.value.stock,
      subcategoria: subcategoriaRef
    };

    this.firebase.agregarProducto(producto).then(() => {
      this.loading = false;
      console.log(producto);
      this.router.navigate(['/admin/producto']);
    });
  }
}
