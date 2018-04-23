import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { size } from '../mock/size.mock';

@Injectable()
export class SizeService {

  constructor() { }

  getSizes(): Observable<number[]> {
    return of(size);
  }

}
