import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private authfirebase: AngularFireAuth) { }

  login(email: string, password: string){
    return this.authfirebase.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string){
    return this.authfirebase.createUserWithEmailAndPassword(email, password);
  }
}
