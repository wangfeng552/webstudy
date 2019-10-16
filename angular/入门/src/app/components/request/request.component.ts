import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../http/user'
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  constructor(
    private loginService:LoginService
  ) { }

  ngOnInit() {
    this.loginService.login2({date:''}).subscribe(res=>{
      console.log(res)
    })
  }

}
