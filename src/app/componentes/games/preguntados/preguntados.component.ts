import { Component } from '@angular/core';
import { PreguntadosService } from '../../../services/preguntados.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export default class PreguntadosComponent {

  preguntas: any[] = [];
  indiceActual: number = 0;
  respuestasCorrectas: number = 0;
  respuestasIncorrectas: number = 0;
  quizCompletado: boolean = false;


  constructor(private trivia: PreguntadosService) { }

  ngOnInit(): void {

    this.obtenerPreguntasTrivia();
  }

  obtenerPreguntasTrivia() {

    this.trivia.getRandomizedQuestions().subscribe(response => {

      if (response.results) {

        this.preguntas = response.results;

      }
    });
  }

  comprobarRespuesta(respuesta: string) {

    if (respuesta === this.preguntas[this.indiceActual].correct_answer) {

      this.respuestasCorrectas++;

    } else {

      this.respuestasIncorrectas++;

    }
  }

  siguientePregunta() {

    this.indiceActual++;
    if (this.indiceActual === this.preguntas.length) {

      this.quizCompletado = true;

    }
  }

  reiniciarJuego() {

    this.indiceActual = 0;
    this.respuestasCorrectas = 0;
    this.respuestasIncorrectas = 0;
    this.quizCompletado = false;
    this.obtenerPreguntasTrivia();

  }
}
