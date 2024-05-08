import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userLogged= this.auth.getUserLogged();

  constructor(private auth:AuthService){}

  logout() {
    this.auth.logout(); // Utiliza el método signOut() para desloguear al usuario
  }

}
