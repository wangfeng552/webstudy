import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { PassworldComponent } from './passworld/passworld.component';
import { InfoComponent } from './info/info.component';



@NgModule({
  declarations: [UserComponent, PassworldComponent, InfoComponent],
  imports: [
    CommonModule
  ],
  exports:[UserComponent]
})
export class UserModule { }
