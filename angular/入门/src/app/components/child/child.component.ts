import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input('title') title: string
  @Input('changTitle') changTitle: any

  public childTitle: any = '我是子组件的title'
  constructor() { }

  ngOnInit() {
  }

  visitParentMethod() {
    this.changTitle()
  }

  showName() {
    console.log('我是子组件的name')
  }

}
