import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { PageComponent } from './page/page.component';
import { ItemComponent } from './item/item.component';
import { NotFoundComponent } from './not found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';

import { FilterService } from './services/filter.service';
import { DataService } from './services/data.service';

import { HoverDirective } from './directives/hover.directive';


const appRoutes:Routes = [
  { path: '', component: PageComponent},//продукция
  { path: 'main-page', component:MainPageComponent },//главная страница
  { path: 'item/:id', component:ItemComponent },//продукт
  { path: '**', component: NotFoundComponent }//не найдено
]

@NgModule({
  declarations: [
      AppComponent,
      PageComponent,
      NavComponent,
      FooterComponent,
      HoverDirective,
      ItemComponent, 
      MainPageComponent,
      NotFoundComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      AngularFontAwesomeModule,
      RouterModule.forRoot(appRoutes)
      
  ],
  providers: [
      FilterService,
      DataService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
