import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { PassworldComponent } from './passworld/passworld.component';
import { InfoComponent } from './info/info.component';

import { UserGuard } from './user.guard'


const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard],// canActivate: [UserGuard]  是否需要登录校验
    children: [
      {
        path: '',
        canActivateChild: [UserGuard], // 守卫来保护子路由,CanActivateChild 会在任何子路由被激活之前运行
        children: [
          { path: 'passworld', component: PassworldComponent },
          { path: 'info', component: InfoComponent },
          { path: '**', redirectTo: 'user/info' },
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
