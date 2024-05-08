import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./componentes/interfazUsuario/login/login.component') },
    { path: 'home', loadComponent: () => import('./componentes/interfazUsuario/home/home.component') },
    { path: 'quiensoy', loadComponent: () => import('./componentes/interfazUsuario/quien-soy/quien-soy.component') },
    { path: 'register', loadComponent: () => import('./componentes/interfazUsuario/registro/registro.component') },
    {path: 'games', loadChildren: ()=> import('./componentes/games/games.routes')},
    { path: 'error', component: ErrorComponent }, // Ruta para el componente de error
    { path: '**', redirectTo: 'error' },
    

  ];
