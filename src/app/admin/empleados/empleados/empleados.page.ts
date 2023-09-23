import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../interface-admin/empleados';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioAdminService } from '../../servicio-admin.service';
import { Observable } from 'rxjs';


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
    private restApi: ServicioAdminService,
    private loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getempleados();
  }

  async getempleados() {
    console.log("Entrando :getempleados");
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Harrys Loading...'
    });
    // Muestra el Wait
    await loading.present();
    console.log("Entrando :");
    // Obtiene el Observable del servicio
    await this.restApi.getempleados()
      .subscribe({
        next: (res) => { 
          console.log("Res:" + res);
  // Si funciona asigno el resultado al arreglo productos
          this.empleados = res;
          console.log("thisProductos:",this.empleados);
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
  // Si da error, imprimo en consola.
          console.log("Err:" + err);
          loading.dismiss();
        }
      })
  }

  editarEmpleados(empleadoId: string) {
    // Redirige a la página "categoria-editar" con el ID de la categoría como parámetro
    console.log("editarCategoria **************** ID:" + empleadoId);
    this.navCtrl.navigateForward(`/empleados-editar/${empleadoId}`);
  }

  async getempleado() {
    console.log("getProduct **************** ParamMap ID:" + this.route.snapshot.paramMap.get('id'));
    // Creamos un Wait
    const loading = await this.loadingController.create({ message: 'Loading...' });
    // Mostramos el Wait
    await loading.present();
    await this.restApi.getempleado(this.route.snapshot.paramMap.get('id')!)
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

  async confirmarEliminacion(id: string) {
    const loading = await this.loadingController.create({ message: 'Loading...' });
    await loading.present();
    await this.restApi.eliminarempleado(id)
      .subscribe({
        next: (res) => {
          console.log("Data *****************");
          console.log(res);
          loading.dismiss();
          this.getempleados();
        },
        complete: () => { },
        error: (err) => {
          console.log("Error DetailProduct Página", err);
          loading.dismiss();
        }
      });
    }

    async eliminarEmpleado(id: string) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¿Está seguro de eliminar al empleado?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Confirm Cancel');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Confirm Ok');
              this.confirmarEliminacion(id);
            }
          }
        ]
      });
      await alert.present();
    }

    async eliminar(id: string) {
      this.eliminarEmpleado(id);
    }

    filtrarempleados(){
      if (!this.filtrohorario || this.filtrohorario === '') {
        // Si no se selecciona ningún tipo o se selecciona "Todos", mostrar todos los productos.
        this.empleadosfiltrados = this.empleados;
      } else {
        // Filtrar productos basados en el tipo de producto seleccionado.
        this.empleadosfiltrados = this.empleados.filter(
          (empleado) => empleado.turno === this.filtrohorario
        );
      }
    }

}
