import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module'

import { UserComponent } from './user/user.component';
import { PassworldComponent } from './passworld/passworld.component';
import { InfoComponent } from './info/info.component';

import { UserService} from './user.service'


@NgModule({
  declarations: [
    UserComponent,
    PassworldComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [UserService], // 依赖注入
  exports: [UserComponent]
})
export class UserModule { }
