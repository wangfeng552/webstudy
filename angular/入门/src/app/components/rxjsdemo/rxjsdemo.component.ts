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

    // Rxjs unsubscribe 取消订阅
    let stream: any = new Observable(observer => {
      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        observer.next('observable timeout')
      }, 5000)
    })

    let disposable: any = stream.subscribe(value => {
      console.log(value)
    })

    setTimeout(() => {
      disposable.unsubscribe()
    }, 2000)


    // rxjs 订阅后多次执行
    let streams: any = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++)
      }, 2000)
    })

    // 不处理直接返回
    // streams.subscribe(value=>{
    //   console.log("Observer"+value)
    // })

    // streams.filter(val =>  val % 2 == 0 ).subscribe(value => console.log("filter>" + value));
    // streams.map(val => val*2).subscribe(value=>{console.log('map'+value)})


    // 结合管道filter和map一起处理
    streams.pipe(
      filter((value: any) => {
        if (value % 2 == 0) {
          return true
        }
      }),
      map((value: any) => { return value * 2 })
    )
      .subscribe(value => {
        console.log(value)
      })
  }
}
