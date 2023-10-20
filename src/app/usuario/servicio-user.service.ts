import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from './interface-user/user';
const baseUrl = "http://localhost:3000";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ServicioUserService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("handleError Harrys", error); // log to console instead
      return of(result as T);
    };
  }

  agregarusuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(baseUrl + "/usuarios", usuario, httpOptions)
    .pipe(
      tap((newUsario: Usuario) => console.log('Nuevo usuario creado w/ id=${newUsario.id}')),
      catchError(this.handleError<Usuario>('agregarusuario'))
    );
  }
}
