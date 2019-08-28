import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public peopelInfo:any={
    userName:"",
    sex:"1",
    cityList:['北京','上海','生政'],
    city:'上海',
    hobby:[{
      title:'吃饭',
      checked:false
    },{
      title:'光甲',
      checked:false
    },{
      title:'旅游',
      checked:false
    },{
      title:'死啦地方',
      checked:false
    }],
    mark:''
  }
  constructor() { }

  ngOnInit() {
  }

  submitForm(){
    console.log(this.peopelInfo.userName)
  }

}
