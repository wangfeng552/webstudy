import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ProductComponent } from './product/product.component';
import { PlistComponent } from './plist/plist.component';



@NgModule({
  declarations: [ShopComponent, ProductComponent, PlistComponent],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
