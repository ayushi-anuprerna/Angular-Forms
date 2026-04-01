import { Routes } from '@angular/router';
import { Level1Component } from './Level1Component/level-1';
import { Level2Component } from './Level2Component/level-2';
export const routes: Routes = [
    {path:"level-1" ,component:Level1Component},
    {path:"" ,component:Level2Component}  
];
