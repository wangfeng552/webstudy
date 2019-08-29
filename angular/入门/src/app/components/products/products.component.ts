import { Component, OnInit } from '@angular/core';

import {ActivatedRoute,Router, NavigationExtras} from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    public route:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(v=>{  // 获取get参数
      console.log(v)
    })

    this.route.paramMap.subscribe(v=>{ // 活动动态绑定的值
      console.log(v)
    })
  }

  goHome(){
    // this.router.navigate(['/index'])     // 普通跳转

    // this.router.navigate(['/product',12]) // 动态传值跳转
    
    let queryParams:NavigationExtras = {   // get传值跳转
      queryParams:{
        "name":'123'
      }
    }
    this.router.navigate(['/index'],queryParams) 
  }
}
