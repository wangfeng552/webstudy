import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-rxjsdemo',
  templateUrl: './rxjsdemo.component.html',
  styleUrls: ['./rxjsdemo.component.scss']
})
export class RxjsdemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // 回调方法
    this.getCallBack((data) => {
      console.log(data)
    })

    // promise
    var promisData = this.getPromiseData()
    promisData.then(v => {
      console.log(v)
    }).catch(err => {
      console.log(err)
    })

    // rxjx
    var rxjsDate = this.getRxjxData()
    var disableRxjsData = rxjsDate.subscribe((v) => {
      console.log(v)
    })

    // 取消订阅
    setTimeout(()=>{
      disableRxjsData.unsubscribe()
    },2000)

    // 多次执行
    var streamMoreData= this.getRxjxMoreData()
    streamMoreData.subscribe(v=>{
      console.log(v)
    })

    // 用工具方法对返回数据处理
    var streamMoreDataNum= this.getRxjxMoreDataNum()
    streamMoreDataNum.pipe(
      filter((value:any)=>{
        if(value%2==0){
          return true
        }
      }),
      map((v:any)=>{
        return v*v
      })
    ).subscribe(v=>{
      console.log(v)
    })

  }

  getCallBack(cb) {
    setTimeout(() => {
      var userName = 'nihao'
      cb(userName)
    }, 1000)
  }

  getPromiseData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let userName: string = "张三"
        resolve(userName)
      }, 1000)
    })
  }

  getRxjxData() {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next('你好')
        // observer.error('你好')
      }, 3000)
    })
  }

  getRxjxMoreData() {
    return new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++)
      }, 3000)
    })
  }

  getRxjxMoreDataNum() {
    return new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++)
      }, 3000)
    })
  }
}
