import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../interface-admin/categoria';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto } from '../interface-admin/producto';
import { Empleados } from '../interface-admin/empleados';
import { Local } from '../interface-admin/local';
import {Proveedores} from '../interface-admin/provedores';


const baseUrl = "http://localhost:3000";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ServicioAdminService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }
  //CATEGORIAS
  getcategorias(): Observable<Categoria[]> {
    console.log("getProducts ()");
    return this.http.get<Categoria[]>(baseUrl+"/categorias")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  getcategoria(id: String): Observable<Categoria> {
    console.log("getProduct ID:" + id);
    const apiUrl = `${baseUrl}/categorias`;
    return this.http.get<Categoria>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched product id=${id}')),
        catchError(this.handleError<Categoria>('getcategoria id=${id}'))
      );
  }
  actualizarcategoria(id: String, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(baseUrl + "/categorias/" + id, categoria, httpOptions)
    .pipe(
      tap(_ => console.log('actualizado categoria id=${id}')),
      catchError(this.handleError<any>('actualizarcategoria'))
    );
  }

  eliminarcategoria(id: String): Observable<Categoria> {
    return this.http.delete<Categoria>(baseUrl + "/categorias/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('eliminado categoria id=${id}')),
      catchError(this.handleError<any>('eliminarcategoria'))
    );
  }

  agregarcategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(baseUrl + "/categorias", categoria, httpOptions)
    .pipe(
      tap((newCategoria: Categoria) => console.log('agregado categoria w/ id=${newCategoria.id}')),
      catchError(this.handleError<Categoria>('agregarcategoria'))
    );
  }
  //PRODUCTOS
  
  getproductos(): Observable<Producto[]> {
    console.log("getProducts ()");
    return this.http.get<Producto[]>(baseUrl+"/productos")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getproducto(id: String): Observable<Producto> {
    console.log("getProduct ID:" + id);
    const apiUrl = `${baseUrl}/productos`;
    return this.http.get<Producto>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched producto id=${id}')),
        catchError(this.handleError<Producto>('getproducto id=${id}'))
      );
  }

  actualizarproducto(id: String, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(baseUrl + "/productos/" + id, producto, httpOptions)
    .pipe(
      tap(_ => console.log('actualizado producto id=${id}')),
      catchError(this.handleError<any>('actualizarproducto'))
    );
  }

  eliminarproducto(id: String): Observable<Producto> {
    return this.http.delete<Producto>(baseUrl + "/productos/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('eliminado producto id=${id}')),
      catchError(this.handleError<any>('eliminarproducto'))
    );
  }

  agregarproducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(baseUrl + "/productos", producto, httpOptions)
    .pipe(
      tap((newproducto: Producto) => console.log('agregado producto w/ id=${newproducto.id}')),
      catchError(this.handleError<Producto>('agregarproducto'))
    );
  }

  //EMPLEADOS

  getempleados(): Observable<Empleados[]> {
    console.log("getProducts ()");
    return this.http.get<Empleados[]>(baseUrl+"/empleados")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getempleados', []))
      );
  }

  getempleado(id: String): Observable<Empleados> {
    console.log("getempleados ID:" + id);
    const apiUrl = `${baseUrl}/empleados`;
    return this.http.get<Empleados>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched Empleado id=${id}')),
        catchError(this.handleError<Empleados>('getEmpleado id=${id}'))
      );
  }

  actualizarempleado(id: String, empleado: Empleados): Observable<Empleados> {
    return this.http.put<Producto>(baseUrl + "/productos/" + id, empleado, httpOptions)
    .pipe(
      tap(_ => console.log('actualizado empleado id=${id}')),
      catchError(this.handleError<any>('actualizarempleado'))
    );
  }

  eliminarempleado(id: String): Observable<Empleados> {
    return this.http.delete<Empleados>(baseUrl + "/empleados/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('eliminado empleado id=${id}')),
      catchError(this.handleError<any>('eliminarempleado'))
    );
  }

  agregarempleado(empleado: Empleados): Observable<Empleados> {
    return this.http.post<Empleados>(baseUrl + "/empleados", empleado, httpOptions)
    .pipe(
      tap((newempleado: Empleados) => console.log('agregado empleado w/ id=${newempleado.id}')),
      catchError(this.handleError<Empleados>('agregarempleado'))
    );
  }
  //LOCALES
  getlocales(): Observable<Local[]> {
    console.log("getlocales ()");
    return this.http.get<Local[]>(baseUrl+"/locales")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getlocales', []))
      );
  }

  getlocal(id: String): Observable<Local> {
    console.log("getlocales ID:" + id);
    const apiUrl = `${baseUrl}/locales`;
    return this.http.get<Local>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched local id=${id}')),
        catchError(this.handleError<Local>('getlocal id=${id}'))
      );
  }

  actualizarlocal(id: String, local: Local): Observable<Local> {
    return this.http.put<Local>(baseUrl + "/locales/" + id, local, httpOptions)
    .pipe(
      tap(_ => console.log('actualizado local id=${id}')),
      catchError(this.handleError<any>('actualizarlocal'))
    );
  }

  eliminarlocal(id: String): Observable<Local> {
    return this.http.delete<Local>(baseUrl + "/locales/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('eliminado Local id=${id}')),
      catchError(this.handleError<any>('eliminarlocal'))
    );
  }

  agregarlocal(local: Local): Observable<Local> {
    return this.http.post<Local>(baseUrl + "/locales", local, httpOptions)
    .pipe(
      tap((newempleado: Local) => console.log('agregado Local w/ id=${newempleado.id}')),
      catchError(this.handleError<Local>('agregarlocal'))
    );
  }


  //BODEGA
  getbodegas(): Observable<Local[]> {
    console.log("getbodegas ()");
    return this.http.get<Local[]>(baseUrl+"/bodegas")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getlocales', []))
      );
  }

  getbodega(id: String): Observable<Local> {
    console.log("getlocales ID:" + id);
    const apiUrl = `${baseUrl}/bodegas`;
    return this.http.get<Local>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched bodega id=${id}')),
        catchError(this.handleError<Local>('getlocal id=${id}'))
      );
  }

  actualizarbodega(id: String, local: Local): Observable<Local> {
    return this.http.put<Local>(baseUrl + "/bodegas/" + id, local, httpOptions)
    .pipe(
      tap(_ => console.log('actualizado bodega id=${id}')),
      catchError(this.handleError<any>('actualizarbodega'))
    );
  }

  eliminarbodega(id: String): Observable<Local> {
    return this.http.delete<Local>(baseUrl + "/bodegas/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('eliminado bodega id=${id}')),
      catchError(this.handleError<any>('eliminarbodega'))
    );
  }

  agregarbodega(local: Local): Observable<Local> {
    return this.http.post<Local>(baseUrl + "/bodegas", local, httpOptions)
    .pipe(
      tap((newempleado: Local) => console.log('agregado bodega w/ id=${newempleado.id}')),
      catchError(this.handleError<Local>('agregarbodega'))
    );
  }

  // PROVEEDORES
  getproveedores(): Observable<Proveedores[]> {
    console.log("getproveedores ()");
    return this.http.get<Proveedores[]>(baseUrl+"/proveedores")
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getproveedores', []))
      );
  }

  getproveedor(id: String): Observable<Proveedores> {
    console.log("getproveedores ID:" + id);
    const apiUrl = `${baseUrl}/proveedores`;
    return this.http.get<Proveedores>(apiUrl + "/" + id)
      .pipe(
        tap(_ => console.log('fetched local id=${id}')),
        catchError(this.handleError<Proveedores>('getproveedores id=${id}'))
      );
  }

  actualizarproveedor(id: String, proveedor: Proveedores): Observable<Proveedores> {
    return this.http.put<Proveedores>(baseUrl + "/proveedores/" + id, proveedor, httpOptions)
    .pipe(
      tap(_ => console.log('actualizado proveedor id=${id}')),
      catchError(this.handleError<any>('actualizarproveedor'))
    );
  }

  eliminarproveedor(id: String): Observable<Proveedores> {
    return this.http.delete<Proveedores>(baseUrl + "/proveedores/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('eliminado Local id=${id}')),
      catchError(this.handleError<any>('eliminarlocal'))
    );
  }

  agregarproveedor(proveedor: Proveedores): Observable<Proveedores> {
    return this.http.post<Proveedores>(baseUrl + "/proveedores", proveedor, httpOptions)
    .pipe(
      tap((newprovedor: Proveedores) => console.log('agregado Local w/ id=${newempleado.id}')),
      catchError(this.handleError<Proveedores>('agregarlocal'))
    );
  }

}

