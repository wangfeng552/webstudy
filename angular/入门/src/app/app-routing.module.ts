import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component'
import { NewsComponent } from './components/news/news.component';
import { ProductsComponent } from './components/products/products.component'
import { CeshiComponent } from './demo/ceshi/ceshi.component'

const routes: Routes = [
  {path:'index',component:HomeComponent},
  {path:'form',component:FormComponent,data:{title:'标题'}},
  {path:'search',component:SearchComponent},
  {path:'news',component:NewsComponent},
  {path:'product/:id',component:ProductsComponent},
  {path:'ceshi',component:CeshiComponent},
  {
    path:'**',redirectTo:'index' // 匹配不到路由跳转
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
