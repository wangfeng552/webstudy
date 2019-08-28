import { Component, OnInit,Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // 接收父组件传过来的数据
  @Input() title:any 
  @Input() message:any 
  @Input() run:any
  @Input() home:any
  @Input() age:any

  public msg:string="我是子组件的数据"

  constructor() { }

  ngOnInit() {
  }

  getParentRun(){
    // 执行父组件的run
    console.log(this.home)
    this.home.run()
  }
  chowChildName(){
    console.log('子组件的方法')
  }
}
