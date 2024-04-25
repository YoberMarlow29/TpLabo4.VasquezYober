import { Routes } from '@angular/router';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [

    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent},
    {path:'quien-soy',component:QuienSoyComponent},
    { path: '', redirectTo: 'quien-soy', pathMatch: 'full' }    
];
