import { Component, OnInit } from '@angular/core';
import { Local } from '../../interface-admin/local';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.page.html',
  styleUrls: ['./locales.page.scss'],
})
export class LocalesPage implements OnInit {
  locales: Local[] = [];
  local: Local = {
    id: '',
    nombre: '',
    direccion: '',
    comuna: '',
    region: '',
    telefono: '',
    img: ''
  };

  constructor(private navCtrl: NavController,
    private firestore: LocalService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController) { 
    
  }

  ngOnInit() {
    this.getlocales();
  }

  getlocales() {
    this.firestore.getlocales().subscribe(data => {
      this.locales = [];
      data.forEach((element: any) => {
        this.locales.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.locales);
    });


  }


  editarlocal(localid: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarCategoria **************** ID:" + localid);
    this.navCtrl.navigateForward(`/admin/locales-editar/${localid}`);
  }

  async getlocal() {
    console.log("getProduct ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.firestore.getlocal(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.local = res;
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

  eliminarlocal(id: string) {
    this.firestore.eliminarlocal(id).then(() => {
      console.log('empelado eliminado con exito');
    }
    ).catch(error => {
      console.log(error);
    });
  }



}
