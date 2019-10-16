import { Injectable } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    public router: Router
  ) { }

  login(): void {
    this.isLoggedIn = true
    this.router.navigate([this.redirectUrl])
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}