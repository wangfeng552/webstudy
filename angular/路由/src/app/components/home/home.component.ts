import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../module/user/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {

  }

  goLogin() {
    this.userService.login()
  }


}
