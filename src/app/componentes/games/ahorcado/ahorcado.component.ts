import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import palabrasJson from '../../../../assets/archivos/palabras.json';


@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export default class AhorcadoComponent {


  palabras: { palabra: string, pista: string }[] = palabrasJson;
  palabra: string;
  pista: string;
  palabraOculta: string;
  letrasDisponibles: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  intentos: number = 0;
  maxIntentos: number = 7;
  gano: boolean = false;
  perdio: boolean = false;

  constructor() { }

  ngOnInit() {
    this.seleccionarPalabra();
  }

  seleccionarPalabra() {

    const seleccion = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabra = seleccion.palabra;
    this.pista = seleccion.pista;
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
