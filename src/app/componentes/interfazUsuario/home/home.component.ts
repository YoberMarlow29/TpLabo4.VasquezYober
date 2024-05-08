import { Component, OnInit,  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {

  usuarioLogeado : any;

  constructor(private auth:AuthService){}

  ngOnInit(): void {


    this.auth.getUserLogged().subscribe(usuario=>{

      this.usuarioLogeado = usuario;
    });

 
  }



}
