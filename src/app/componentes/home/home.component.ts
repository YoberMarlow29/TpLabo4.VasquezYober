import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private route:Router, private auth: AuthService) {


  }

  ngOnInit(): void {
  }


  btnSalir() {
    
    this.auth.logout().then(() => {
      // Redirige a la página de inicio de sesión después de cerrar sesión
      this.route.navigate(['/login']);
    }).catch(error => {
      console.log('Error al cerrar sesión:', error);
    });
  }

  openLogin() {
    this.route.navigate(['/login']);
  }

  openRegister() {
    this.route.navigate(['/registro']);
  }


}
