import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './componentes/registro/registro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,QuienSoyComponent,LoginComponent,
    HomeComponent,FormsModule,RegistroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TpLabo4VasquezYober';
}
