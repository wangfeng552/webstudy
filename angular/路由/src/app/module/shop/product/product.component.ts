import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras} from '@angular/router'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public id:any=""
  public name:any="zhansgan"

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    // 方法1. 获取动态值 /product/22
    this.route.paramMap.subscribe((v:any)=>{
      this.id = v.params.id
    })

    // 获取url上?name=123&age=45
    this.route.queryParamMap.subscribe((v:any)=>{
      console.log(v)
    })

    this.route.data.subscribe((v:any)=>{
      console.log(v)
    })

  }
  goHome(){
    // this.router.navigate(['/index']) // 普通跳转

    //  this.router.navigate(['/shop/product',12]) // 动态传值跳转

    let queryParamsWf :NavigationExtras ={  // get传值跳转
      queryParams:{
        "name":"臧三",
        "age":"45"
      }
    }
    this.router.navigate(['/index'],queryParamsWf) 
  }

}
