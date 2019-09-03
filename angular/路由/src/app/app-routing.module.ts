import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:'index',component:HomeComponent},
  {
    path:'**',redirectTo:'index' // 匹配不到路由跳转
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
