import { Pipe, PipeTransform } from '@angular/core'
@Pipe({ name: 'portrait' })
export class Portrait  implements PipeTransform {
  transform(value: string): string {
    if(!value) return value;
    if(typeof value !== 'string') {
      throw new Error('Invalid pipe argument for WelcomePipe');
    }
    return "Welcome to " + value;
  }
}

// 定义俩个数组一个为性别，一个为三种图片的存放路径
// 需要使用@Pipe来装饰类
// 实现PipeTransform的transform方法，该方法接受一个输入值和一些可选参数
// 在@Pipe装饰器中指定管道的名字，这个名字就可以在模板中使用。
// transform为PipeTransform中继承而来的方法，它接收0个或多个参数
