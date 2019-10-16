import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from './common/shared.module';
import { StorageService} from './services/storage.service';

import {UserModule} from './module/user/user.module';
import { ShopModule } from './module/shop/shop.module';



@NgModule({
  declarations: [  // 包装组件,指令,管道等
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    UserModule,
    ShopModule,
    AppRoutingModule,
  ],
  providers: [StorageService], // 依赖注入
  bootstrap: [AppComponent] // 设置根组件
})
export class AppModule { }
