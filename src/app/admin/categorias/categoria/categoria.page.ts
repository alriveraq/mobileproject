import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../interface-admin/categoria';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CategoriaServiceService } from '../categoria-service.service';




@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categorias: Categoria[] = [];
  categoria: Categoria = {
    id: '',
    nombre: ''
  }; // Propiedad para almacenar los datos
  constructor(
    private navCtrl: NavController,
    private firestore:CategoriaServiceService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getcategorias();

  }

  getcategorias() {
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
  eliminarCategoria(id: string) {
    this.firestore.eliminarCategoria(id).then(() => {
      console.log('empelado eliminado con exito');
    }
    ).catch(error => {
      console.log(error);
    });
  }

  editarCategoria(categoriaId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarCategoria **************** ID:" + categoriaId);
    this.navCtrl.navigateForward(`/admin/categoria-editar/${categoriaId}`);
  }

  async getcategoria() {
    console.log("getProduct ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.firestore.getcategoria(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.categoria = res;
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
}
