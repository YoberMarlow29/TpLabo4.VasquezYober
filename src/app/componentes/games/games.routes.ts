import { Routes } from "@angular/router";
export const routes:Routes =[


    {path:'ahorcado', loadComponent: ()=> import('./ahorcado/ahorcado.component'),},
    {path:'preguntados', loadComponent: ()=> import('./mayor-menor/mayor-menor.component'),},
]


export default routes;