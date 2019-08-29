import { Component, OnInit ,ViewChild } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  public title:string='我是父组件的数据'

  @ViewChild('childref',{static:false}) childref:any
  constructor() { }

  ngOnChanges(): void {
    //  :void 表示没有返回值
    console.log('ngOnChanges')
    }

  ngOnInit() {
  }

  changTitle(){
    console.log(123)
    this.title = '改变了'
    // console.log(this.childref.childTitle)
    // this.childref.showName()
  }

}
