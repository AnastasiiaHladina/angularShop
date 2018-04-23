import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';  
import { DataService } from '../services/data.service'; 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit { 

  filterProductObservable$: Observable<Product[]>; 
  search:string;

  constructor( private data: DataService) {  
  }

  ngOnInit() {
    this.data.changeMessage("all");  
  }

  onSubmit() { 
    this.data.changeMessage(this.search);  
  }

}
