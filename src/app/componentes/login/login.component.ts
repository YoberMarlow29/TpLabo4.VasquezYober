import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

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
  async btnLogin(){

    console.log("entro al boton");

      const user = await this.auth.login(this.loginForm.value.email,this.loginForm.value.password).catch((error)=>{

        console.log(error);
      })

      if(user){
        this.route.navigate(['/home'])


      }else{

        console.log('provide correct values')
      }

  }
  btnCompletarDatos(){

    this.loginForm.patchValue({
      email: "yober@gmail.com",
      password: "123456"
    });
  }

}
