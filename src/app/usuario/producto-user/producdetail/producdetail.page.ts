import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/admin/interface-admin/comentario';
import { Producto } from 'src/app/admin/interface-admin/producto';
import { ProductouserServiceService } from '../productouser-service.service';
@Component({
  selector: 'app-producdetail',
  templateUrl: './producdetail.page.html',
  styleUrls: ['./producdetail.page.scss'],
})
export class ProducdetailPage implements OnInit {
  comentarioform!: FormGroup;
  comentarios: Comentario[] = [];
  comentario: Comentario = {
    id: '',
    comentario: '',
    producto: {
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
      stock: 0,
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
    stock: 0,
  };


  constructor(
    private firebase: ProductouserServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getproducto();
    this.getcomentarios();
    this.comentarioform = this.formBuilder.group({
      comentario: ['', Validators.required],
    });
  }

  getproducto() {
    this.firebase.getproducto(this.route.snapshot.params['id']).subscribe(data => {
      this.producto = data;
      console.log('soy el producto',this.producto);
    });
  }

  getcomentarios() {
    this.firebase.getcomentariosporproducto(this.route.snapshot.params['id']).subscribe(data => {
      this.comentarios = data;
      data.forEach((element: any) => {
        this.comentarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.comentarios);
    });
  }
  agregarcomentario() {
    const productoref = this.firebase.getproducref(this.route.snapshot.params['id']);
    console.log(productoref);
    const comentario: any = {
      comentario: this.comentarioform.value.comentario,
      producto: productoref
    };
  
    this.firebase.agregarcomentario(comentario).then(() => {
      console.log('Comentario agregado', productoref);
    })
  }

  formatNumber(value: number): string {
    // Lógica personalizada para agregar puntos como separadores de miles
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
