import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private authFirebase : Auth,private firestore: AngularFirestore, private authAngular:AngularFireAuth ) {  }

  login(email : string, password: string){

    return signInWithEmailAndPassword(this.authFirebase,email,password);
  }
  register(email:string,password:string){

    return createUserWithEmailAndPassword(this.authFirebase,email,password);
  }

  async saveLoginInfo(email: string) {
    const loginInfo = {
      email: email,
      timestamp: new Date()
    };

    await this.firestore.collection('usuarios').add(loginInfo);
  }

  logout() {
    return this.authFirebase.signOut();
  }

  getUserAdd(){

    this.authAngular.authState;
  }



  


}
