import { Component, OnInit } from '@angular/core';

// 引入服务
import { StorageService} from "../../services/storage.service"
import { from } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchValue:string
  public list:any[]=[];


  public keywords:string
  public todoList:any[]=[];

  // 实例化服务
  constructor(public storage:StorageService) { 
    // this.storage.get()
  }

  ngOnInit() {
    console.log('页面刷新会触发')
    var searchelist:any = this.storage.get('searchelist')
    if(searchelist){
      this.list = searchelist
    }
  }
  search(){
    if(this.list.indexOf(this.searchValue)==-1){
      this.list.push(this.searchValue)

      this.storage.set('searchelist',this.list)
    }
  }
  del(index){
    this.list.splice(index,1)
  }
  doAPP(e){
    if(e.keyCode == 13){
      this.todoList.push({
        title:this.keywords,
        status:0  
      })
    }
  }
}
