import { Routes } from '@angular/router';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ErrorComponent } from './componentes/error/error.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'quiensoy', component: QuienSoyComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'error', component: ErrorComponent }, // Ruta para el componente de error
    { path: '**', redirectTo: 'error' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }

  ];
