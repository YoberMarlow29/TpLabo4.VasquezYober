import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private authFirebase : Auth,private firestore: AngularFirestore ) {  }

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

  getUserInfo() {
    return new Promise<any>((resolve, reject) => {
      this.authFirebase.onAuthStateChanged(user => {
        if (user) {
          // Si el usuario está autenticado, obtenemos su correo electrónico y la fecha de inicio de sesión
          const email = user.email;
          // Buscamos la información del usuario en Firestore
          this.firestore.collection('usuarios', ref => ref.where('email', '==', email)).valueChanges().subscribe(data => {
            if (data && data.length > 0) {
              const userInfo = data[0];
              resolve(userInfo);
            } else {
              console.log('No se encontró información del usuario en Firestore.');
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });
    });
  }


}
