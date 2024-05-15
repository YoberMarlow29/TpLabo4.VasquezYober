import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carta } from '../../../clases/Carta';


@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export default class MayorMenorComponent implements OnInit{

  cartaActual: Carta = { imagen: '', valor: 0 };
  siguienteCarta: Carta = { imagen: '', valor: 0 };
  mensajeResultado: string = '';
  puntuacion: number = 0;
  finJuego: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerNuevaCarta();
  }

  obtenerNuevaCarta() {

    this.http.get<any>('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .subscribe(data => {
        this.cartaActual.imagen = data.cards[0].image;
        this.cartaActual.valor = this.valorCarta(data.cards[0].value);
      });

  }

  adivinar(adivinanza: string) {

    this.http.get<any>('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .subscribe(data => {
        this.siguienteCarta.imagen = data.cards[0].image;
        this.siguienteCarta.valor = this.valorCarta(data.cards[0].value);

        if ( (adivinanza === 'mayor' && this.siguienteCarta.valor > this.cartaActual.valor) ||
            (adivinanza === 'menor' && this.siguienteCarta.valor < this.cartaActual.valor)) {
          this.mensajeResultado = '¡Correcto!';
          this.puntuacion++;
        }
        else {
          this.mensajeResultado = '¡Incorrecto!';
          this.finJuego = true;
        }

        this.cartaActual.imagen = this.siguienteCarta.imagen;
        this.cartaActual.valor = this.siguienteCarta.valor;
      });
  }

  valorCarta(valor: string): number {

    switch (valor) {

      case 'ACE': return 14;
      case 'KING': return 13;
      case 'QUEEN': return 12;
      case 'JACK': return 11;
      default: return parseInt(valor);

    }
  }

  reiniciarJuego() {

    this.puntuacion = 0;
    this.finJuego = false;
    this.mensajeResultado = '';
    this.obtenerNuevaCarta();

  }

}
