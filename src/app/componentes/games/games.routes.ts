import { Routes } from "@angular/router";
export const routes:Routes =[


    {path:'ahorcado', loadComponent: ()=> import('./ahorcado/ahorcado.component'),},
    {path:'mayormenor', loadComponent: ()=> import('./mayor-menor/mayor-menor.component'),},
    {path:'preguntados', loadComponent: ()=> import('./preguntados/preguntados.component'),},
    {path:'ruleta', loadComponent: ()=> import('./ruleta/ruleta.component'),}


]


export default routes;
