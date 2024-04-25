import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,QuienSoyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TpLabo4.VasquezYober';
}
