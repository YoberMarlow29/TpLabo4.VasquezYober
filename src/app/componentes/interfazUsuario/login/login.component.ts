import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,NavbarComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  loginForm : FormGroup;

  constructor(public auth: AuthService,public route:Router,public formBuilder: FormBuilder, private toastSvc : ToastrService ){

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

         this.auth.guardarInfoLogin(this.loginForm.value.email);
        console.log(userCredential);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Inicio de sesion exitoso",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['/home']);
      }
    } catch (error) {

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al iniciar sesion",
        showConfirmButton: false,
        timer: 1500
      });

    }
  }

  async btnIngresarGoogle(){

    try {

      const userCredential = await this.auth.loginGoogle(this.loginForm.value.email,this.loginForm.value.password);

      if (userCredential) {
        console.log(userCredential);

        this.auth.guardarInfoLogin(this.loginForm.value.email);
        this.toastSvc.success('Inicio exitoso','Exito');
        this.route.navigate(['/home']);


      }

    } catch (error) {

      this.toastSvc.error('Error al inicar sesion','ERROR');

    }


  }
  btnCompletarDatos(){

    this.loginForm.patchValue({
      email: "yober@gmail.com",
      password: "123456"
    });
  }


}
