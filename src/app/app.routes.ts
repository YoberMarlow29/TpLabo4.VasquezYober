import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./componentes/login/login.component') },
    { path: 'home', loadComponent: () => import('./componentes/home/home.component') },
    { path: 'quiensoy', loadComponent: () => import('./componentes/quien-soy/quien-soy.component') },
    { path: 'register', loadComponent: () => import('./componentes/registro/registro.component') },
    { path: 'error', component: ErrorComponent }, // Ruta para el componente de error
    { path: '**', redirectTo: 'error' },

  ];
