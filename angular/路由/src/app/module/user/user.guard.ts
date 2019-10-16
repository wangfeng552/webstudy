import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot, // 即将被激活的路由
    state: RouterStateSnapshot): boolean {  // 即将到达的状态
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    // 如果登录了就放行
    if (this.userService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.userService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/index']);
    return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('子路由进入激活')
    return this.canActivate(next, state);
  }
}
