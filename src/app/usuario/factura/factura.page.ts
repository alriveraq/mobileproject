import { Component, OnInit } from '@angular/core';
import { CarroService } from '../carro/carro.service';
import { AuthService } from 'src/app/servicio/auth.service';
import { FacturaService } from './factura.service';
import { Carro } from 'src/app/admin/interface-admin/carro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Factura } from 'src/app/admin/interface-admin/factura';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  carritoItems: Carro[] = [];
  facturaform!: FormGroup;
  submitted = false;

  public payPalconfig?: IPayPalConfig;

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
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.stateuser().subscribe(res => {
      if (res) {
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
    this.initConfig();
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

  calcularTotal(): number {
    // La lógica para calcular el total en el carrito no autenticado
    if (this.login == false) {
      return this.obtenerCarrito().reduce((total, item) => total + item.precio, 0);
    }
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

  //eliminamos todo el carro sin login pero con un delay
  eliminarCarrito(): void {
    setTimeout(() => {
      this.car.eliminarCarrito();
    }, 3000);
  }

  private initConfig(): void {
    this.payPalconfig = {
      currency: 'USD',
      clientId: environment.clientid,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          //ponemos los items del carro en el paypal y el total
          amount: {
            currency_code: 'USD',
            value: this.calcularTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.calcularTotal().toString()
              }
            }
          },
          // los items del carro con login y sin login
          items: this.login == false ? this.obtenerCarrito().map((item) => {
            return {
              name: item.nombre,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: item.precio.toString(),
              },
            };
          }) : this.carritoItems.map((item) => {
            return {
              name: item.producto.nombre,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: item.producto.precio.toString(),
              },
            };
          })
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        //obtenemos los datos del formulario
        const nombre = this.facturaform.value.nombre;
        const apellido = this.facturaform.value.apellido;
        const correo = this.facturaform.value.correo;
        const telefono = this.facturaform.value.telefono;
        const rut = this.facturaform.value.rut;
        this.generarFactura(nombre, apellido, correo, telefono, rut)
          .then(() => {
            // También puedes realizar otras acciones necesarias aquí
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          })
          .catch((error) => {
            console.error('Error al generar la factura:', error);
          });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
  
  generarFactura(nombre: string, apellido: string, correo: string, telefono: string, rut: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Crear la factura con la información del formulario
      const factura: any = {
        // ... (otros datos necesarios para la factura)
        nombre,
        apellido,
        correo,
        telefono,
        rut,
        total: this.calcularTotal(),  // Puedes ajustar esto según tus necesidades
      };

      // Agregar la factura a la base de datos o realizar otras acciones necesarias
      this.firestore.agregarfactura(factura)
        .then(() => {
          // Eliminar el carrito, si es necesario con login o sin login
          this.login == false ? this.eliminarCarrito():
          this.eliminarCarritol()
            .then(() => {
              console.log('Factura generada después de la autorización del cliente:', factura);
              this.router.navigate(['usuario/perfil']);
              resolve();
            })
            .catch((deleteError) => {
              console.error('Error al eliminar el carrito:', deleteError);
              reject(deleteError);
            });
        })
        .catch((addError) => {
          console.error('Error al agregar la factura:', addError);
          reject(addError);
        });
    });
  }
}
