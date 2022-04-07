import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeModalService {

  //定义可观察者，用于发送数据
  private shareData: Subject<any> = new Subject<any>();

  constructor() { }

  // 发送数据
  sendData(value: any){
    this.shareData.next(value);
  }

  // 接收数据
  getData(): Observable<any>{
    return this.shareData.asObservable();
  }
}
