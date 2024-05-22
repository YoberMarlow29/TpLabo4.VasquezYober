import { Routes } from '@angular/router';
import { ErrorComponent } from './componentes/error/error.component';

import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo } from "@angular/fire/auth-guard"


export const routes: Routes = [

  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login', loadComponent: () => import('./componentes/interfazUsuario/login/login.component'),
    ...canActivate(()=> redirectLoggedInTo(['/home'])),

  },
  {
  path: 'home', loadComponent: () => import('./componentes/interfazUsuario/home/home.component')
  },
  {
  path: 'quiensoy', loadComponent: () => import('./componentes/interfazUsuario/quien-soy/quien-soy.component')
  },
  {
    path: 'register', loadComponent: () => import('./componentes/interfazUsuario/registro/registro.component'),
    ...canActivate(()=> redirectLoggedInTo(['/home'])),

  },
  {
    path: 'games', loadChildren: ()=> import('./componentes/games/games.routes'),
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])),
  },
  {
    path: 'error', component: ErrorComponent

  },
  {

    path: '**', redirectTo: 'error'

  },

  ];
