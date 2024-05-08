import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../clases/Usuario';
import { Observable, map } from 'rxjs';
import { Timestamp } from 'firebase/firestore';


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

  async guardarInfoLogin(email: string) {
    const loginInfo : Usuario = {
      email: email,
      fechaHorario: Timestamp.now(),
    };

    await this.firestore.collection('usuarios').add(loginInfo);
  }

  logout() {
    return this.authFirebase.signOut();
  }

  getUserLogged(){

    return this.authAngular.authState;
  }

   async guardarMensajeInfo(usuario: Usuario){

    const mensajeInfo = usuario;

    await this.firestore.collection('mensajes').add(mensajeInfo);

  } 

  obtenerDatosUsuario(){

    return this.authAngular.currentUser;
  }

  obtenerMensajes(): Observable<any[]> {
    return this.firestore.collection('mensajes', ref => ref.orderBy('fechaHorario')).valueChanges()
      .pipe(
        map((mensajes: any[]) => {
          return mensajes.map(mensaje => {
            const fechaHorario = (mensaje.fechaHorario as Timestamp).toDate();
            return { ...mensaje, fechaHorario };
          });
        })
      );
  }

}
