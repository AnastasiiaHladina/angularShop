import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Filter } from '../models/filter';
import { Observable } from 'rxjs/Observable';
import { FilterService } from '../services/filter.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  filterProductObservable$: Observable<Product[]>;
  filter: Filter;
  product:Product;
  id:number;
  private subscription: Subscription;
  constructor(private filterService: FilterService, private activateRoute: ActivatedRoute) {
    this.filter = new Filter();
  }

  ngOnInit() {//$ - указываем что этот продукт будет ждать ответ
    this.subscription = this.activateRoute.params.subscribe(
      params=>this.id = params['id']); 
      this.filterService.getProductByIndex(this.id)
        .subscribe(result => {
          this.product = result;  
        });
    
 
    

    
  }

}
