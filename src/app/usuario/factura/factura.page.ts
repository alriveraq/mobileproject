import { Component, OnInit } from '@angular/core';
import { CarroService } from '../carro/carro.service';
import { AuthService } from 'src/app/servicio/auth.service';
import { FacturaService } from './factura.service';
import { Carro } from 'src/app/admin/interface-admin/carro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Factura } from 'src/app/admin/interface-admin/factura';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  carritoItems: Carro[] = [];
  facturaform!: FormGroup;
  submitted = false;

  factura: Factura = {
    id: '',
    uid: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    rut: '',
    total: 0
  };

  login = false;

  constructor(
    private car: CarroService,
    private auth: AuthService,
    private firestore: FacturaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.auth.stateuser().subscribe(res => {
        if (res){
          console.log('loged');
          this.login = true;
        } else {
          console.log('not loged');
          this.login = false;
        }
        console.log(res);
      });
    this.obtenerCarritol();
    this.obtenerCarrito();
    this.facturaform = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      rut: ['', Validators.required],
    });
  }
  obtenerCarrito(): any[] { 
    return this.car.getCarrito();
  }

  async obtenerCarritol() {
    try {
      const uid = await this.auth.getuid(); // Obtener el UID del usuario autenticado

      if (uid) {
        this.car.getCarritol(uid).subscribe((carritoItems) => {
          // Asignar el ID del documento a la propiedad 'id' de cada elemento
          this.carritoItems = carritoItems.map((item: any) => {
            return { id: item.itemid, ...item }; // Suponiendo que el campo en Firestore es 'itemid'
          });

          console.log('Carrito obtenido con éxito:', this.carritoItems);
          // Actualizar el valor del campo "total" en el formulario
        });
      } else {
        console.error('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  }

  async agregarfactura() {
    const uid = await this.auth.getuid();
    const totalActual = this.calcularTotal();
    const factura: any = {
      uid: uid,
      nombre: this.facturaform.value.nombre,
      apellido: this.facturaform.value.apellido,
      correo: this.facturaform.value.correo,
      telefono: this.facturaform.value.telefono,
      rut: this.facturaform.value.rut,
      total: totalActual
    };

    this.firestore.agregarfactura(factura).then(
      () => {
        console.log('Factura agregada');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  calcularTotal(): number {
    return this.carritoItems.reduce(
      (total, item) => total + item.producto.precio,
      0
    );
  }

  formatNumber(value: number): string {
    // Lógica personalizada para agregar puntos como separadores de miles
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  //eliminamos todo el carro con login
  async eliminarCarritol() {
    try {
      const uid = await this.auth.getuid();

      if (uid) {
        await this.car.eliminarCarritol(uid);
        console.log('Carrito eliminado con éxito.');
      } else {
        console.error('Usuario no autenticado');
      }
    } catch (error) {
      console.error('Error al eliminar el carrito:', error);
    }
  }
}
