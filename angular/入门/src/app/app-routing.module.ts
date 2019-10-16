import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component'
import { NewsComponent } from './components/news/news.component';
import { ProductsComponent } from './components/products/products.component'
import { CeshiComponent } from './demo/ceshi/ceshi.component'
  import { ProductComponent } from './demo/ceshi/product/product.component';
  import { ShopComponent } from './demo/ceshi/shop/shop.component';
import { RequestComponent } from './components/request/request.component'


const routes: Routes = [
  {path:'index',component:HomeComponent},
  {path:'form',component:FormComponent,data:{title:'标题'}},
  {path:'search',component:SearchComponent},
  {path:'news',component:NewsComponent,data:{title:'新闻'}},
  {path:'product/:id',component:ProductsComponent,data:{title:'商品详情'}},
  {path:'ceshi',component:CeshiComponent,children:[
    {path:'pro',component:ProductComponent},
    {path:'shop',component:ShopComponent},
    {path:'**',redirectTo:'pro',pathMatch:'full'}
  ]},
  {path:'request',component:RequestComponent},
  {
    path:'**',redirectTo:'index' // 匹配不到路由跳转
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
