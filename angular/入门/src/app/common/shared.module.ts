import { NgModule } from '@angular/core';
import { Portrait } from './pipe/comm.pipe';
@NgModule({
  declarations: [
    Portrait
  ],
  exports: [
    Portrait
  ]
})
export class SharedModule {

}