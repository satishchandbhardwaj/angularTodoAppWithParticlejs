import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnameComponent } from './addname/addname.component';
import { AddtodoComponent } from './addtodo/addtodo.component';

const routes: Routes = [
  {path:'', component:AddtodoComponent},
  {path:'login', component:AddnameComponent},
  { path: 'addtodo', component: AddtodoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
