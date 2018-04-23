import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models/product';
import { PRODUCT } from './mock/product.mock';

@Pipe({
    name: 'searchPipe'
})

export class SearchPipe implements PipeTransform {
    transform(arr, str) {
        return arr.filter((value: Product) => {
            console.log(str); 
            console.log(value.name === 'Платье'); 
            return value.name.valueOf() === str;
        });//возвращает новый массив по условию
    }
}