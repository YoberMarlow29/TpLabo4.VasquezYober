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

  disparar() {
    if (!this.juegoTerminado) {
      const sobrevive = Math.random() < 0.5;
      if (sobrevive) {
        this.resultadoDisparo = 'Vivo';
      } else {
        this.vidasRestantes--;
        this.resultadoDisparo = 'PerdioVida';
        if (this.vidasRestantes === 0) {
          this.juegoTerminado = true;
        }
      }
    }
  }

  reiniciarJuego() {
    this.vidasRestantes = 3;
    this.juegoTerminado = false;
    this.resultadoDisparo = '';
  }
}
