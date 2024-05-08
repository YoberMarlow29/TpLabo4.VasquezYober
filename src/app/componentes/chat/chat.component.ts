import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../clases/Usuario';
import { Timestamp } from 'firebase/firestore';
import { ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export default class ChatComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('mensajeContainer', { static: false }) mensajeContainer: ElementRef;


  
  usuarioLogeado : any;
  nuevoMensaje: Usuario;
  mensajes: any[] = [];


  constructor(private auth:AuthService){}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {

    this.nuevoMensaje = {};

    this.auth.getUserLogged().subscribe(usuario=>{

      this.usuarioLogeado = usuario;
    });

    this.auth.obtenerMensajes().subscribe(mensajes => {
      this.mensajes = mensajes;
    });  
  }

  private scrollToBottom(): void {
    try {
      this.mensajeContainer.nativeElement.scrollTop = this.mensajeContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  enviarMensaje(){

    if (this.nuevoMensaje && this.nuevoMensaje.mensaje) {

      this.auth.obtenerDatosUsuario().then(user =>{

        if(user){
  
          const mensajeInfo: Usuario = {
            uid: user.uid,
            email: user.email,
            mensaje: this.nuevoMensaje.mensaje,
            fechaHorario: Timestamp.now(),
          };
          this.nuevoMensaje = mensajeInfo;
          this.auth.guardarMensajeInfo(this.nuevoMensaje);

          this.nuevoMensaje.mensaje="";

          console.log("mensaje exitoso");

        }else{
  
          console.log("usuario no encontrado");
        }
      }).catch(error=>{
  
        console.log("ERROR",error);
      });

    }else {
    console.log("El mensaje es inválido.");
  }   
  }

}
