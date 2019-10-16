import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key:string){
    return JSON.parse(localStorage.getItem(key))
  }
  set(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value))
  }
  remove(key:string){
    localStorage.removeItem(key)
  }
}
