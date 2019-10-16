
import { Injectable } from '@angular/core';
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(
    private httpService: HttpService
  ) {
  }

  login2(data) {
    const { jxc_goods_id } = data
    return this.httpService.post("/api/jxc/jxc_visitor/get_jxc_goods_info", { jxc_goods_id })
  }

  login(data) {
    let {date} =  data
    return this.httpService.post("/api/jxc/ajax_get_parking_list", { date })
  }
}