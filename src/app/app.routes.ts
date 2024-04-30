import { Routes } from '@angular/router';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';

export const routes: Routes = [

    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'quiensoy',component:QuienSoyComponent},
    {path:'registro',component:RegistroComponent},

    { path: '', redirectTo: 'quiensoy', pathMatch: 'full' }    

];
