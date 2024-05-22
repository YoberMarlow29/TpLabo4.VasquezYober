import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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

  iniciarJuego() {
    this.juegoIniciado = true;
    this.reiniciarJuego();
  }

  disparar() {
    if (this.juegoIniciado && !this.juegoTerminado && !this.disparoEnProgreso) {
      this.disparoEnProgreso = true;
      this.playSound('giro');

      setTimeout(() => {
        const sobrevive = Math.random() < 0.5;
        if (sobrevive) {
          this.resultadoDisparo = 'Vivo';
          this.playSound('nodisparo');
          setTimeout(() => {
            this.disparoEnProgreso = false;
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
  }

  playSound(soundId: string) {
    const sound = document.getElementById(`sound-${soundId}`) as HTMLAudioElement;
    if (sound) {
      sound.play();
    }
  }
}
