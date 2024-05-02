import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any; // Variable para almacenar la información del usuario

  constructor(private route:Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.auth.getUserInfo().then(userInfo => {
      this.user = userInfo;
    }).catch(error => {
      console.log('Error al obtener la información del usuario:', error);
    });
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
    this.route.navigate(['/register']);
  }


}
