import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro con exito",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "El correo ya se encuentra en uso",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al registrarse",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

  }

}
