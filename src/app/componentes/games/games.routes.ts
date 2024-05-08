import { Routes } from "@angular/router";
export const routes:Routes =[


    {path:'ahorcado', loadComponent: ()=> import('./ahorcado/ahorcado.component'),},
    {path:'mayormenor', loadComponent: ()=> import('./mayor-menor/mayor-menor.component'),},
]


export default routes;