import { Component, OnInit } from '@angular/core';
import { Subcategoria } from '../../interface-admin/subcategoria';
import { Categoria } from '../../interface-admin/categoria';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { CategoriaServiceService } from '../../categorias/categoria-service.service';
import { SubcServiceService } from '../subc-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.page.html',
  styleUrls: ['./subcategoria.page.scss'],
})
export class SubcategoriaPage implements OnInit {
  subcategorias!: Subcategoria[];
  subcategoria: Subcategoria = {
    id: '',
    nombre: '',
    categoria: {
      id: '',
      nombre: ''
    }
  }

  constructor(
    private navCtrl: NavController,
    private firestore: SubcServiceService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getsubcategorias();
  }

  getsubcategorias() { 
    this.firestore.getsubcs().subscribe(data => {
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

  editarSubcategorias(subcategoriaId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    this.router.navigate(['/admin/subcategoria-editar', subcategoriaId]);
  }

  async getsubcategoria() {
    console.log("getProduct ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.firestore.getsubc(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.subcategoria = res;
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          //Si no funcion desplegamos en consola el error
          console.log("Error DetailProduct Página", err);
          loading.dismiss(); //Elimina la espera
        }
      })
  }

  eliminarsubcategoria(id: string) {
    this.firestore.eliminarsubc(id).then(() => {
      console.log('empelado eliminado con exito');
    }, (error) => {
      console.error(error);
    });
  }

}
