import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFirebase : Auth) {  }

  login(email : string, password: string){

    return signInWithEmailAndPassword(this.authFirebase,email,password);
  }

  register(email:string,password:string){

    return createUserWithEmailAndPassword(this.authFirebase,email,password);
  }
  
}
