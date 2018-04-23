import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { size } from '../mock/size.mock';
import { PRODUCT } from '../mock/product.mock';
import { Product } from '../models/product';
import {Filter} from '../models/filter';

@Injectable()//Injectable - указывает, что сервис можно внедрить в компонент или другой сервис(для сервисов)
export class FilterService {

  constructor() { }

  getSizes(): Observable<number[]> {//Observable - подобен наблюдателю, ждёт, пока прийдёт ответ с сервера
    return Observable.of(size); //of - функция, которая обернёт массив данных в Observable и вернет его когда подпишемся на оповещение.
    //subscribe - функция, которая вызовет callback  и в аргументы передаст результат. Подпишется на возврат данных.
  }

  getProducts(filter?: Filter): Observable<Product[]> {//? - не обязательный параметр
    let product = PRODUCT;
    if (filter) {
      if(filter.bySize.length){
        product =  product.filter((value: Product) => {
          return value.size.find(result => filter.bySize.includes(result));// = return arr.includes(result)
        });
      }
      if(filter.byLength){
        product =  product.filter((value: Product) => value.length === filter.byLength);
      }
      if(filter.bySleeve){
        product =  product.filter((value: Product) => value.sleeve === filter.bySleeve);
      }
      if(filter.byNotch){
        product =  product.filter((value: Product) => value.notch === filter.byNotch);
      }
      if(filter.byMark){
        product =  product.filter((value: Product) => value.manufacturer === filter.byMark);
      }
    }
    return Observable.of(product)
      .delay(1000);
  }

  getProductByIndex(id: number): Observable<Product> { 
    return Observable.of(PRODUCT.find((value: Product) => value.id == id));
  }

  getProductByName(title:string): Observable<Product[]> {  
    if(title === "all") return Observable.of(PRODUCT);
    return Observable.of(PRODUCT.filter((value: Product) => value.name.toLowerCase().indexOf(title.toLowerCase()) >= 0)); 
  }

  getByPrice(min?: number, max?: number) {
    if(min && max) return Observable.of(PRODUCT.filter((value: Product) => value.price >= min && value.price <= max));
    if(min) return Observable.of(PRODUCT.filter((value: Product) => value.price >= min));
    if(max) return Observable.of(PRODUCT.filter((value: Product) => value.price <= max));
  }

}
