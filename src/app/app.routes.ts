import { Routes } from '@angular/router';
import { Level1Component } from './Level1Component/level-1';
import { Level2Component } from './Level2Component/level-2';
import { Level3 } from './Level3Component/level-3';
export const routes: Routes = [
    {path:"level-1" ,component:Level1Component},
    {path:"" ,component:Level2Component}  
    {path:"level-3" ,component:Level3}
];
