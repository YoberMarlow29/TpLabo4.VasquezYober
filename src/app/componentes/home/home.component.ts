import { Component,  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import ChatComponent from '../chat/chat.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  userLogged= this.auth.getUserLogged();

  constructor(private auth:AuthService){}



}
