import { Component, OnInit, ViewChild} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pic = 'https://i0.hdslb.com/bfs/sycp/creative_img/201908/02f5eefaa2f49805ceed236401b34b3b.jpg'

  public list:any[]=[
    {
      "title":"我是新闻"
    },
    {
      "title":"我是新闻2"
    },
    {
      "title":"我是新闻3"
    },
    {
      "title":"我是新闻4"
    },
    {
      "title":"我是新闻5"
    }
  ]

  public flag:boolean=true

  public orderStatus:number=1; 

  public heightLight:string="blue"
  public cas:string='ksdjfh'
  public today:any=new Date()
  public count:number=35

  public keywords:string='这是默认的'

  public title:string ='首页组件的标题'
  public message:string = '我数服务组件的msg'

  @ViewChild('headerwf', {static: false}) headerwf:any;

  constructor() { }

  ngOnInit() {
  }

  run(){
    alert('yes')
  }
  getDate(e){
    this.flag = false
    // ionic 必须这样写
    let dom:any=e.target
    dom.style.color='red'
    this.keywords='123'
  }
  keyDown(event){
    // event.target 获取dom对象
    console.log(event)
  }
  keyUp(e){
    console.log(e.target.value)
  }
  getChildMsg(){
    // 获取子组件的数据
    console.log(this.headerwf.msg)
    this.headerwf.chowChildName()
  }

}
