import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {TaskComponent} from "./users/task.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: 'MyTasks', component: TaskComponent },
  { path: 'Menu', component: StartPageComponent },
  { path: 'Login', component: LoginComponent},



  { path: '', redirectTo: '/MyTasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
