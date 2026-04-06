import { Routes } from '@angular/router';
import { Level1Component } from './Level1Component/level-1';
import { Level2Component } from './Level2Component/level-2';
import { Level3 } from './level-3/level-3';
export const routes: Routes = [
    {path:'' ,component:Level1Component},
    {path:'level-2' ,component:Level2Component},
    {path:'level-3' ,component:Level3}
];
