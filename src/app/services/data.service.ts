import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable( )
export class DataService{
  private defaultTitle = new BehaviorSubject<string>("default message");
  currentTitle = this.defaultTitle.asObservable();
  constructor( ) { 
  }

  changeMessage(msg: string){
    if(msg)
      this.defaultTitle.next(msg);
  }

}
