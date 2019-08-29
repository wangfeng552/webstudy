import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { from } from 'rxjs';

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
import { CeshiComponent } from './demo/ceshi/ceshi.component'

@NgModule({
  declarations: [  // 包装组件或指令等
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
    CeshiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [StorageService], // 依赖注入
  bootstrap: [AppComponent] // 设置根组件
})
export class AppModule { }
