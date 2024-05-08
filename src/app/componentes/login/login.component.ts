import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,NavbarComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  loginForm : FormGroup;

  constructor(public auth: AuthService,public route:Router,public formBuilder: FormBuilder){

    this.loginForm = this.formBuilder.group({

      email : ['',[Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
      ]],
      
      password :['',[Validators.required ]]
    })
  }
  get errorControl(){

    return this.loginForm?.controls;
  }
  async btnLogin() {

    try {
      const userCredential = await this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
      if (userCredential) {

        await this.auth.guardarInfoLogin(this.loginForm.value.email);  
        console.log(userCredential);  
        console.log("ingreso");  
        
        this.route.navigate(['/home']);
      } else {
        console.log('Error al autenticar');
      }
    } catch (error) {
      console.log(error);
    }
  }
  btnCompletarDatos(){

    this.loginForm.patchValue({
      email: "yober@gmail.com",
      password: "123456"
    });
  }


}
