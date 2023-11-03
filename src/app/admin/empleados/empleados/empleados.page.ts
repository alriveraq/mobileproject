import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../interface-admin/empleados';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../empleado.service';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  filtrohorario: string = '';
  empleadosfiltrados: Empleados[] = [];
  empleados!: Empleados[];
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

  constructor(
    private navCtrl: NavController,
    private firestore: EmpleadoService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getempleados();
  }

  getempleados() { 
    this.firestore.getempleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  editarEmpleados(empleadoId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarCategoria **************** ID:" + empleadoId);
    this.navCtrl.navigateForward(`/empleados-editar/${empleadoId}`);
  }

  async getempleado() {
    console.log("getProduct ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.firestore.getempleado(this.route.snapshot.paramMap.get('id')!)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          this.empleado = res;
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
  eliminarempleado(id: string) {
    this.firestore.eliminarempleado(id).then(() => {
      console.log('empelado eliminado con exito');
    }, (error) => {
      console.error(error);
    });
  }

}
