import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from './interface-usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private authfirebase: AngularFireAuth) { }

  login(email: string, password: string){
    return this.authfirebase.signInWithEmailAndPassword(email, password);
  }

  register(user: Usuario){
    if (user.email && user.password) {
      return this.authfirebase.createUserWithEmailAndPassword(user.email, user.password);
    } else {
      return Promise.reject('Email or password is null');
    }
  }
  logut(){
    return this.authfirebase.signOut();
  }
}
