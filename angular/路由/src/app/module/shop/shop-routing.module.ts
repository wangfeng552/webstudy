import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop.component';
import { ProductComponent } from './product/product.component';
import { PlistComponent } from './plist/plist.component';


const routes: Routes = [
  {path:'shop',component:ShopComponent,children:[
    {path:'product/:id',component:ProductComponent,data:{title:'商品详情'}},
    {path:'list',component:PlistComponent,data:{title:'商品列表'}},
    {path:'**',redirectTo:'shop/list'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
