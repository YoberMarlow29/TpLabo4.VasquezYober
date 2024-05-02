import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  regForm : FormGroup;

  constructor(public auth: AuthService,public route:Router,public formBuilder:FormBuilder){

    this.regForm = this.formBuilder.group({

      email : ['',[Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      
      password :['',[Validators.required ]]
    })  
  
  }
  get errorControl(){

    return this.regForm?.controls;
  }

  async btnRegister(){

    try {
      const userCredential = await this.auth.register(this.regForm.value.email, this.regForm.value.password);
      if (userCredential) {

        await this.auth.saveLoginInfo(this.regForm.value.email);      
        
        this.route.navigate(['/home']);
      } else {
        console.log('Error al autenticar');
      }
    } catch (error) {
      console.log(error);
    }

  }

}
