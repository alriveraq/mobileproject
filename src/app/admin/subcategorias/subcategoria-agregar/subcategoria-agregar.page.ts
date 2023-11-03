import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interface-admin/categoria';
import { Subcategoria } from '../../interface-admin/subcategoria';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcServiceService } from '../subc-service.service';
import { ProductoServiceService } from '../../producto/producto-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaServiceService } from '../../categorias/categoria-service.service';

@Component({
  selector: 'app-subcategoria-agregar',
  templateUrl: './subcategoria-agregar.page.html',
  styleUrls: ['./subcategoria-agregar.page.scss'],
})
export class SubcategoriaAgregarPage implements OnInit {
  subcategoriaform!: FormGroup;
  submitted = false;
  loading = false;
  categorias!: Categoria[];
  categoria: Categoria = {
    id: '',
    nombre: ''
  };
  subcategorias!: Subcategoria[];
  subcategoria: Subcategoria = {
    id: '',
    nombre: '',
    categoria: {
      id: '',
      nombre: ''
    }
  };

  id: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private firestore: CategoriaServiceService,
    private subcate: SubcServiceService,
    private router: Router,
    private aroute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getcategoria();
    this.subcategoriaform = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required]
    });
    this.id = this.aroute.snapshot.paramMap.get('id');
  }

  getcategoria() { 
    this.firestore.getcategorias().subscribe(data => {
      this.categorias = [];
      data.forEach((element: any) => {
        this.categorias.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.categorias);
    });
  }

  agregarsubcategoria() {
    const categoriaRef = this.firestore.getcref(this.subcategoriaform.value.categoria);
    const subcategoria: any = {
      nombre: this.subcategoriaform.value.nombre,
      categoria: categoriaRef
    };
    this.subcate.agregarsubc(subcategoria).then(() => {
      this.loading = false;
      console.log(subcategoria);
      this.router.navigate(['/admin/subcategorias']);
    });
  }
}
