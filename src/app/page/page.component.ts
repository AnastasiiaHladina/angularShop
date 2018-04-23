import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { Filter } from '../models/filter';
import { NgForm } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { DataService } from '../services/data.service'; 
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  sizes: number[]; 
  filter: Filter;
  min: number;
  max: number; 
  minTxtBox: number;
  maxTxtBox: number;
  titleItem: string;
  filterProductObservable$: Observable<Product[]>;

  constructor(private filterService: FilterService, private data: DataService) {
    this.filter = new Filter();
  }

  ngOnInit() {
    this.filterService.getSizes()
      .subscribe(result => {
        this.sizes = result;
      });

    this.filterProductObservable$ = this.filterService.getProducts();

    this.filterProductObservable$.subscribe((value: Product[]) => {
      this.max = Math.max(...value.map((val: Product) =>   val.price ));//... берёт каждый елемент и посылает в фун
      this.min = Math.min(...value.map((val: Product) =>   val.price ));
    });
    this.data.currentTitle.subscribe(Message => { 
      this.filterProductObservable$ = this.filterService.getProductByName(Message); 
    });
    
  }

  onSubmit() { 
    if(this.minTxtBox && this.maxTxtBox) this.filterProductObservable$ = this.filterService.getByPrice(this.minTxtBox, this.maxTxtBox);
    else if(this.minTxtBox) this.filterProductObservable$ = this.filterService.getByPrice(this.minTxtBox);
    else if(this.maxTxtBox) this.filterProductObservable$ = this.filterService.getByPrice(null,this.maxTxtBox);
    console.log(this.filterService.getByPrice(100,500));
  } 

  onClick(size: number) {
    if (this.filter.bySize.length < this.sizes.length) {
      for (let i = 0; i < this.filter.bySize.length; i++){
        if (size === this.filter.bySize[i]) {
          this.filter.bySize.splice(i,1);
          if (this.filter.bySize.length === 0) {
            this.resetSizeFilter();
          }
          this.filterProductObservable$ = this.filterService.getProducts(this.filter);
          return;
        }
      }
    } else {
      this.filter.bySize = [];
    }
    this.filter.bySize.push(size);
    this.filterProductObservable$ = this.filterService.getProducts(this.filter);
  }

  resetSizeFilter() {
    this.filter.bySize = this.sizes.slice(0);//копирование массивов(при изменении в одном, на второй не повлияет)
  }

  chooseFilter(str: string, id: string) {
    if(id === 'len') this.filter.byLength = str;
    else if(id === 'sleeve') this.filter.bySleeve = str;
    else if(id === 'notch') this.filter.byNotch = str;
    else if(id === 'mark') this.filter.byMark = str;

    if(this.filter.byLength) this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    else if(this.filter.bySleeve) this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    else if(this.filter.byNotch) this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    else if(this.filter.byMark) this.filterProductObservable$ = this.filterService.getProducts(this.filter);
  }

  clearFilter(str: string) {
    if(str === 'len'){
      this.filter.byLength = null;
      this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    }
    if(str === 'sleeve'){
      this.filter.bySleeve = null;
      this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    }
    if(str === 'notch'){
      this.filter.byNotch = null;
      this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    }
    if(str === 'mark'){
      this.filter.byMark = null;
      this.filterProductObservable$ = this.filterService.getProducts(this.filter);
    }
  }

  getMaxValue() {
    return this.max;
  }
  getMinValue() {
    return this.min;
  }

   
}
