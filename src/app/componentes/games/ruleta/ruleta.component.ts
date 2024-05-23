import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})
export default class RuletaComponent {

  vidasRestantes: number = 3;
  juegoTerminado: boolean = false;
  resultadoDisparo: string = '';
  juegoIniciado: boolean = false;
  disparoEnProgreso: boolean = false;
  seGano: number = 0;

  constructor(private router: Router) {
  }

  iniciarJuego() {
    this.juegoIniciado = true;
    this.reiniciarJuego();
  }
//1 2 3 4 5 6 7 8
  disparar() {
    if (this.juegoIniciado && !this.juegoTerminado && !this.disparoEnProgreso) {
      this.disparoEnProgreso = true;
      this.playSound('giro');

      setTimeout(() => {
        const sobrevive = Math.random() < 0.7;
        if (sobrevive) {
          this.seGano++;
          this.resultadoDisparo = 'Vivo';
          this.playSound('nodisparo');

          setTimeout(() => {
            this.disparoEnProgreso = false;
            if (this.seGano === 6) {
              this.juegoTerminado = true;
            }
          }, 2000);
        } else {
          this.vidasRestantes--;
          this.resultadoDisparo = 'PerdioVida';
          this.playSound('disparo');
          setTimeout(() => {
            this.disparoEnProgreso = false;
            if (this.vidasRestantes === 0) {
               this.juegoTerminado = true;
            }
          }, 2000);
        }
      }, 3000);
    }
  }

  reiniciarJuego() {
    this.vidasRestantes = 3;
    this.juegoTerminado = false;
    this.resultadoDisparo = '';
    this.disparoEnProgreso = false;
    this.seGano = 0;

  }

  playSound(soundId: string) {
    const sound = document.getElementById(`sound-${soundId}`) as HTMLAudioElement;
    if (sound) {
      sound.play();
    }
  }
}
