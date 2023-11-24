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

  constructor(
    private car: CarroService,
    private auth: AuthService,
    private firestore: FacturaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.obtenerCarritol();
    this.facturaform = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      rut: ['', Validators.required],
    });
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
          this.facturaform.patchValue({ total: this.calcularTotal() });
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
    const factura: any = {
      uid: uid,
      nombre: this.facturaform.value.nombre,
      apellido: this.facturaform.value.apellido,
      correo: this.facturaform.value.correo,
      telefono: this.facturaform.value.telefono,
      rut: this.facturaform.value.rut,
      total: this.facturaform.value.total
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
}
