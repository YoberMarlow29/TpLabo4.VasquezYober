import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export default class AhorcadoComponent {
  palabras: string[] = ['ELEFANTE', 'ARAÑA', 'FUTBOL', 'TENNIS', 'DIFICIL', 'GOKU', 'LUFFY', 'SIMIO'];
  palabra: string;
  palabraOculta: string; 
  letrasDisponibles: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''); 
  intentos: number = 0;
  maxIntentos: number = 6;
  gano: boolean = false;
  perdio: boolean = false;

  constructor() {
    this.seleccionarPalabra();
  }

  seleccionarPalabra() {
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_'.repeat(this.palabra.length);
  }

  comprobar(letra: string) {
    if (!this.gano && !this.perdio && this.letrasDisponibles.includes(letra)) {

      if (this.palabra.includes(letra)) {

        let palabraConLetra = '';

        for (let i = 0; i < this.palabra.length; i++) {

          if (this.palabra[i] === letra) {

            palabraConLetra += letra;
          } 
          else {

            palabraConLetra += this.palabraOculta[i];
          }
        }
        this.palabraOculta = palabraConLetra;

        if (this.palabraOculta === this.palabra) {

          this.gano = true;
        }
      } else {

        this.intentos++;
        if (this.intentos >= this.maxIntentos) {

          this.perdio = true;
        }
        this.letrasDisponibles = this.letrasDisponibles.filter(l => l !== letra);
      }
    }
  }

  reiniciarJuego() {
    this.intentos = 0;
    this.gano = false;
    this.perdio = false;
    this.seleccionarPalabra();
    this.letrasDisponibles = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split(''); 
  }
}
