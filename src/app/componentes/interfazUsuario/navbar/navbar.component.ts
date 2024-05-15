import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit{

  userLogged:any;

  ngOnInit(): void {

    this.auth.getUserLogged().subscribe(usuario=>{

      this.userLogged = usuario;
    });

  }
  constructor(private auth:AuthService){}

  logout() {
    this.auth.logout();
  }

}
