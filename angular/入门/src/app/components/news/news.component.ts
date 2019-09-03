import { Component, OnInit } from '@angular/core';
import { StorageService} from '../../services/storage.service'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  // public 共有的可以在类里面使用也可以在类外面使用
  // protected 保护类型， 只有当前类和子类里访问
  // private 私有的 只有当前类可以访问

  name = '张三'
  public age: string = '45'
  public title = '我是新闻标题'

  public act: string = 'act1'
  public obj: any = {
    name: '123'
  }
  public content = '<h2>拉伸发就发死啦地方</h2>'

  // 定义数组
  public arr = ['1111', '222222', '3333333']

  public list: any[] = ['首付', 2222, '调试电话费']

  public items: Array<string> = ['sdf', 'sdfasdf', '拉撒打飞机']


  public userList: any[] = [
    {
      userName: '闸北发布',
      age: 20
    },
    {
      userName: 'dsfg',
      age: 204
    }
  ]
  constructor(
    public storage:StorageService) {
    this.name = '李四'
    // this.storage.get()
  }

  ngOnInit() {
  }

}

