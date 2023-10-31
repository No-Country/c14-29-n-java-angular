import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  // metodo que devuelve la promesa para Registrar nuevo usuario con los parametros de email y password
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // metodo que devuelve la promesa para que el usuario se loguee con los parametros de email y password
  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

 // metodo que devuelve la promesa de cerrar sesion
  logout() {
    return signOut(this.auth);
  }
}
