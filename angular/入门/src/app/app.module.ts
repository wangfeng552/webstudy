import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from './common/shared.module';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component'
import { StorageService} from './services/storage.service';
import { HeaderComponent } from './components/header/header.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { RxjsdemoComponent } from './components/rxjsdemo/rxjsdemo.component';
import { LifeComponent } from './components/life/life.component'
import { ProductsComponent } from './components/products/products.component';
import { CeshiComponent } from './demo/ceshi/ceshi.component';
import { RequestComponent } from './components/request/request.component'

//  导入http模块
import { HttpClientModule} from '@angular/common/http';
import { ProductComponent } from './demo/ceshi/product/product.component';
import { ShopComponent } from './demo/ceshi/shop/shop.component';

import {UserModule} from'./module/user/user.module'


@NgModule({
  declarations: [  // 包装组件,指令,管道等
    AppComponent,
    NewsComponent,
    HomeComponent,
    FormComponent,
    SearchComponent,
    HeaderComponent,
    ParentComponent,
    ChildComponent,
    RxjsdemoComponent,
    LifeComponent,
    ProductsComponent,
    CeshiComponent,
    RequestComponent,
    ProductComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    UserModule
  ],
  providers: [StorageService], // 依赖注入
  bootstrap: [AppComponent] // 设置根组件
})
export class AppModule { }

// declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。

// exports（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。

// imports（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。

// providers —— 本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。（你也可以在组件级别指定服务提供商，这通常是首选方式。）

// bootstrap —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。
