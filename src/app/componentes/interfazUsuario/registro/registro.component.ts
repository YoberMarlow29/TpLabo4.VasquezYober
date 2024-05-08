import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export default class RegistroComponent {

  regForm : FormGroup;

  constructor(public auth: AuthService,public route:Router,public formBuilder:FormBuilder,private toastSvc : ToastrService){

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

        await this.auth.guardarInfoLogin(this.regForm.value.email);      
        this.toastSvc.success('Registro con exito','EXITO');

        this.route.navigate(['/home']);
      } else {
        this.toastSvc.error('error al autentificar','ERRROR');

      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        this.toastSvc.warning('El correo electrónico ya está en uso', 'ERROR');
      } else {
        this.toastSvc.error('Error al registrarse', 'ERROR');
      }    
    }

  }

}
