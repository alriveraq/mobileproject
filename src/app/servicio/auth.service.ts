import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../usuario/interface-usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  register(user: Usuario){
    if( user.email && user.password){
      return this.auth.createUserWithEmailAndPassword(user.email, user.password)
    } else{
      return Promise.reject('Datos erroneos')
    }
  }

  logout(){
    return this.auth.signOut();
  }

  stateuser(){
    return this.auth.authState;
  }

  async getuid(){
    const user = await this.auth.currentUser;
    if (user){
      return user.uid
    } else {
      return null;
    }
  }
}
